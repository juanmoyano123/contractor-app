'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { Tenant } from '@/db/schema'
import type { TenantBranding, TenantSettings, defaultTenantBranding, defaultTenantSettings } from './types'

/**
 * Tenant context for multi-tenant support
 * Provides tenant data to all components in the tree
 */

export interface TenantContextValue {
  tenant: Tenant | null
  branding: TenantBranding
  settings: TenantSettings
  isLoading: boolean
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined)

interface TenantProviderProps {
  children: ReactNode
  tenant: Tenant | null
  isLoading?: boolean
}

export function TenantProvider({ children, tenant, isLoading = false }: TenantProviderProps) {
  // Parse branding and settings from tenant JSONB fields
  const branding: TenantBranding = tenant?.branding
    ? { ...getDefaultBranding(), ...(tenant.branding as TenantBranding) }
    : getDefaultBranding()

  const settings: TenantSettings = tenant?.settings
    ? { ...getDefaultSettings(), ...(tenant.settings as TenantSettings) }
    : getDefaultSettings()

  return (
    <TenantContext.Provider value={{ tenant, branding, settings, isLoading }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}

// Helper functions to get defaults (avoid circular imports)
function getDefaultBranding(): TenantBranding {
  return {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#f59e0b',
  }
}

function getDefaultSettings(): TenantSettings {
  return {
    commissionRate: 10,
    autoDeclineHours: 2,
    disputePeriodDays: 7,
    memberApproval: 'manual',
    serviceAreaRestriction: true,
    allowBroadcastLeads: true,
    maxBroadcastRecipients: 5,
  }
}
