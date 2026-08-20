import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Services", to: "/#services" },
  { label: "Facilities", to: "/#facilities" },
  { label: "Contact Us", to: "/#contact" },
];

// How far (px) the user has to scroll before the navbar turns solid.
const SCROLL_THRESHOLD = 24;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  // Only the home page has a full-bleed hero behind the navbar -- that's
  // the only place a transparent-over-dark-scene navbar makes sense.
  // Every other page has no hero under it, so it stays solid always.
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(false);
      return;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isSolid = !isHome || isScrolled;

  return (
    <header className={`navbar ${isSolid ? "navbar--solid" : "navbar--transparent"}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          {/* Replace /public/images/logo.png with your real logo file --
              this path just needs to match wherever you save it. */}
          <img src="/images/hero-scenes/logo.png" alt="A4 Travel & Tours" className="navbar__logo-img" />
        </Link>

        <nav className={`navbar__links ${menuOpen ? "is-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className="navbar__link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`navbar__toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}