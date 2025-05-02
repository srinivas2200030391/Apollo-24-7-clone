import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Doctor from "@/lib/models/doctor"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const city = searchParams.get("city")
    const gender = searchParams.get("gender")
    const language = searchParams.get("language")
    const minExperience = searchParams.get("minExperience")
    const maxExperience = searchParams.get("maxExperience")

    // Build filter query
    const filter: any = {}

    if (city) filter.city = city
    if (gender) filter.gender = gender
    if (language) filter.languages = language

    if (minExperience || maxExperience) {
      filter.experience = {}
      if (minExperience) filter.experience.$gte = Number.parseInt(minExperience)
      if (maxExperience) filter.experience.$lte = Number.parseInt(maxExperience)
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Execute query
    const doctors = await Doctor.find(filter).sort({ rating: -1 }).skip(skip).limit(limit)

    const total = await Doctor.countDocuments(filter)

    return NextResponse.json({
      success: true,
      doctors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch doctors", error: (error as Error).message },
      { status: 500 },
    )
  }
}
