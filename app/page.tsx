import type { Metadata } from "next"
import DoctorListing from "@/components/doctor-listing"

export const metadata: Metadata = {
  title: "General Physician & Internal Medicine Specialists | Apollo 24/7 Clone",
  description:
    "Consult with top General Physicians & Internal Medicine specialists online. Book appointments with experienced doctors for comprehensive healthcare.",
  openGraph: {
    title: "General Physician & Internal Medicine Specialists | Apollo 24/7 Clone",
    description:
      "Consult with top General Physicians & Internal Medicine specialists online. Book appointments with experienced doctors for comprehensive healthcare.",
    url: "https://apollo247-clone.vercel.app/specialties/general-physician-internal-medicine",
    siteName: "Apollo 247 Clone",
    images: [
      {
        url: "https://apollo247-clone.vercel.app/images/general-physician-og.jpg",
        width: 1200,
        height: 630,
        alt: "General Physician Specialists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
    description:
      "Consult with top General Physicians & Internal Medicine specialists online. Book appointments with experienced doctors for comprehensive healthcare.",
    images: ["https://apollo247-clone.vercel.app/images/general-physician-og.jpg"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: "Apollo 24/7 Clone - General Physician",
            description:
              "Consult with top General Physicians & Internal Medicine specialists online. Book appointments with experienced doctors for comprehensive healthcare.",
            medicalSpecialty: "General Practice",
            availableService: {
              "@type": "MedicalProcedure",
              name: "General Physician Consultation",
              procedureType: "http://schema.org/PhysicalExam",
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Sample Street",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              postalCode: "500001",
              addressCountry: "IN",
            },
            telephone: "+91-1234567890",
            url: "https://apollo247-clone.vercel.app/specialties/general-physician-internal-medicine",
          }),
        }}
      />
      <DoctorListing />
    </main>
  )
}
