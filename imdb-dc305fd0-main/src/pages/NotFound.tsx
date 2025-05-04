
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <h1 className="font-heading font-bold text-6xl md:text-8xl bg-gradient-to-r from-pink to-lightpurple bg-clip-text text-transparent mb-4">
        404
      </h1>
      <p className="text-xl md:text-2xl text-white mb-8">
        The page you're looking for doesn't exist
      </p>
      <Link to="/">
        <Button className="bg-pink hover:bg-pink/80 px-6 py-2">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
