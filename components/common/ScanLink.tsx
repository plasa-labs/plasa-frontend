import { ExternalLink } from 'lucide-react'

/**
 * Props interface for the ScanLink component
 * @interface ScanLinkProps
 * @property {string} address - The blockchain address to display and link to
 * @property {string} route - The route to link to
 * @property {string} [className] - Optional CSS classes to apply to the link
 */
interface ScanLinkProps {
	address: string
	route?: string
	className?: string
}

export function ScanLink({ address, route, className }: ScanLinkProps) {
	const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`
	const explorerUrl = `https://sepolia.basescan.org${route}`

	return (
		<a
			href={explorerUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-1 text-sm hover:underline ${className}`}
		>
			{shortAddress}
			<ExternalLink className="h-3 w-3" />
		</a>
	)
}

export function AddressScanLink({ address, className }: ScanLinkProps) {
	return <ScanLink address={address} route={`/address/${address}`} className={className} />
}
