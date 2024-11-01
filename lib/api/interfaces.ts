export interface Stamp {
	contractAddress: string
	chainId: number
	platform: string
	followedAccount: string
}

interface StampSignature {
	signature: string
	deadline: number
	since: number
	stamp: Stamp
	authentic: boolean
}

interface UserData {
	address: string
	instagram?: string | null
	availableStamps?: StampSignature[] | null
}

export type { StampSignature, UserData }
