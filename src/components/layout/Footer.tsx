import { Link } from 'react-router-dom';

const footerLinks = {
  platform: [
    { path: '/movies', label: 'Movies' },
    { path: '/explore', label: 'Explore' },
    { path: '/search', label: 'Search' },
  ],
  company: [
    { path: '#', label: 'About' },
    { path: '#', label: 'Contact' },
  ],
  legal: [
    { path: '#', label: 'Privacy' },
    { path: '#', label: 'Terms' },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-[#222] mt-auto">
      <div className="page-container py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-accent">Cine</span>
              <span className="text-xl font-bold text-text-primary">Assets</span>
            </Link>
            <p className="mt-3 text-xs sm:text-sm text-text-secondary">
              Discover and download high-quality movie assets.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xs sm:text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} CineAssets. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Powered by TMDb API
          </p>
        </div>
      </div>
    </footer>
  );
};