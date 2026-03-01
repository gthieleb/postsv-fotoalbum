'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PSV</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Post SV Magdeburg</h1>
                <p className="text-xs text-gray-500">1926 e.V.</p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:block">
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Startseite
              </Link>
              <Link href="/mannschaften" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Mannschaften
              </Link>
              <Link href="/galerie" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Galerie
              </Link>
              <Link href="/kontakt" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Kontakt
              </Link>
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Startseite
              </Link>
              <Link href="/mannschaften" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Mannschaften
              </Link>
              <Link href="/galerie" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Galerie
              </Link>
              <Link href="/kontakt" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Kontakt
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}