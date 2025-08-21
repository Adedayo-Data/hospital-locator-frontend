export interface Hospital {
    id:number
    hospitalName: string
    location: string
    rating: number
    image: string
    lat: number
    lng: number
    phone?: string
    services?: string[]
    description?: string
    specialties?: string[]
    openingHours?: string
    emergency?: boolean
    email?: string
    website?: string
}
