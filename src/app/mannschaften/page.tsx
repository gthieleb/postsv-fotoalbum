import Link from 'next/link'

export default function MannschaftenPage() {
  const teams = [
    {
      name: 'A-Mannschaft',
      description: 'Herrenmannschaft in der Landesliga',
      coach: 'Christian Fischer',
      contact: '0151 2620 6106',
      email: 'info@postsv1926.de',
      photoCount: 15,
      category: 'herren'
    },
    {
      name: 'B-Jugend',
      description: 'Junioren U17/U19',
      coach: 'Michael Schneemann',
      contact: '0157 3435 2509',
      email: 'mjschneemann@gmx.de',
      photoCount: 12,
      category: 'junioren'
    },
    {
      name: 'C-Jugend',
      description: 'Junioren U15/U17',
      coach: 'Dieter Baumgart',
      contact: '0151 1616 1674',
      email: 'dbd43@web.de',
      photoCount: 8,
      category: 'junioren'
    },
    {
      name: 'D1-Mannschaft',
      description: 'Junioren U13/U15',
      coach: 'Klaus Kittler',
      contact: '0157 5362 7162',
      email: 'chkittler@web.de',
      photoCount: 10,
      category: 'junioren'
    },
    {
      name: 'D2-Mannschaft',
      description: 'Junioren U13/U15',
      coach: 'Jan Gusewski',
      contact: 'janguki@aol.com',
      photoCount: 6,
      category: 'junioren'
    },
    {
      name: 'E1-Jugend',
      description: 'Junioren U11/U13',
      coach: 'Horst Rädke',
      contact: '0170 953 6472',
      email: 'horst.raedke@arcor.de',
      photoCount: 5,
      category: 'junioren'
    },
    {
      name: 'F-Jugend',
      description: 'Junioren U9/U11',
      coach: 'Ralf Winopal',
      contact: '0176 6140 1737',
      email: 'wino@gmx.de',
      photoCount: 4,
      category: 'junioren'
    },
    {
      name: 'Oldies',
      description: 'Traditionsteam für Senioren',
      coach: 'Wilfried Kraatz',
      contact: '0176 6683 3287',
      email: 'wilfried.kraatz@gmail.com',
      photoCount: 20,
      category: 'senioren'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🏆 Unsere Mannschaften</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Übersicht aller Fußballmannschaften des Post SV Magdeburg 1926 e.V.
        </p>
      </div>

      {/* Team Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👨</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Herren</h3>
          <p className="text-gray-600">Erwachsenenmannschaften</p>
        </div>
        
        <div className="text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👦</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Junioren</h3>
          <p className="text-gray-600">Nachwuchsmannschaften</p>
        </div>
        
        <div className="text-center">
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👴</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Oldies</h3>
          <p className="text-gray-600">Traditionsteam</p>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl text-white">⚽</span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                  {team.photoCount} Fotos
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{team.name}</h3>
              <p className="text-gray-600 mb-4">{team.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium w-20">Trainer:</span>
                  <span>{team.coach}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium w-20">Kontakt:</span>
                  <span>{team.contact}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="font-medium w-20">Email:</span>
                  <span className="text-blue-600">{team.email}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link 
                  href={`/galerie?category=${team.category}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
                >
                  Fotos ansehen
                </Link>
                <Link 
                  href="/kontakt"
                  className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-center hover:bg-blue-50 transition-colors"
                >
                  Kontakt
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fotos einreichen</h2>
        <p className="text-gray-600 mb-6">
          Wir freuen uns über Fotos von allen Spielen, Trainingseinheiten und Veranstaltungen! 
          Schick uns deine besten Aufnahmen und hilf mit, die Geschichte des Post SV Magdeburg zu dokumentieren.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📧 Fotos senden an:</h3>
          <p className="text-blue-800 font-medium mb-2">foto@postsvmagdeburg.de</p>
          <p className="text-blue-700">
            Bitte gib in der E-Mail an, für welche Mannschaft das Foto ist und wann es aufgenommen wurde.
          </p>
        </div>
      </div>
    </div>
  )
}