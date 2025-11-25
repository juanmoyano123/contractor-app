import { create } from 'zustand'
import type { Lead, ContractorProfile, Trade } from '@/db/schema'
import type { DashboardMetrics, ContractorSearchFilters } from './types'

/**
 * Global application state using Zustand
 */

// Leads store
interface LeadsState {
  leads: Lead[]
  selectedLead: Lead | null
  isLoading: boolean
  filters: {
    status?: string[]
    dateRange?: { from: Date; to: Date }
  }
  setLeads: (leads: Lead[]) => void
  addLead: (lead: Lead) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  selectLead: (lead: Lead | null) => void
  setLoading: (loading: boolean) => void
  setFilters: (filters: LeadsState['filters']) => void
}

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  selectedLead: null,
  isLoading: false,
  filters: {},
  setLeads: (leads) => set({ leads }),
  addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
  updateLead: (id, updates) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),
  selectLead: (lead) => set({ selectedLead: lead }),
  setLoading: (isLoading) => set({ isLoading }),
  setFilters: (filters) => set({ filters }),
}))

// Contractors/Network store
interface NetworkState {
  contractors: ContractorProfile[]
  searchResults: ContractorProfile[]
  searchFilters: ContractorSearchFilters
  isSearching: boolean
  setContractors: (contractors: ContractorProfile[]) => void
  setSearchResults: (results: ContractorProfile[]) => void
  setSearchFilters: (filters: ContractorSearchFilters) => void
  setSearching: (searching: boolean) => void
  clearSearch: () => void
}

export const useNetworkStore = create<NetworkState>((set) => ({
  contractors: [],
  searchResults: [],
  searchFilters: {},
  isSearching: false,
  setContractors: (contractors) => set({ contractors }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setSearchFilters: (searchFilters) => set({ searchFilters }),
  setSearching: (isSearching) => set({ isSearching }),
  clearSearch: () => set({ searchResults: [], searchFilters: {} }),
}))

// Trades store
interface TradesState {
  trades: Trade[]
  tradesByCategory: Record<string, Trade[]>
  setTrades: (trades: Trade[]) => void
}

export const useTradesStore = create<TradesState>((set) => ({
  trades: [],
  tradesByCategory: {},
  setTrades: (trades) => {
    const byCategory: Record<string, Trade[]> = {}
    trades.forEach((trade) => {
      if (!byCategory[trade.category]) {
        byCategory[trade.category] = []
      }
      byCategory[trade.category].push(trade)
    })
    set({ trades, tradesByCategory: byCategory })
  },
}))

// Dashboard metrics store (for association admins)
interface DashboardState {
  metrics: DashboardMetrics | null
  isLoading: boolean
  lastUpdated: Date | null
  setMetrics: (metrics: DashboardMetrics) => void
  setLoading: (loading: boolean) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: null,
  isLoading: false,
  lastUpdated: null,
  setMetrics: (metrics) => set({ metrics, lastUpdated: new Date() }),
  setLoading: (isLoading) => set({ isLoading }),
}))

// UI state store
interface UIState {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  activeModal: string | null
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
  }>
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  openModal: (modalId: string) => void
  closeModal: () => void
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  activeModal: null,
  notifications: [],
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Math.random().toString(36).slice(2) },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))
