// Internal imports
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from '@/components/ui/card'

// Contexts
import { useSpace } from '@/contexts/SpaceContext'

// Utils
import { formatPoints } from '@/lib/utils/formatters'

export default function ProfilePointsCard() {
	const { space } = useSpace()
	if (!space) return <></>
	if (!space.points) return <></>

	const points = space.points.user.currentBalance

	return (
		<Card className='mb-6'>
			<CardHeader>
				<CardTitle>Mis puntos</CardTitle>
			</CardHeader>
			<CardContent>
				<div>
					<h2 className='text-2xl font-bold tracking-tight'>{formatPoints(points)}</h2>
				</div>
			</CardContent>
			<CardFooter>
				<CardDescription>
					Los puntos se acumulan a medida obtenés sellos.
				</CardDescription>
			</CardFooter>
		</Card>
	)
}
