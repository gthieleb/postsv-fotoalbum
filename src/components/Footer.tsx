import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const footerLinks = [
    { name: 'Startseite', href: '/' },
    { name: 'Mannschaften', href: '/mannschaften' },
    { name: 'Galerie', href: '/galerie' },
    { name: 'Kontakt', href: '/kontakt' },
  ]

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Club Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">PSV</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Post SV Magdeburg</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Postsportverein Magdeburg von 1926 e.V.<br />
                Sport im Herzen von Magdeburg
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6">Schnelllinks</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-blue-400 text-xl">📧</span>
                <div>
                  <p className="text-gray-300 text-sm">info@postsv1926.de</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-blue-400 text-xl">📱</span>
                <div>
                  <p className="text-gray-300 text-sm">Christian Fischer</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-blue-400 text-xl">📞</span>
                <div>
                  <p className="text-gray-300 text-sm">0151 2620 6106</p>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start space-x-3"
                whileHover={{ x: 5 }}
              >
                <span className="text-blue-400 text-xl">📍</span>
                <div>
                  <p className="text-gray-300 text-sm">Sportplatz Spielhagenstraße</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Bleibe auf dem Laufenden mit unseren neuesten News und Updates aus dem Verein.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Deine E-Mail-Adresse"
                className="premium-input bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full premium-btn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Abonnieren
              </button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="premium-divider"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} Post SV Magdeburg 1926 e.V. Alle Rechte vorbehalten.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex space-x-6 mt-4 md:mt-0"
          >
            <Link href="/impressum" className="text-gray-400 hover:text-white text-sm transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-gray-400 hover:text-white text-sm transition-colors">
              Datenschutz
            </Link>
            <Link href="/agb" className="text-gray-400 hover:text-white text-sm transition-colors">
              AGB
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-white text-xl">↑</span>
        </motion.button>
      </motion.div>
    </footer>
  )
}