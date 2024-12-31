import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface FundsErrorDisplayProps {
	error: Error
}

export default function FundsErrorDisplay({ error }: FundsErrorDisplayProps) {
	return (
		<div className="container mx-auto px-4 py-8">
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					{error.message || 'An unexpected error occurred. Please try again later.'}
				</AlertDescription>
			</Alert>
		</div>
	)
}
