import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * SpaceLeaderboardSkeleton
 * 
 * A loading skeleton component that displays a placeholder for the space leaderboard.
 * Renders a card containing a header skeleton and 5 rows of placeholder content,
 * each with a label and value skeleton, followed by a full-width button skeleton.
 */
export default function SpaceLeaderboardSkeleton() {
	return (
		<Card className='mb-6'>
			<CardHeader>
				<Skeleton className='h-6 w-32' />
			</CardHeader>
			<CardContent>
				{[1, 2, 3, 4, 5].map((_, index) => (
					<div key={index} className='flex justify-between items-center py-2 border-b last:border-b-0'>
						<Skeleton className='h-4 w-24' />
						<Skeleton className='h-6 w-20' />
					</div>
				))}
				<Skeleton className='h-9 w-full mt-4' />
			</CardContent>
		</Card>
	)
}
