import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../assets/logo.png";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 2H21.99l-6.75 7.72L23 22h-6.27l-4.91-6.41L6.24 22H3.15l7.22-8.25L1 2h6.43l4.44 5.82L18.9 2zM17.8 20h1.73L6.5 3.9H4.65L17.8 20z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const socialLinks = [
  { icon: FacebookIcon, url: "https://www.facebook.com/bittybalpan" },
  { icon: XIcon, url: "https://x.com/bittybalpan" },
  { icon: YoutubeIcon, url: "https://www.youtube.com/@BittyBalpan" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                {/* Logo */}
                <div className="size-12 rounded-xl overflow-hidden bg-white p-1 shadow-md">
                  <img
                    src={logo}
                    alt="Bitty Balpan Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  <div className="font-display font-extrabold text-lg leading-none">
                    Bitty Balpan
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    Play School
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Where little dreams begin. Premium early childhood education
              across India since 2012.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl bg-white/10 hover:bg-coral hover:scale-110 transition-all duration-300 grid place-items-center"
                >
                  <Icon className="size-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/40 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/about" },
                { label: "Programs", to: "/preschool" },
                { label: "Franchise", to: "/franchise" },
                { label: "Gallery", to: "/gallery" },
                { label: "Careers", to: "/career" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/65 hover:text-coral transition text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs — hash links matching preschool.tsx section IDs */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/40 mb-5">
              Programs
            </h4>
            <ul className="space-y-3">
              {[
                {
                  label: "Baby Pre-Nursery · 1.5–2.5 yrs",
                  hash: "baby-pre-nursery",
                },
                { label: "Pre-Nursery · 2.5–3.5 yrs", hash: "pre-nursery" },
                { label: "Nursery · 3.5–4.5 yrs", hash: "nursery" },
                { label: "Preparatory · 4.5–5.5 yrs", hash: "preparatory" },
                { label: "Premium Day Care · All ages", hash: "day-care" },
              ].map((l) => (
                <li key={l.hash}>
                  <Link
                    to="/preschool"
                    hash={l.hash}
                    className="text-white/65 hover:text-coral transition text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Mail, text: "contact@bittybalpan.com" },
                { icon: Phone, text: "+91 9905011011" },
                { icon: MapPin, text: "Ranchi, Jharkhand" },
              ].map(({ icon: Icon, text }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/65"
                >
                  <Icon className="size-4 mt-0.5 text-sky shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
            <Link
              to="/admission"
              className="btn-primary mt-6 text-sm py-2.5 inline-block"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/35">
          <p>
            © {new Date().getFullYear()} Bitty Balpan Play School. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
