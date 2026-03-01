import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            📸 Post SV Magdeburg
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8">
            Offizielles Fotoalbum 1926 e.V.
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            Entdecke die besten Momente unserer Mannschaften, historische Aufnahmen und aktuelle Saisons in unserem digitalen Fotoalbum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/galerie" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Zur Galerie
            </Link>
            <Link 
              href="/mannschaften" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Mannschaften
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Was du hier findest
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unser Fotoalbum bietet einen umfassenden Überblick über alle Mannschaften und ihre Erfolge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mannschaftsfotos</h3>
              <p className="text-gray-600">Aktuelle Aufnahmen aller Teams und Kategorien</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Spielmomente</h3>
              <p className="text-gray-600">Die schönsten Momente auf dem Feld</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Erfolge</h3>
              <p className="text-gray-600">Feiernde Momente nach Siegen und Titeln</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Archiv</h3>
              <p className="text-gray-600">Historische Aufnahmen aus vergangener Zeiten</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Deine Fotos sind gefragt!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schick uns deine besten Mannschaftsfotos und hilf mit, die Geschichte des Post SV Magdeburg zu dokumentieren.
          </p>
          <Link 
            href="/kontakt" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Fotos einreichen
          </Link>
        </div>
      </section>
    </div>
  );
}