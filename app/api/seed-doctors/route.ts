import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Doctor from "@/lib/models/doctor"

const sampleDoctors = [
  {
    name: "Arun Kumar",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 15,
    city: "Hyderabad",
    gender: "Male",
    languages: ["English", "Hindi", "Telugu"],
    consultationFee: 800,
    rating: 4.8,
    reviewCount: 245,
    availability: ["Today", "Tomorrow"]
  },
  {
    name: "Priya Sharma",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, DNB (Family Medicine)",
    experience: 8,
    city: "Bangalore",
    gender: "Female",
    languages: ["English", "Hindi", "Kannada"],
    consultationFee: 700,
    rating: 4.7,
    reviewCount: 178,
    availability: ["Today", "Weekend"]
  },
  {
    name: "Rajesh Verma",\
    image: "/placeholder.svg?height=128&width=128\",  \"Weekend\"]
  },
  {
    name: "Rajesh Verma",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), DM (Cardiology)",
    experience: 20,
    city: "Mumbai",
    gender: "Male",
    languages: ["English", "Hindi", "Marathi"],
    consultationFee: 1200,
    rating: 4.9,
    reviewCount: 312,
    availability: ["Tomorrow", "Weekend"]
  },
  {
    name: "Sneha Reddy",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 12,
    city: "Hyderabad",
    gender: "Female",
    languages: ["English", "Telugu", "Hindi"],
    consultationFee: 900,
    rating: 4.6,
    reviewCount: 189,
    availability: ["Today", "Tomorrow"]
  },
  {
    name: "Vikram Singh",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, DNB (Family Medicine)",
    experience: 10,
    city: "Delhi",
    gender: "Male",
    languages: ["English", "Hindi", "Punjabi"],
    consultationFee: 850,
    rating: 4.5,
    reviewCount: 156,
    availability: ["Today", "Weekend"]
  },
  {
    name: "Ananya Patel",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 7,
    city: "Bangalore",
    gender: "Female",
    languages: ["English", "Hindi", "Gujarati", "Kannada"],
    consultationFee: 750,
    rating: 4.7,
    reviewCount: 132,
    availability: ["Tomorrow", "Weekend"]
  },
  {
    name: "Karthik Rajan",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 14,
    city: "Chennai",
    gender: "Male",
    languages: ["English", "Tamil", "Telugu"],
    consultationFee: 950,
    rating: 4.8,
    reviewCount: 210,
    availability: ["Today", "Tomorrow"]
  },
  {
    name: "Meera Iyer",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, DNB (General Medicine)",
    experience: 9,
    city: "Hyderabad",
    gender: "Female",
    languages: ["English", "Telugu", "Tamil", "Hindi"],
    consultationFee: 800,
    rating: 4.6,
    reviewCount: 145,
    availability: ["Today", "Weekend"]
  },
  {
    name: "Sanjay Gupta",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), DM (Endocrinology)",
    experience: 18,
    city: "Delhi",
    gender: "Male",
    languages: ["English", "Hindi"],
    consultationFee: 1100,
    rating: 4.9,
    reviewCount: 278,
    availability: ["Tomorrow", "Weekend"]
  },
  {
    name: "Lakshmi Narayanan",
    image: "/placeholder.svg?height=128&width=128",
    specialization: "General Physician & Internal Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experience: 11,
    city: "Chennai",
    gender: "Female",
    languages: ["English", "Tamil", "Malayalam"],
    consultationFee: 850,
    rating: 4.7,
    reviewCount: 167,
    availability: ["Today", "Tomorrow"]
  }
]

export async function GET() {
  try {
    await connectToDatabase()

    // Clear existing data
    await Doctor.deleteMany({})

    // Insert sample data
    await Doctor.insertMany(sampleDoctors)

    return NextResponse.json({
      success: true,
      message: "Sample doctors data seeded successfully",
      count: sampleDoctors.length,
    })
  } catch (error) {
    console.error("Error seeding doctors data:", error)
    return NextResponse.json(
      { success: false, message: "Failed to seed doctors data", error: (error as Error).message },
      { status: 500 },
    )
  }
}
