
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-black/50 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-heading font-bold text-2xl bg-gradient-to-r from-pink to-lightpurple bg-clip-text text-transparent">
              MovieMuse
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-pink transition-colors">
              Home
            </Link>
            <Link to="/movies" className="text-white hover:text-pink transition-colors">
              Movies
            </Link>
            <div className="group relative">
              <button className="text-white hover:text-pink transition-colors">
                Categories
              </button>
              <div className="absolute left-0 top-full mt-2 w-52 bg-card rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-border">
                <div className="p-2">
                  {categories.map(cat => (
                    <Link
                      key={cat.cat_code}
                      to={`/category/${cat.cat_code}`}
                      className="block px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: cat.cat_color }}
                      ></span>
                      {cat.cat_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="search"
                placeholder="Search movies..."
                className="w-64 bg-muted border-none focus:ring-1 focus:ring-pink"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card mt-2 py-4">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="mb-4">
              <Input
                type="search"
                placeholder="Search movies..."
                className="w-full bg-muted border-none focus:ring-1 focus:ring-pink"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="w-full mt-2 bg-pink hover:bg-pink/80 text-white"
              >
                Search
              </Button>
            </form>
            <div className="flex flex-col space-y-3">
              <Link 
                to="/"
                className="text-white hover:text-pink px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/movies"
                className="text-white hover:text-pink px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <div className="border-t border-muted pt-2 mt-2">
                <p className="text-muted-foreground text-sm mb-2">Categories</p>
                {categories.map(cat => (
                  <Link
                    key={cat.cat_code}
                    to={`/category/${cat.cat_code}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors"
                  >
                    <span 
                      className="inline-block w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: cat.cat_color }}
                    ></span>
                    {cat.cat_name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
