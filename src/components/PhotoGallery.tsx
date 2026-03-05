"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog"
import { Heart, Download, Share2, Eye, Camera, Users, Trophy } from "lucide-react"

const photoCategories = [
  {
    id: "mannschaft",
    title: "Mannschaft",
    icon: Users,
    photos: [
      { id: 1, src: "https://picsum.photos/seed/mannschaft1/800/600", alt: "Mannschaft 2024", likes: 42, views: 1250 },
      { id: 2, src: "https://picsum.photos/seed/mannschaft2/800/600", alt: "Training 2024", likes: 38, views: 980 },
      { id: 3, src: "https://picsum.photos/seed/mannschaft3/800/600", alt: "Auswärtsfahrt", likes: 56, views: 1450 },
    ]
  },
  {
    id: "events",
    title: "Events & Veranstaltungen",
    icon: Trophy,
    photos: [
      { id: 4, src: "https://picsum.photos/seed/event1/800/600", alt: "Weihnachtsfeier", likes: 78, views: 2100 },
      { id: 5, src: "https://picsum.photos/seed/event2/800/600", alt: "Jubiläum", likes: 92, views: 2850 },
      { id: 6, src: "https://picsum.photos/seed/event3/800/600", alt: "Sommerfest", likes: 65, views: 1680 },
    ]
  },
  {
    id: "training",
    title: "Training & Sportstätten",
    icon: Camera,
    photos: [
      { id: 7, src: "https://picsum.photos/seed/training1/800/600", alt: "Halle 1", likes: 29, views: 720 },
      { id: 8, src: "https://picsum.photos/seed/training2/800/600", alt: "Outdoor Platz", likes: 45, views: 1100 },
      { id: 9, src: "https://picsum.photos/seed/training3/800/600", alt: "Fitnessbereich", likes: 67, views: 1950 },
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

  const allPhotos = photoCategories.flatMap(category => 
    category.photos.map(photo => ({ ...photo, category: category.title }))
  )
  
  const filteredPhotos = selectedCategory === "all" 
    ? allPhotos 
    : allPhotos.filter(photo => photo.category === photoCategories.find(cat => cat.id === selectedCategory)?.title)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Post SV Magdeburg 1926 e.V.
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Fotoalbum</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecke die schönsten Momente unseres Vereins
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            Alle Fotos ({allPhotos.length})
          </button>
          {photoCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-card text-foreground hover:bg-muted border border-border"
              }`}
            >
              {category.title} ({category.photos.length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <div 
                  className="photo-card group cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="photo-card-image aspect-[4/3] relative">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="photo-card-overlay" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-3 text-white text-sm">
                        <span className="flex items-center gap-1">
                          <Heart size={14} className={likedPhotos.has(photo.id) ? "fill-red-500 text-red-500" : ""} />
                          {photo.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {photo.views}
                        </span>
                      </div>
                      <Eye className="text-white" size={20} />
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold text-card-foreground mb-1">{photo.alt}</h3>
                    <p className="text-sm text-muted-foreground">{photo.category}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-card">
                <div className="flex flex-col md:flex-row gap-6 p-2">
                  <div className="relative aspect-[4/3] md:w-1/2 rounded-xl overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">{photo.alt}</h2>
                      <p className="text-muted-foreground mb-4">{photo.category}</p>
                      <div className="flex items-center gap-6 mb-6">
                        <button 
                          onClick={() => toggleLike(photo.id)}
                          className="flex items-center gap-2 text-foreground hover:text-red-500 transition-colors"
                        >
                          <Heart className={likedPhotos.has(photo.id) ? "fill-red-500 text-red-500" : ""} size={20} />
                          <span className="font-medium">{photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}</span>
                        </button>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Eye size={20} />
                          <span className="font-medium">{photo.views}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="btn-primary flex items-center gap-2 flex-1">
                        <Download size={18} />
                        Herunterladen
                      </button>
                      <button className="btn-outline flex items-center gap-2">
                        <Share2 size={18} />
                        Teilen
                      </button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {photoCategories.map(category => {
            const Icon = category.icon
            const totalLikes = category.photos.reduce((sum, photo) => sum + photo.likes, 0)
            return (
              <div key={category.id} className="p-6 rounded-xl bg-card border border-border hover-lift">
                <div className="flex items-start gap-4">
                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.photos.length} Fotos
                    </p>
                    <div className="text-2xl font-bold text-gradient">
                      {totalLikes}
                    </div>
                    <p className="text-sm text-muted-foreground">Gesamte Likes</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
