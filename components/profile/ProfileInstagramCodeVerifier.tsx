'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Instagram, MessageCircle, Key, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { usePrivy } from '@privy-io/react-auth'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { useFirestore } from '@/contexts/FirestoreContext'
import { verifyInstagramCode } from '@/lib/api/endpoints'
import { InstagramCodeVerificationStatus } from '@/lib/api/interfaces'

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "El código debe tener 6 caracteres.",
	}),
})

/**
 * Instructions component displays a step-by-step guide for obtaining the Instagram verification code
 */
export function Instructions() {
	return (
		<div className="">
			<div className="bg-muted p-4 rounded-md space-y-2">
				<h3 className="font-semibold">Cómo obtener tu código:</h3>
				<ol className="list-decimal list-inside space-y-1">
					<li className="flex items-center">
						<Instagram className="w-4 h-4 mr-2" />
						Abrí Instagram
					</li>
					<li className="flex items-center">
						<Search className="w-4 h-4 mr-2" />
						Buscá @ddfundacion
					</li>
					<li className="flex items-center">
						<MessageCircle className="w-4 h-4 mr-2" />
						Enviá un mensaje directo
					</li>
					<li className="flex items-center">
						<Key className="w-4 h-4 mr-2" />
						Recibí automáticamente el código
					</li>
				</ol>
			</div>
		</div>)
}

interface ProfileInstagramCodeVerifierDialogProps {
	/** Callback function to be executed upon successful verification */
	onVerificationSuccess?: () => void
}

/**
 * ProfileInstagramCodeVerifierDialog component handles the Instagram verification process
 * It displays a form with a 6-digit OTP input and manages the verification state
 */
export function ProfileInstagramCodeVerifierDialog({ onVerificationSuccess }: ProfileInstagramCodeVerifierDialogProps) {
	const [verificationStatus, setVerificationStatus] = useState<InstagramCodeVerificationStatus | null>(null)
	const [isVerifying, setIsVerifying] = useState(false)

	const { user } = usePrivy()
	const { asyncSetUserFirestore } = useFirestore()

	const smartWalletAddress = user?.smartWallet?.address

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	})

	const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
		if (!smartWalletAddress) return

		setIsVerifying(true)
		try {
			const code = parseInt(data.pin)
			const response = await verifyInstagramCode(code, smartWalletAddress)
			setVerificationStatus(response.status)

			if (response.status === InstagramCodeVerificationStatus.SUCCESS) {
				await asyncSetUserFirestore(response.user_data)
				onVerificationSuccess?.()
			}
		} catch (error) {
			console.error('Error verifying Instagram code:', error)
			setVerificationStatus(InstagramCodeVerificationStatus.INVALID_CODE)
		} finally {
			setIsVerifying(false)
		}
	}

	return (
		<div className='space-y-6'>
			<Instructions />
			<Form {...form} >
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="pin"
						render={({ field }) => (
							<FormItem className="">
								<FormLabel>Ingresá el código</FormLabel>
								<FormControl >
									<InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS} >
										<InputOTPGroup >
											<InputOTPSlot index={0} className="w-12" />
											<InputOTPSlot index={1} className="w-12" />
											<InputOTPSlot index={2} className="w-12" />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup >
											<InputOTPSlot index={3} className="w-12" />
											<InputOTPSlot index={4} className="w-12" />
											<InputOTPSlot index={5} className="w-12" />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								{/* <FormDescription>
										Por favor, ingresá el código enviado a tu teléfono.
									</FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={isVerifying || form.watch('pin').length !== 6}>
						{isVerifying ? 'Verificando...' : 'Verificar código'}
					</Button>
				</form>
			</Form>

			<AnimatePresence>
				{verificationStatus && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className={`p-4 rounded-md ${verificationStatus === InstagramCodeVerificationStatus.SUCCESS
							? 'bg-green-100 text-green-800'
							: 'bg-red-100 text-red-800'
							}`}
					>
						<p className="text-sm font-medium">{verificationStatus}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}