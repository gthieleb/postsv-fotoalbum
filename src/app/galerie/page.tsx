'use client'

import { useState } from 'react'
import Image from 'next/image'

const photos = [
  {
    id: 1,
    title: 'A-Mannschaft 2024',
    description: 'Die A-Mannschaft in voller Besetzung',
    season: '2023/2024',
    category: 'mannschaft',
    src: 'https://picsum.photos/seed/a-mannschaft-2024/800/600',
    thumb: 'https://picsum.photos/seed/a-mannschaft-2024/400/300',
    alt: 'A-Mannschaft Post SV Magdeburg'
  },
  {
    id: 2,
    title: 'B-Jugend 2024',
    description: 'Nach dem Derby-Sieg gegen Lok Stendal',
    season: '2023/2024',
    category: 'mannschaft',
    src: 'https://picsum.photos/seed/b-jugend-2024/800/600',
    thumb: 'https://picsum.photos/seed/b-jugend-2024/400/300',
    alt: 'B-Jugend Post SV Magdeburg'
  },
  {
    id: 3,
    title: 'C-Jugend Training',
    description: 'Trainingseinheit im Sommer 2024',
    season: '2024',
    category: 'training',
    src: 'https://picsum.photos/seed/c-jugend-training/800/600',
    thumb: 'https://picsum.photos/seed/c-jugend-training/400/300',
    alt: 'C-Jugend Training'
  },
  {
    id: 4,
    title: 'Oldies 2024',
    description: 'Traditionsteam beim Jubiläumsturnier',
    season: '2024',
    category: 'oldies',
    src: 'https://picsum.photos/seed/oldies-2024/800/600',
    thumb: 'https://picsum.photos/seed/oldies-2024/400/300',
    alt: 'Oldies Post SV Magdeburg'
  },
  {
    id: 5,
    title: 'D1-Mannschaft',
    description: 'Die D1-Junioren nach dem Spiel',
    season: '2023/2024',
    category: 'mannschaft',
    src: 'https://picsum.photos/seed/d1-mannschaft/800/600',
    thumb: 'https://picsum.photos/seed/d1-mannschaft/400/300',
    alt: 'D1-Mannschaft Post SV Magdeburg'
  },
  {
    id: 6,
    title: 'E1-Jugend',
    description: 'Unsere kleinsten Talente',
    season: '2023/2024',
    category: 'mannschaft',
    src: 'https://picsum.photos/seed/e1-jugend/800/600',
    thumb: 'https://picsum.photos/seed/e1-jugend/400/300',
    alt: 'E1-Jugend Post SV Magdeburg'
  },
  {
    id: 7,
    title: 'F-Jugend Training',
    description: 'Fußball-Nachwuchs in der Ausbildung',
    season: '2024',
    category: 'training',
    src: 'https://picsum.photos/seed/f-jugend-training/800/600',
    thumb: 'https://picsum.photos/seed/f-jugend-training/400/300',
    alt: 'F-Jugend Training'
  },
  {
    id: 8,
    title: 'Historisches Foto 2019',
    description: 'A-Mannschaft vor der Saison 2019/2020',
    season: '2019/2020',
    category: 'historisch',
    src: 'https://picsum.photos/seed/historisch-2019/800/600',
    thumb: 'https://picsum.photos/seed/historisch-2019/400/300',
    alt: 'Historisches Foto Post SV Magdeburg'
  }
]

const categories = [
  { id: 'all', name: 'Alle', count: photos.length },
  { id: 'mannschaft', name: 'Mannschaften', count: photos.filter(p => p.category === 'mannschaft').length },
  { id: 'training', name: 'Training', count: photos.filter(p => p.category === 'training').length },
  { id: 'oldies', name: 'Oldies', count: photos.filter(p => p.category === 'oldies').length },
  { id: 'historisch', name: 'Historisch', count: photos.filter(p => p.category === 'historisch').length }
]

type Photo = typeof photos[number]

export default function GaleriePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Galerie
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Foto Galerie</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecke die besten Momente unserer Mannschaften, Trainingseinheiten und historischer Aufnahmen
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="photo-card-image aspect-square relative">
                <Image
                  src={photo.thumb}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                />
                <div className="photo-card-overlay" />
                <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium">
                  {photo.season}
                </div>
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-card-foreground mb-1">{photo.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{photo.description}</p>
                <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Keine Fotos gefunden</h3>
            <p className="text-muted-foreground">In dieser Kategorie sind aktuell keine Fotos verfügbar.</p>
          </div>
        )}

        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedPhoto(null)}>
            <div className="bg-card rounded-2xl max-w-5xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{selectedPhoto.title}</h2>
                    <p className="text-muted-foreground">{selectedPhoto.description}</p>
                    <div className="flex gap-3 mt-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {selectedPhoto.season}
                      </span>
                      <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                        {selectedPhoto.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="text-muted-foreground hover:text-foreground text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="aspect-video relative rounded-xl overflow-hidden">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="text-center text-muted-foreground mt-4">
                  <p>Eigene Fotos bitte an: foto@postsvmagdeburg.de</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
