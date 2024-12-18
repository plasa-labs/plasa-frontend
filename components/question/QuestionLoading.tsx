import { Skeleton } from '@/components/ui/skeleton'

/**
 * QuestionLoading Component
 * 
 * A loading placeholder component that displays skeleton elements to indicate
 * content is being loaded. Mimics the layout of the main question page with
 * responsive grid layout and various content blocks.
 */
export default function QuestionLoading() {
	return (
		<div className='container mx-auto px-4 py-8 space-y-4'>
			<Skeleton className='h-12 w-3/4' />
			<Skeleton className='h-32 w-full' />
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='md:col-span-2 space-y-4'>
					<Skeleton className='h-48 w-full' />
					<Skeleton className='h-48 w-full' />
					<Skeleton className='h-48 w-full' />
				</div>
				<Skeleton className='h-96 w-full' />
			</div>
		</div>
	)
}
