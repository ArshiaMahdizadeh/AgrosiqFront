import Link from "next/link";
import { Plane as Plant, Mail, Phone, MapPin, Youtube, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Plant className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary dark:text-primary-100">
                Agrosiq
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Smart and Reliable Agricultural Exports. Leveraging technology for better agricultural exports and traceability.
            </p>
            <div className="flex gap-4">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/product-registration" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors">
                  Register Product
                </Link>
              </li>
              <li>
                <Link href="/verify-authenticity" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors">
                  Verify Authenticity
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary-300 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-500" />
                <span>123 Agro Street, Farmville, CA 94107</span>
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-500" />
                <a href="mailto:info@agrosiq.com" className="hover:text-primary dark:hover:text-primary-300 transition-colors">info@agrosiq.com</a>
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-500" />
                <a href="tel:+1234567890" className="hover:text-primary dark:hover:text-primary-300 transition-colors">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>

          {/* Install App */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Install Our App
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Get real-time updates and manage your agricultural exports on the go.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="flex items-center justify-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.0425 0H6.95619C6.4271 0 6 0.4271 6 0.95619V23.0438C6 23.5729 6.4271 24 6.95619 24H17.0425C17.5716 24 17.9987 23.5729 17.9987 23.0438V0.95619C17.9987 0.4271 17.5716 0 17.0425 0Z" fill="#E0E0E0"/>
                  <path d="M11.9987 22.4C12.5518 22.4 13 21.9518 13 21.3987C13 20.8457 12.5518 20.3975 11.9987 20.3975C11.4457 20.3975 10.9975 20.8457 10.9975 21.3987C10.9975 21.9518 11.4457 22.4 11.9987 22.4Z" fill="#999999"/>
                  <path d="M11.2494 1.59985H12.7494C12.8622 1.59985 12.9543 1.50778 12.9543 1.39492C12.9543 1.28207 12.8622 1.19 12.7494 1.19H11.2494C11.1365 1.19 11.0444 1.28207 11.0444 1.39492C11.0444 1.50778 11.1365 1.59985 11.2494 1.59985Z" fill="#999999"/>
                  <rect x="6.79883" y="2.40039" width="10.4" height="18.0667" fill="#2196F3"/>
                </svg>
                <span>Download for Android</span>
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.7143 24H5.28571C4.02335 24 3 22.9767 3 21.7143V2.28571C3 1.02335 4.02335 0 5.28571 0H18.7143C19.9767 0 21 1.02335 21 2.28571V21.7143C21 22.9767 19.9767 24 18.7143 24Z" fill="#E0E0E0"/>
                  <rect x="4.28516" y="2.57031" width="15.4286" height="18.8571" rx="0.857143" fill="#F5F5F5"/>
                  <path d="M12.0001 22.2857C12.7103 22.2857 13.2858 21.7102 13.2858 21C13.2858 20.2898 12.7103 19.7143 12.0001 19.7143C11.29 19.7143 10.7144 20.2898 10.7144 21C10.7144 21.7102 11.29 22.2857 12.0001 22.2857Z" fill="#999999"/>
                  <path d="M12.0001 1.71436C12.1577 1.71436 12.2858 1.58627 12.2858 1.42864C12.2858 1.27102 12.1577 1.14293 12.0001 1.14293C11.8425 1.14293 11.7144 1.27102 11.7144 1.42864C11.7144 1.58627 11.8425 1.71436 12.0001 1.71436Z" fill="#999999"/>
                  <path d="M16.707 10.7369C16.2609 9.9979 15.5588 9.4858 14.7607 9.2952L14.5685 9.2489C14.0345 9.1096 13.468 9.0407 12.8992 9.0407H11.1007C10.5319 9.0407 9.96541 9.1096 9.43145 9.2489L9.23923 9.2952C8.44116 9.4858 7.73908 9.9979 7.29297 10.7369C6.90216 11.3904 6.85704 12.1787 7.17194 12.8725L7.56759 13.7482C7.96463 14.6215 8.70901 15.289 9.61357 15.6108L9.90521 15.7139C10.4574 15.9026 11.0309 16 11.6129 16H12.387C12.969 16 13.5426 15.9026 14.0947 15.7139L14.3864 15.6108C15.291 15.289 16.0353 14.6215 16.4324 13.7482L16.828 12.8725C17.1429 12.1787 17.0978 11.3904 16.707 10.7369Z" fill="#222222"/>
                </svg>
                <span>Download for iOS</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Agrosiq. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}