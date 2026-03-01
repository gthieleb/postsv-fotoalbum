'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <div className="text-center animate-slide-up">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <span className="text-4xl">📸</span>
              </div>
              <div className="premium-badge inline-block mb-6">
                PREMIUM FOTOALBUM
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
              Post SV Magdeburg
            </h1>
            <h2 className="text-2xl md:text-4xl font-light mb-8 opacity-90">
              Offizielles Fotoalbum 1926 e.V.
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-80 leading-relaxed">
              Entdecke die besten Momente unserer Mannschaften, historische Aufnahmen und aktuelle Saisons in unserem digitalen Fotoalbum.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/galerie" 
                className="premium-btn group"
              >
                <span>🎨</span>
                <span>Zur Galerie</span>
                <span className="text-sm opacity-75">→</span>
              </Link>
              <Link 
                href="/mannschaften" 
                className="premium-btn premium-btn-secondary group"
              >
                <span>⚽</span>
                <span>Mannschaften</span>
                <span className="text-sm opacity-75">→</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:from-transparent to-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <div className="premium-badge inline-block mb-4">
              WAS DU HIER FINDEST
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Premium Foto-Erlebnis
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Unser Fotoalbum bietet einen umfassenden Überblick über alle Mannschaften und ihre Erfolge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="premium-card hover-lift text-center animate-slide-up-delay-1">
              <div className="feature-icon mx-auto mb-6">
                <span className="text-white">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Mannschaftsfotos
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Aktuelle Aufnahmen aller Teams und Kategorien in höchster Qualität
              </p>
            </div>

            <div className="premium-card hover-lift text-center animate-slide-up-delay-2">
              <div className="feature-icon mx-auto mb-6">
                <span className="text-white">📸</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Spielmomente
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Die schönsten Momente auf dem Feld in dynamischer Darstellung
              </p>
            </div>

            <div className="premium-card hover-lift text-center animate-slide-up-delay-3">
              <div className="feature-icon mx-auto mb-6">
                <span className="text-white">🎉</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Erfolge
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Feiernde Momente nach Siegen und Titeln in brillanter Qualität
              </p>
            </div>

            <div className="premium-card hover-lift text-center animate-slide-up-delay-3">
              <div className="feature-icon mx-auto mb-6">
                <span className="text-white">📖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Archiv
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Historische Aufnahmen aus vergangener Zeiten mit modernem Flair
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                15+
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400">
                Mannschaften
              </div>
            </div>
            <div className="animate-slide-up-delay-1">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                1000+
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400">
                Fotos
              </div>
            </div>
            <div className="animate-slide-up-delay-2">
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                95+
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400">
                Jahre Geschichte
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <div className="premium-badge inline-block mb-6">
              MITMACHEN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow">
              Deine Fotos sind gefragt!
            </h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Schick uns deine besten Mannschaftsfotos und hilf mit, die Geschichte des Post SV Magdeburg zu dokumentieren.
            </p>
            <Link 
              href="/kontakt" 
              className="premium-btn bg-white text-blue-600 hover:bg-gray-100 group"
            >
              <span>📧</span>
              <span>Fotos einreichen</span>
              <span className="text-sm opacity-75">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Was unsere Mitglieder sagen
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="premium-card animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  CF
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Christian Fischer</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vorsitzender</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Das neue Design ist fantastisch! Unsere Mitglieder lieven die moderne und professionelle Darstellung unserer Fotoalben."
              </p>
            </div>
            
            <div className="premium-card animate-slide-up-delay-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  MS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Max Schneider</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Trainer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Endlich eine Plattform, die die Qualität unserer Arbeit widerspiegelt. Die Galerie ist einfach genial!"
              </p>
            </div>
            
            <div className="premium-card animate-slide-up-delay-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  LJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Lisa Johnson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pressesprecherin</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Die responsive Design und die schnelle Ladezeiten machen diese Seite zu einem echten Erlebnis für alle Besucher."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}