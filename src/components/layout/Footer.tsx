import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Sweet Crumbs</h3>
            <p className="text-amber-200">
              Freshly baked cookies made with love and the finest ingredients.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-amber-200 hover:text-amber-100 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-200 hover:text-amber-100 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-amber-200">
              <p>123 Baker Street</p>
              <p>Sweet City, SC 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@sweetcrumbs.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-amber-800 text-center">
          <p className="text-amber-200">
            © {new Date().getFullYear()} Sweet Crumbs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;