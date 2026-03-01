"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Heart, Download, Share2, Eye } from "lucide-react"

const photoCategories = [
  {
    id: "mannschaft",
    title: "Mannschaft",
    photos: [
      { id: 1, src: "https://via.placeholder.com/400x400", alt: "Mannschaft 2024", likes: 42, views: 1250 },
      { id: 2, src: "https://via.placeholder.com/400x400", alt: "Training 2024", likes: 38, views: 980 },
      { id: 3, src: "https://via.placeholder.com/400x400", alt: "Auswärtsfahrt", likes: 56, views: 1450 },
    ]
  },
  {
    id: "events",
    title: "Events & Veranstaltungen",
    photos: [
      { id: 4, src: "https://via.placeholder.com/400x400", alt: "Weihnachtsfeier", likes: 78, views: 2100 },
      { id: 5, src: "https://via.placeholder.com/400x400", alt: "Jubiläum", likes: 92, views: 2850 },
      { id: 6, src: "https://via.placeholder.com/400x400", alt: "Sommerfest", likes: 65, views: 1680 },
    ]
  },
  {
    id: "training",
    title: "Training & Sportstätten",
    photos: [
      { id: 7, src: "https://via.placeholder.com/400x400", alt: "Halle 1", likes: 29, views: 720 },
      { id: 8, src: "https://via.placeholder.com/400x400", alt: "Outdoor Platz", likes: 45, views: 1100 },
      { id: 9, src: "https://via.placeholder.com/400x400", alt: "Fitnessbereich", likes: 67, views: 1950 },
    ]
  }
]

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set())

  const toggleLike = (photoId: number) => {
    setLikedPhotos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(photoId)) {
        newSet.delete(photoId)
      } else {
        newSet.add(photoId)
      }
      return newSet
    })
  }

  const allPhotos = photoCategories.flatMap(category => category.photos)
  const filteredPhotos = selectedCategory === "all" 
    ? allPhotos 
    : photoCategories.find(cat => cat.id === selectedCategory)?.photos || []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Fotoalbum
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Entdecke die schönsten Momente des Postsportverein Magdeburg 1926 e.V.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === "all" ? "premium" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="px-6 py-3"
          >
            Alle Fotos
          </Button>
          {photoCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "premium" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="px-6 py-3"
            >
              {category.title}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map(photo => (
            <Card key={photo.id} className="group hover-lift overflow-hidden">
              <div className="relative aspect-square">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative aspect-square md:w-1/2">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-1/2 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{photo.alt}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Schönes Foto aus unserer Sammlung
                          </p>
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <Heart className={`cursor-pointer transition-colors ${likedPhotos.has(photo.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                                    onClick={() => toggleLike(photo.id)} size={20} />
                              <span className="text-sm font-medium">{photo.likes}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="text-gray-400" size={20} />
                              <span className="text-sm font-medium">{photo.views}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="premium" className="flex-1">
                            <Download className="mr-2" size={16} />
                            Herunterladen
                          </Button>
                          <Button variant="premiumSecondary">
                            <Share2 className="mr-2" size={16} />
                            Teilen
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold mb-1">{photo.alt}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className={likedPhotos.has(photo.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} size={14} />
                        {photo.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="text-gray-400" size={14} />
                        {photo.views}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(photo.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className={likedPhotos.has(photo.id) ? 'fill-red-500 text-red-500' : ''} size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {photoCategories.map(category => (
            <Card key={category.id} className="text-center hover-glow">
              <CardHeader>
                <div className="feature-icon mx-auto mb-2">
                  <span className="text-white">📸</span>
                </div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>
                  {category.photos.length} Fotos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">
                  {category.photos.reduce((sum, photo) => sum + photo.likes, 0)}
                </div>
                <p className="text-sm text-gray-500">Gesamte Likes</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}