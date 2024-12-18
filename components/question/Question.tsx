'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Common question components
import QuestionHeader from './QuestionHeader'
import QuestionDetails from './QuestionDetails'
import QuestionInformation from './QuestionInformation'
import QuestionLoading from './QuestionLoading'
import QuestionRecentVotes from './QuestionRecentVotes'
import QuestionTotalVotes from './QuestionTotalVotes'

// Question type specific components
import QuestionFixed from './types/fixed/QuestionFixed'
import QuestionOpen from './types/open/QuestionOpen'

import { QuestionType } from '@/lib/onchain/types/interfaces'

// Contexts
import { QuestionProvider, useQuestion } from '@/contexts/QuestionContext'

interface QuestionProps {
	questionAddress: string
}

export default function Question({ questionAddress }: QuestionProps) {
	return (
		<QuestionProvider questionAddress={questionAddress}>
			<QuestionContent />
		</QuestionProvider>
	)
}

function QuestionContent() {
	const { question, isLoading, isError } = useQuestion()

	if (isLoading) return <QuestionLoading />
	if (isError || !question) return <div>Error al cargar los datos</div>

	return (
		<div className='main-container'>
			<Link href='/' passHref prefetch={true}>
				<Button variant='outline' className='mb-6'>
					<ArrowLeft className='mr-2 h-4 w-4' />
					{/* Volver a {space?.data.name ? space.data.name : 'Espacio'} */}
					Volver a Inicio
				</Button>
			</Link>

			<QuestionHeader />

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				<div className='lg:col-span-2 space-y-6'>
					<QuestionDetails />
					<QuestionTypeComponent />
				</div>
				<div className='space-y-6'>
					<QuestionTotalVotes />
					<QuestionRecentVotes />
					<QuestionInformation />
				</div>
			</div>
		</div>
	)
}

function QuestionTypeComponent() {
	const { question } = useQuestion()
	const type = question?.data.questionType
	switch (type) {
		case QuestionType.Fixed:
			return <QuestionFixed />
		case QuestionType.Open:
			return <QuestionOpen />
	}
}