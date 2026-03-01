'use client'

import { useState } from 'react'
import Image from 'next/image'

// Mock Daten für die Fotos - später durch echte Fotos ersetzen
const photos = [
  {
    id: 1,
    title: 'A-Mannschaft 2024',
    description: 'Die A-Mannschaft in voller Besetzung',
    season: '2023/2024',
    category: 'mannschaft',
    src: '/placeholder-a-mannschaft.jpg',
    alt: 'A-Mannschaft Post SV Magdeburg'
  },
  {
    id: 2,
    title: 'B-Jugend 2024',
    description: 'Nach dem Derby-Sieg gegen Lok Stendal',
    season: '2023/2024',
    category: 'mannschaft',
    src: '/placeholder-b-jugend.jpg',
    alt: 'B-Jugend Post SV Magdeburg'
  },
  {
    id: 3,
    title: 'C-Jugend Training',
    description: 'Trainingseinheit im Sommer 2024',
    season: '2024',
    category: 'training',
    src: '/placeholder-c-jugend-training.jpg',
    alt: 'C-Jugend Training'
  },
  {
    id: 4,
    title: 'Oldies 2024',
    description: 'Traditionsteam beim Jubiläumsturnier',
    season: '2024',
    category: 'oldies',
    src: '/placeholder-oldies.jpg',
    alt: 'Oldies Post SV Magdeburg'
  },
  {
    id: 5,
    title: 'D1-Mannschaft',
    description: 'Die D1-Junioren nach dem Spiel',
    season: '2023/2024',
    category: 'mannschaft',
    src: '/placeholder-d1-mannschaft.jpg',
    alt: 'D1-Mannschaft Post SV Magdeburg'
  },
  {
    id: 6,
    title: 'E1-Jugend',
    description: 'Unsere kleinsten Talente',
    season: '2023/2024',
    category: 'mannschaft',
    src: '/placeholder-e1-jugend.jpg',
    alt: 'E1-Jugend Post SV Magdeburg'
  },
  {
    id: 7,
    title: 'F-Jugend Training',
    description: 'Fußball-Nachwuchs in der Ausbildung',
    season: '2024',
    category: 'training',
    src: '/placeholder-f-jugend-training.jpg',
    alt: 'F-Jugend Training'
  },
  {
    id: 8,
    title: 'Historisches Foto 2019',
    description: 'A-Mannschaft vor der Saison 2019/2020',
    season: '2019/2020',
    category: 'historisch',
    src: '/placeholder-historisch-2019.jpg',
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

export default function GaleriePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📸 Foto Galerie</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Entdecke die besten Momente unserer Mannschaften, Trainingseinheiten und historischer Aufnahmen
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            {/* Placeholder für Bild */}
            <div className="aspect-square bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-4xl">📸</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {photo.season}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{photo.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {photo.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Keine Fotos gefunden</h3>
          <p className="text-gray-600">In dieser Kategorie sind aktuell keine Fotos verfügbar.</p>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPhoto.title}</h2>
                  <p className="text-gray-600">{selectedPhoto.description}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {selectedPhoto.season}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {selectedPhoto.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Placeholder für großes Bild */}
              <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl text-gray-400">📸</span>
              </div>
              
              <div className="text-center text-gray-600">
                <p>Hier könnte das hochgeladene Foto erscheinen</p>
                <p className="text-sm mt-2">Fotos bitte an: foto@postsvmagdeburg.de</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}