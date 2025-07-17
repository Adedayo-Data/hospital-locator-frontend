export interface Hospital {
  name: string
  location: string
  rating: number
  image: string
}

export const dummyHospitals: Hospital[] = [
  {
    name: "General Hospital Ikeja",
    location: "Ikeja, Lagos",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589758438368-7a1e5fbf7d84?fit=crop&w=600&q=80"
  },
  {
    name: "St. Nicholas Hospital",
    location: "Lagos Island, Lagos",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1576765607924-b98058e9b3f2?fit=crop&w=600&q=80"
  },
  {
    name: "Reddington Hospital",
    location: "Victoria Island, Lagos",
    rating: 4.6,
    image: "https://pixabay.com/photos/healthcare-medicine-nurse-hospital-6930827/"
  },
  {
    name: "Eko Hospital",
    location: "Ikeja, Lagos",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1578496781985-6caa0e4e6015?fit=crop&w=600&q=80"
  }
]
