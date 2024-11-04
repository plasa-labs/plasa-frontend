'use client'

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SpacesSpaceSkeletonCard() {
	return (
		<Card className="mb-4">
			<div className="flex items-center p-4">
				<Skeleton className="w-16 h-16 mr-4 rounded-lg" />
				<div className="flex-grow">
					<Skeleton className="h-6 w-3/4 mb-2" />
					<Skeleton className="h-4 w-full" />
				</div>
				<Skeleton className="h-10 w-20" />
			</div>
		</Card>
	)
}
