import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Doctor from "@/lib/models/doctor"

export async function POST(request: Request) {
  try {
    await connectToDatabase()

    const body = await request.json()
    console.log("Received body :", body)

    const isArray = Array.isArray(body)

    const doctors = isArray ? body : [body]

    const requiredFields = [
      "name",
      "specialization",
      "qualification",
      "experience",
      "city",
      "gender",
      "languages",
      "consultationFee"
    ]

    // Validate each doctor 
    for (const doc of doctors) {
      for (const field of requiredFields) {
        if (!doc[field]) {
          return NextResponse.json(
            { success: false, message: `Missing required field: ${field} in one of the doctors` },
            { status: 400 }
          )
        }
      }
    }

    const result = await Doctor.insertMany(doctors)

    return NextResponse.json(
      { success: true, message: `${result.length} doctors added successfully`, doctors: result },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error adding doctor(s):", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add doctor(s)",
        error: (error as Error).message
      },
      { status: 500 }
    )
  }
}
