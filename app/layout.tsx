// Core React and Next.js imports
import { type ReactNode } from 'react'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

// Third-party imports
import { cookieToInitialState } from 'wagmi'

// Providers and contexts
import { OnchainProviders } from '@/providers/OnchainProviders'
import { ContextProviders } from '@/providers/ContextProviders'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { TransactionProvider } from '@/contexts/TransactionContext'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Components
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/Footer'

// Utils and styles
import { getConfig } from '@/lib/onchain/wagmi'
import './globals.css'

// Font configuration
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'D&D',
	description: 'No hacemos caridad.',
}

interface RootLayoutProps {
	children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const headersObject = await headers()
	const cookieHeader = headersObject.get('cookie')
	const initialState = cookieToInitialState(
		getConfig(),
		cookieHeader
	)

	return (
		<html lang='es' suppressHydrationWarning>
			<head />
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<OnchainProviders initialState={initialState}>
						<ContextProviders>
							<TransactionProvider>
								<div className="min-h-screen flex flex-col">
									<div className="min-h-screen flex flex-col">
										<Navbar />
										<main className="flex-1 flex flex-col">
											{children}
											<SpeedInsights />
										</main>
									</div>
									<Footer />
								</div>
							</TransactionProvider>
						</ContextProviders>
					</OnchainProviders>
				</ThemeProvider>
			</body>
		</html >
	)
}
