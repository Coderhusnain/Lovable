
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram  } from "lucide-react";
import { memo } from "react";

// Memoized footer link component
const FooterLink = memo(({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-rocket-gray-200 hover:text-white transition-colors">
    {children}
  </Link>
));

FooterLink.displayName = 'FooterLink';

// Memoized contact item component
const ContactItem = memo(({ 
  icon: Icon, 
  children 
}: { 
  icon: React.ElementType; 
  children: React.ReactNode;
}) => (
  <li className="flex items-center gap-2">
    <Icon size={18} />
    {children}
  </li>
));

ContactItem.displayName = 'ContactItem';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-rocket-blue-500 text-white dark:bg-rocket-blue-900 transition-colors duration-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Legalgram</span>
            </div>
            <p className="text-rocket-gray-200">
              Legalgram provides quality legal services and documents at affordable prices for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/documents">
                  Create Documents
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/pricing">
                  Pricing Plans
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">
                  Contact Us
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/terms">
                  Terms of Service
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/privacy">
                  Privacy Policy
                </FooterLink>
              </li>
              <li>
                <FooterLink to="/disclaimer">
                  Legal Disclaimer
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Contact</h5>
            <ul className="space-y-2">
              <ContactItem icon={Mail}>
                <a href="mailto:info@legalgram.com" className="text-rocket-gray-200  transition-all duration-200 transform hover:scale-105">
                  info@legalgram.com
                </a>
              </ContactItem>
              <li>
                <div className="flex items-center space-x-4 mt-3">
                  
                  <a
          href="https://www.tiktok.com/@legal.gram?lang=en-GB"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-6 h-6 fill-current"
          >
            <path d="M240 81.3c-22.1 0-40-17.9-40-40h-40v138.7c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40v-40c-44.2 0-80 35.8-80 80s35.8 80 80 80 80-35.8 80-80V94.6c11.8 8.3 26.1 12.8 40 12.7v-26z"/>
          </svg>
        </a>
                   <a
          href="https://www.instagram.com/legalgram.co?igsh=Y3kzMHN1djE4dzQ2&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 transition"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
          >
            <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 
            0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 
            3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 
            1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 
            2a3 3 0 110 6 3 3 0 010-6zm4.5-.75a1.25 1.25 0 11-.001 
            2.501A1.25 1.25 0 0116.5 8.25z"/>
          </svg>
        </a>
                 
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-rocket-blue-400 dark:border-rocket-blue-800 text-center text-rocket-gray-200">
          <p>&copy; 2020 Legalgram. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
