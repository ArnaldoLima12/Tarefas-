'use client'
import { SessionProvider } from 'next-auth/react'
import { PrimeReactProvider } from 'primereact/api'

export default function Container({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <SessionProvider>
            <PrimeReactProvider>
                <div className="container">
                    {children}
                </div>
            </PrimeReactProvider>
        </SessionProvider>
    )
}