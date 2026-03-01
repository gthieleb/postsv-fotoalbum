import Link from 'next/link'

export default function KontaktPage() {
  const contactInfo = {
    football: {
      name: 'Christian Fischer',
      role: 'Abteilung Fußball',
      phone: '0151 2620 6106',
      email: 'info@postsv1926.de',
      address: 'Sportplatz Spielhagenstraße\nMagdeburg',
      hours: 'Mo-Fr: 18:00-20:00\nSa: 10:00-12:00'
    },
    photos: {
      email: 'foto@postsvmagdeburg.de',
      subject: 'Fotoalbum - Post SV Magdeburg',
      instructions: [
        'Bitte gib den Namen der Mannschaft an',
        'Datum der Aufnahme',
        'Eventuelle Gegner oder Anlässe',
        'Name des Fotografen (optional)',
        'Kurze Beschreibung des Fotos'
      ]
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">📞 Kontakt & Fotos einreichen</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Du hast Fragen oder möchtest Fotos für unser Album einreichen? Hier findest du alle relevanten Kontaktdaten.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📧 Fotos einreichen</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Email für Fotos</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium text-lg mb-2">foto@postsvmagdeburg.de</p>
                <p className="text-blue-700 text-sm">
                  Bitte verwende diese Email-Adresse für alle Fotoeinsendungen!
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Was wir benötigen:</h3>
              <ul className="space-y-2 text-gray-700">
                {contactInfo.photos.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Dateiformate:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded text-sm">JPG</span>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm">PNG</span>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm">HEIC</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Dateigröße:</h3>
              <p className="text-gray-700">
                Ideal: 2-5 MB pro Foto<br />
                Maximale Größe: 10 MB pro Foto
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏟️ Kontakt Abteilung Fußball</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">👤 Hauptansprechpartner</h3>
                <p className="font-medium text-gray-900">{contactInfo.football.name}</p>
                <p className="text-gray-600">{contactInfo.football.role}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">📱 Telefon</h4>
                  <p className="text-gray-700">{contactInfo.football.phone}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📧 Email</h4>
                  <p className="text-blue-600">{contactInfo.football.email}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">📍 Adresse</h4>
                <p className="text-gray-700 whitespace-pre-line">{contactInfo.football.address}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">🕐 Öffnungszeiten</h4>
                <p className="text-gray-700 whitespace-pre-line">{contactInfo.football.hours}</p>
              </div>
            </div>
          </div>

          {/* Other Departments */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">🏃‍♂️ Andere Abteilungen</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Handball:</span>
                <span>0157 3435 2509</span>
              </div>
              <div className="flex justify-between">
                <span>Radsport:</span>
                <span>0157 5362 7162</span>
              </div>
              <div className="flex justify-between">
                <span>Segeln:</span>
                <span>0176 6683 3287</span>
              </div>
              <div className="flex justify-between">
                <span>Schach:</span>
                <span>0171 452 0821</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Schnellzugriff</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/" className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🏠</div>
            <h3 className="font-semibold">Startseite</h3>
          </Link>
          
          <Link href="/mannschaften" className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold">Mannschaften</h3>
          </Link>
          
          <Link href="/galerie" className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📸</div>
            <h3 className="font-semibold">Galerie</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}