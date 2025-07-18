export interface Hospital {
    id:number
    name: string
    location: string
    rating: number
    image: string
    lat: number
    lng: number
    phone?: string
    services?: string[]
    description?: string
    specialties?: string[]
    hours?: string
    emergency?: boolean
    email?: string
    website?: string
}
