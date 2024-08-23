'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/app/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card"
import { Rocket, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Launch {
  id: string
  name: string
  date_utc: string
  success: boolean
  links: {
    webcast: string
    wikipedia: string
    patch: {
      small: string
      large: string
    }
  }
}

export default function Component() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v5/launches')
        if (!response.ok) {
          throw new Error('Failed to fetch launches')
        }
        const data = await response.json()
        setLaunches(data)
        setLoading(false)
      } catch (err) {
        setError('An error occurred while fetching launch data')
        setLoading(false)
      }
    }

    fetchLaunches()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                SpaceX Launch Explorer
              </h1>
              <p className="mt-4 text-xl text-blue-100">
              Descubre los últimos lanzamientos y misiones de SpaceX. Manténgase al día con los esfuerzos de exploración espacial más recientes.
              </p>
              <div className="mt-8">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="/about">
                  Más información
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <Rocket className="w-full h-64" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-50">
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Lanzamientos recientes</h2>
          {loading && <p className="text-center text-gray-600">Loading launches...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {launches.slice(0, 20).map((launch) => (
              <Card key={launch.id} className="flex flex-col">
                <CardHeader>
                <div className="w-full h-48 relative mb-4 items-center justify-center">
                    {launch.links.patch.small ? (
                      <img
                        src={launch.links.patch.small}
                        alt={`${launch.name} mission patch`}
                        className="  rounded-lg lg:w-[50%] sm:w-[37%]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Rocket className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardTitle>{launch.name}</CardTitle>
                  <CardDescription>
                    {new Date(launch.date_utc).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${launch.success ? 'text-green-600' : 'text-red-600'}`}>
                    {launch.success ? 'Exitoso' : 'Fallido'}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    {launch.links.webcast && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
                          Webcast <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {launch.links.wikipedia && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
                          Wikipedia <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{new Date().getFullYear()} SpaceX Launch Explorer. by dark0.</p>
        </div>
      </footer>
    </div>
  )
}