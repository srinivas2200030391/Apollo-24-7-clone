"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star, Clock, MapPin, Calendar, Video } from "lucide-react"
import Header from "@/components/header"
import type { Doctor } from "@/lib/types"

export default function DoctorListing() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  // Filter states
  const [city, setCity] = useState(searchParams.get("city") || "")
  const [gender, setGender] = useState(searchParams.get("gender") || "")
  const [experience, setExperience] = useState<number[]>([0, 30])
  const [language, setLanguage] = useState(searchParams.get("language") || "")
  const [page, setPage] = useState(Number.parseInt(searchParams.get("page") || "1"))
  const [limit] = useState(10)

  useEffect(() => {
    fetchDoctors()
  }, [page, city, gender, language, experience])

  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      })

      if (city) queryParams.append("city", city)
      if (gender) queryParams.append("gender", gender)
      if (language) queryParams.append("language", language)
      if (experience[0] > 0 || experience[1] < 30) {
        queryParams.append("minExperience", experience[0].toString())
        queryParams.append("maxExperience", experience[1].toString())
      }

      const response = await fetch(`/api/list-doctor-with-filter?${queryParams.toString()}`)
      const data = await response.json()

      setDoctors(data.doctors)
      setTotalDoctors(data.total)
      setTotalPages(Math.ceil(data.total / limit))
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    const queryParams = new URLSearchParams({
      page: "1",
    })

    if (city) queryParams.append("city", city)
    if (gender) queryParams.append("gender", gender)
    if (language) queryParams.append("language", language)
    if (experience[0] > 0 || experience[1] < 30) {
      queryParams.append("minExperience", experience[0].toString())
      queryParams.append("maxExperience", experience[1].toString())
    }

    router.push(`/?${queryParams.toString()}`)
    setPage(1)
  }

  const resetFilters = () => {
    setCity("")
    setGender("")
    setLanguage("")
    setExperience([0, 30])
    setPage(1)
    router.push("/")
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)

    const queryParams = new URLSearchParams(searchParams.toString())
    queryParams.set("page", newPage.toString())
    router.push(`/?${queryParams.toString()}`)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#02475b] mb-2">General Physician & Internal Medicine</h1>
          <p className="text-gray-600">
            General physicians are highly trained specialists who provide a range of non-surgical health care to adult
            patients. They care for difficult, serious or unusual medical problems and continue to see the patient until
            these problems have resolved or stabilized.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Section */}
          <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-[#02475b] mb-4">Filters</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience: {experience[0]} - {experience[1]} years
                </label>
                <Slider
                  defaultValue={[0, 30]}
                  min={0}
                  max={30}
                  step={1}
                  value={experience}
                  onValueChange={setExperience}
                  className="my-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Kannada">Kannada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="availability-today" />
                  <Label htmlFor="availability-today">Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="availability-tomorrow" />
                  <Label htmlFor="availability-tomorrow">Tomorrow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="availability-weekend" />
                  <Label htmlFor="availability-weekend">This Weekend</Label>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button onClick={applyFilters} className="bg-[#ff6f61] hover:bg-[#ff5c4d] text-white">
                  Apply Filters
                </Button>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Doctor Listing Section */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#02475b]">
                  {loading ? "Loading doctors..." : `${totalDoctors} Doctors found`}
                </h2>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="experience-high">Experience: High to Low</SelectItem>
                    <SelectItem value="experience-low">Experience: Low to High</SelectItem>
                    <SelectItem value="fee-high">Fee: High to Low</SelectItem>
                    <SelectItem value="fee-low">Fee: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6f61]"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {doctors.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <h3 className="text-xl font-semibold text-[#02475b] mb-2">No doctors found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                  </div>
                ) : (
                  doctors.map((doctor) => (
                    <div key={doctor._id} className="bg-white rounded-lg shadow-sm p-4">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 flex flex-col items-center mb-4 md:mb-0">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
                            <Image
                              src={doctor.image || "/placeholder.svg?height=128&width=128"}
                              alt={doctor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-center text-yellow-500 mb-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4"
                                fill={i < Math.floor(doctor.rating) ? "currentColor" : "none"}
                              />
                            ))}
                            <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500">{doctor.reviewCount} Patient Stories</p>
                        </div>

                        <div className="md:w-2/4 md:px-4">
                          <h3 className="text-xl font-semibold text-[#02475b]">Dr. {doctor.name}</h3>
                          <p className="text-gray-600 mb-2">{doctor.specialization}</p>
                          <p className="text-sm text-gray-500 mb-2">{doctor.qualification}</p>

                          <div className="flex items-center text-gray-600 mb-2">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">{doctor.experience} years experience</span>
                          </div>

                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{doctor.city}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-3">
                            {doctor.languages.map((lang, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="md:w-1/4 flex flex-col justify-between mt-4 md:mt-0">
                          <div>
                            <p className="text-lg font-semibold text-[#02475b]">₹{doctor.consultationFee}</p>
                            <p className="text-xs text-gray-500 mb-4">Consultation fee</p>

                            <div className="flex items-center mb-2">
                              <Calendar className="h-4 w-4 text-[#ff6f61] mr-2" />
                              <span className="text-sm">Available Today</span>
                            </div>

                            <div className="flex items-center">
                              <Video className="h-4 w-4 text-[#ff6f61] mr-2" />
                              <span className="text-sm">Video Consultation</span>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 mt-4">
                            <Button className="bg-[#ff6f61] hover:bg-[#ff5c4d] text-white">Book Now</Button>
                            <Button variant="outline" className="border-[#ff6f61] text-[#ff6f61] hover:bg-[#fff1f0]">
                              Consult Online
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {totalPages > 1 && (
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(page - 1)}
                          className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1
                        // Show first page, last page, current page, and pages around current page
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= page - 1 && pageNumber <= page + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => handlePageChange(pageNumber)}
                                isActive={page === pageNumber}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        }

                        // Show ellipsis for gaps
                        if (pageNumber === page - 2 || pageNumber === page + 2) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <span className="flex h-9 w-9 items-center justify-center">...</span>
                            </PaginationItem>
                          )
                        }

                        return null
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(page + 1)}
                          className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
