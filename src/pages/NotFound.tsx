
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container-custom pt-24 pb-12 flex items-center justify-center min-h-[70vh]">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-bright-orange-100 rounded-full">
              <FileX className="h-12 w-12 text-bright-orange-500" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 text-gray-900">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/">
              <Button size="lg" className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white">
                Return to Home
              </Button>
            </Link>
            <Link to="/documents">
              <Button size="lg" variant="outline" className="border-bright-orange-300 text-bright-orange-600 hover:bg-bright-orange-50">
                Browse Documents
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
