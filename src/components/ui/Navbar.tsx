import { useEffect, useState } from "react"
import { LogIn } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          HospitalLocator
        </Link>

        {/* Nav Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link
            to="/"
            className={`hover:text-green-700 ${
              location.pathname === "/" ? "text-green-700 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`hover:text-green-700 ${
              location.pathname === "/about" ? "text-green-700 font-semibold" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`hover:text-green-700 ${
              location.pathname === "/contact" ? "text-green-700 font-semibold" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Sign In */}
        <div className="flex items-center gap-2">
          {/* You can replace this with user name if authenticated */}
          <Link
            to="/login"
            className="text-green-700 hover:text-green-900 transition"
            title="Sign in"
          >
            <LogIn className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
