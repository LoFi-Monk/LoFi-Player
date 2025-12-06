import type { ReactNode } from 'react'

export function TestWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="p-10 border-4 border-yellow-500 bg-gray-900 text-white">
            <h1>Test Wrapper (External File)</h1>
            {children}
        </div>
    )
}
