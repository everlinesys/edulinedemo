import { Link } from "react-router-dom";
import { useBranding } from "../../shared/hooks/useBranding";

export default function PublicFooter() {
  const brand = useBranding();

  return (
    <footer
      className="text-gray-100"
      style={{ backgroundColor: brand.primaryColor }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-white text-lg font-bold mb-4">
            {brand.siteName}
          </h3>
          <p className="text-sm text-gray-200">
            {brand.tagline}
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/courses" className="hover:text-white" style={{ color: brand.colors.accent }}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white" style={{ color: brand.colors.accent }}>
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white" style={{ color: brand.colors.accent }}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="hover:text-white" style={{ color: brand.colors.accent }}>
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-white" style={{ color: brand.colors.accent }}>
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h4 className="text-white font-semibold mb-4" >
            Start Learning Today
          </h4>

          <Link
            to="/register"
            className="inline-block px-5 py-2 rounded-lg text-sm font-medium transition"
            style={{
              backgroundColor: brand.colors.accent,
              color: brand.colors.primary,
            }}
          >
            Create Account
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="text-center py-4 text-sm"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        © {new Date().getFullYear()} Everline Systems. All rights reserved.
      </div>
    </footer>
  );
}
