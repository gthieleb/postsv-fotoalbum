'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`premium-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">PSV</span>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Post SV Magdeburg
                </h1>
                <p className="text-xs md:text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                  1926 e.V.
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-1">
              <Link 
                href="/" 
                className="premium-nav-link px-4 py-2"
              >
                Startseite
              </Link>
              <Link 
                href="/mannschaften" 
                className="premium-nav-link px-4 py-2"
              >
                Mannschaften
              </Link>
              <Link 
                href="/galerie" 
                className="premium-nav-link px-4 py-2"
              >
                Galerie
              </Link>
              <Link 
                href="/kontakt" 
                className="premium-nav-link px-4 py-2"
              >
                Kontakt
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/" 
                  className="premium-nav-link px-4 py-3 text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Startseite
                </Link>
                <Link 
                  href="/mannschaften" 
                  className="premium-nav-link px-4 py-3 text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mannschaften
                </Link>
                <Link 
                  href="/galerie" 
                  className="premium-nav-link px-4 py-3 text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Galerie
                </Link>
                <Link 
                  href="/kontakt" 
                  className="premium-nav-link px-4 py-3 text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontakt
                </Link>
              </div>
            </motion.div>
        )}
      </div>
    </header>
  )
}