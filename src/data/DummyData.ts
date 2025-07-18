import { type Hospital } from "@/types";
import heroImage from "@/assets/hero-image.jpg"

export const dummyHospitals: Hospital[] = [
  {
    id: 5,
    name: 'General Hospital Yaba',
    location: 'Yaba, Lagos',
    phone: '+2348001234567',
    description: 'A leading general hospital in the Yaba area.',
    image: '/images/yaba-hospital.jpg',
    specialties: ['Pediatrics', 'Cardiology', 'Emergency'],
    hours: 'Mon - Fri, 8am - 6pm',
    emergency: true,
    email: 'contact@yabahospital.ng',
    website: 'https://yabahospital.ng',
    rating: 4.5,
    lat: 6.5244,
    lng: 3.3602 
  },
  {
    id: 1,
    name: "General Hospital Ikeja",
    location: "Ikeja, Lagos",
    rating: 4.7,
    image: heroImage,
    lat: 6.6018,
    lng: 3.3515,
    phone: "+2348000000000"
  },
  {
    id: 2,
    name: "St. Nicholas Hospital",
    location: "Lagos Island, Lagos",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1576765607924-b98058e9b3f2?fit=crop&w=600&q=80",
    lat: 6.4515,
    lng: 3.4065,
    phone: "+2348000000000"

  },
  {
    id: 3,
    name: "Reddington Hospital",
    location: "Victoria Island, Lagos",
    rating: 4.6,
    image: "https://pixabay.com/photos/healthcare-medicine-nurse-hospital-6930827/",
    lat: 6.4281,
    lng: 3.4216,
    phone: "+2348000000000"
  },
  {
    id: 4,
    name: "Eko Hospital",
    location: "Ikeja, Lagos",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1578496781985-6caa0e4e6015?fit=crop&w=600&q=80",
    lat: 6.6015,
    lng: 3.3500,
    phone: "+2348000000000"
  }
];
