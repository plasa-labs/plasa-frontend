'use client'

// React/Next.js imports
import { type ReactElement } from 'react'
import Link from 'next/link'

// External dependencies
import { usePrivy } from '@privy-io/react-auth'

// Internal contexts
import { useSpace } from '@/contexts/SpaceContext'
import { useFirestore } from '@/contexts/FirestoreContext'

// Internal components
import ProfileNotConnectedCard from './ProfileNotConnectedCard'
import ProfileUsernameCard from './ProfileUsernameCard'
import ProfileConnectionsCard from './ProfileConnectionsCard'
import ProfileStampsCard from './ProfileStampsCard'
import ProfileSkeletonLoader from './ProfileSkeletonLoader'
import ProfilePointsCard from './ProfilePointsCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
/**
 * Profile component handles user profile management including:
 * - Instagram connection
 * - Profile stamps
 * - User connections
 * - Username management
 * 
 * @returns {ReactElement} The rendered Profile component
 */
export default function Profile(): ReactElement {
	const { authenticated } = usePrivy()
	const { isLoading: firestoreLoading } = useFirestore()
	const { isLoading: spaceLoading, refetch: refetchSpace } = useSpace()

	if (!authenticated) {
		return <ProfileNotConnectedCard />
	}

	const handleStampMint = () => {
		refetchSpace()
	}

	if (firestoreLoading || spaceLoading) {
		return <ProfileSkeletonLoader />
	}

	return (
		<div className="main-container px-4 sm:px-6">
			<Link href='/' passHref prefetch={true}>
				<Button variant='outline' className='mb-6'>
					<ArrowLeft className='mr-2 h-4 w-4' />
					{/* Volver a {space?.data.name ? space.data.name : 'Espacio'} */}
					Volver a Inicio
				</Button>
			</Link>
			<h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
			<div className="grid gap-6 grid-cols-1 md:grid-cols-2">
				<div>
					<ProfileUsernameCard />
					<ProfilePointsCard />
					<ProfileConnectionsCard />
				</div>
				<div>
					<ProfileStampsCard
						onStampMint={handleStampMint}
					/>
				</div>
			</div>
		</div>
	)
} 