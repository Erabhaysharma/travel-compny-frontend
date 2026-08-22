import { Link } from "react-router-dom";
import "./Footer.css";

const LEGAL_LINKS = [
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Intellectual Property Rights", to: "/intellectual-property" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 8h2V4h-2a4 4 0 0 0-4 4v3H9v4h2v7h4v-7h2.5l.5-4H15V8.5c0-.3.2-.5.5-.5Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="6" width="19" height="12" rx="4" />
        <path d="M10.5 9.5 15 12l-4.5 2.5Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4l16 16M20 4 4 20" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* 1. About the company */}
        <div className="footer__section">
          <span className="footer__logo">A4 Travel &amp; Tours</span>
          <p className="footer__about">
            Discover beautiful destinations, comfortable journeys, and unforgettable
            experiences across India. From private adventures to group journeys, we
            plan every trip with care.
          </p>
        </div>

        {/* 2. Legal / IP info */}
        <div className="footer__section">
          <h4 className="footer__heading">Legal</h4>
          <ul className="footer__links">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Social links only */}
        <div className="footer__section">
          <h4 className="footer__heading">Follow Us</h4>
          <div className="footer__socials">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-icon"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} A4 Travel &amp; Tours. All rights reserved.</p>
      </div>
    </footer>
  );
}