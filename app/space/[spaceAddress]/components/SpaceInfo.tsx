import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddressLink } from '@/lib/components/AddressLink'

interface SpaceInfoProps {
	contractAddress: string
	creationDate: bigint
}

export function SpaceInfo({ contractAddress, creationDate }: SpaceInfoProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Información del Espacio</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center mb-2">
					<span className="text-sm">Dirección del contrato: </span>
					<AddressLink address={contractAddress} className="ml-2 text-sm	" />
				</div>
				<div className="flex items-center">
					<Calendar className="mr-2 h-4 w-4" />
					<span className="text-sm">Fecha de creación: {new Date(Number(creationDate) * 1000).toLocaleDateString()}</span>
				</div>
			</CardContent>
		</Card>
	)
}