import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Post SV Magdeburg</h3>
            <p className="text-gray-300 text-sm">
              Postsportverein Magdeburg von 1926 e.V.<br />
              Sport im Herzen von Magdeburg
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Schnelllinks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/mannschaften" className="text-gray-300 hover:text-white">
                  Mannschaften
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-gray-300 hover:text-white">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-300 hover:text-white">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📧 info@postsv1926.de</li>
              <li>📱 Christian Fischer</li>
              <li>📞 0151 2620 6106</li>
              <li>📍 Sportplatz Spielhagenstraße</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2026 Post SV Magdeburg 1926 e.V. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}