'use client'

import Profile from '@/components/profile/Profile'
import RequireRegistration from '@/components/auth/RequireRegistration'

/**
 * ProfilePage Component
 * 
 * A client-side page component that renders the user profile interface.
 * Serves as the main container for the Profile feature.
 * 
 * @returns {JSX.Element} The rendered Profile component
 */
export default function ProfilePage(): JSX.Element {
	return (
		<RequireRegistration>
			<Profile />
		</RequireRegistration>
	)
}
