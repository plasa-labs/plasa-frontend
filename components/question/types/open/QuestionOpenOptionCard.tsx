"use client"

import { useState } from "react"
import { ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import TransactionButton from "@/components/common/TransactionButton"
import { useQuestion } from "@/contexts/QuestionContext"
import { OptionView } from "@/lib/onchain/types/interfaces"
import { formatPoints } from "@/lib/utils/formatters"
import { contractsVote } from "@/lib/onchain/contracts"

interface QuestionOpenOptionCardProps {
	option: OptionView
	id: number
	onVote: (id: number) => void
}

export function QuestionOpenOptionCard({ option, id, onVote }: QuestionOpenOptionCardProps) {
	const { question } = useQuestion()
	const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

	if (!question) return null

	const isActive = question.data.isActive
	const pointsAtDeadline = option.data.pointsAtDeadline
	const proposer = option.data.proposerName
	const title = option.data.title
	const description = option.data.description
	const userVoted = option.user.voted
	const voteCount = option.data.voteCount
	const questionAddress = question?.data.contractAddress as `0x${string}`
	const pointsSymbol = question?.points.data.symbol

	return (
		<Card className="mb-4 hover:shadow-md transition-shadow duration-200">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<CardTitle className="font-semibold">{title}</CardTitle>
					<Badge variant="secondary" className="text-xs">
						{formatPoints(pointsAtDeadline)} {pointsSymbol}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pb-2">
				<Button
					variant="ghost"
					size="sm"
					className="p-0 h-auto font-normal"
					onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
				>
					{isDescriptionVisible ? (
						<ChevronUp className="h-4 w-4 mr-2" />
					) : (
						<ChevronDown className="h-4 w-4 mr-2" />
					)}
					{isDescriptionVisible ? "Ocultar descripción" : "Ver descripción"}
				</Button>
				{isDescriptionVisible && (
					<p className="text-sm text-muted-foreground mt-2">{description}</p>
				)}
			</CardContent>
			<CardFooter className="flex justify-between items-center pt-2">
				<div className="flex items-center space-x-2">
					<Avatar className="h-6 w-6">
						<AvatarImage src={`https://avatar.vercel.sh/${proposer}.png`} alt={proposer} />
						<AvatarFallback>{proposer}</AvatarFallback>
					</Avatar>
					<span className="text-xs text-muted-foreground">
						{proposer}
					</span>
				</div>
				{isActive && !userVoted ? (
					<TransactionButton
						transactionData={contractsVote(questionAddress, id)}
						onSuccess={() => onVote(id)}
					>
						<div className="flex items-center">
							<ThumbsUp className={`mr-4 h-4 w-4 ${userVoted ? 'fill-current' : ''}`} />
							{voteCount}
						</div>
					</TransactionButton>)
					:
					(
						<div className="inline-flex items-center justify-center text-sm font-medium h-10 px-4 py-2">
							<ThumbsUp className={`mr-4 h-4 w-4 ${userVoted ? 'fill-current' : ''}`} />
							{voteCount}
						</div>
					)}
			</CardFooter>
		</Card>
	)
}