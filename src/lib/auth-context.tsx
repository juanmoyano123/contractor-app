'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { SessionUser, AuthSession } from './types'

/**
 * Authentication context for user session management
 * In production, this would integrate with Supabase Auth
 */

export interface AuthContextValue {
  user: SessionUser | null
  session: AuthSession | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    checkSession()
  }, [])

  async function checkSession() {
    try {
      // In development, check localStorage for mock session
      const storedSession = localStorage.getItem('auth_session')
      if (storedSession) {
        const parsed = JSON.parse(storedSession) as AuthSession
        if (parsed.expiresAt > Date.now()) {
          setSession(parsed)
          setUser(parsed.user)
        } else {
          localStorage.removeItem('auth_session')
        }
      }
    } catch {
      console.error('Failed to check session')
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    try {
      setIsLoading(true)

      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        return false
      }

      const data = await response.json()

      if (data.success && data.session) {
        setSession(data.session)
        setUser(data.session.user)
        localStorage.setItem('auth_session', JSON.stringify(data.session))
        return true
      }

      return false
    } catch {
      console.error('Login failed')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  async function logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // Ignore errors on logout
    } finally {
      setUser(null)
      setSession(null)
      localStorage.removeItem('auth_session')
    }
  }

  async function refreshSession(): Promise<void> {
    await checkSession()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
