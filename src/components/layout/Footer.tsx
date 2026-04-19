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
    { path: '#', label: 'Careers' },
  ],
  legal: [
    { path: '#', label: 'Privacy' },
    { path: '#', label: 'Terms' },
  ],
};

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-semibold text-text-primary">CineAssets</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary">
              Discover and download high-quality movie assets including posters, backdrops, logos, and wallpapers.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-text-secondary hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-text-secondary hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-text-secondary hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} CineAssets. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Powered by TMDb API
          </p>
        </div>
      </div>
    </footer>
  );
};