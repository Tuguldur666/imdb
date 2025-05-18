
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto bg-black/30 backdrop-blur-sm py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-pink to-lightpurple bg-clip-text text-transparent">
                IMDB
              </span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12">
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/movies" className="text-muted-foreground hover:text-white transition-colors">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-muted-foreground hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} IMDB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
