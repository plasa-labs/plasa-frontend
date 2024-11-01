'use client'

import { useParams } from 'next/navigation'
import { Space } from '@/components/space/Space'

export default function SpacePage() {
	const { spaceAddress } = useParams()
	return <Space spaceAddress={spaceAddress as string} />
}
