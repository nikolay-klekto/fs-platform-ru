'use client'
import React from 'react'
import { IDataContext } from '@/types/context/data'

const DataContext = React.createContext<IDataContext | null>(null)

export function useDataContext() {
    const ctx = React.useContext(DataContext)
    if (!ctx) throw new Error('DataContext is not available')
    return ctx
}
export function DataProvider({ children, data }: { children: React.ReactNode; data: IDataContext }) {
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}
