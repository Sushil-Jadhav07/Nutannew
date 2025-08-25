// Custom hook to replace Next.js useParams
import {useLocation} from "react-router-dom";

const useCustomParams = () => {
  const location = useLocation();
  
  // Extract the slug from pathname
  // Assuming URLs have a pattern like '/product/product-slug'
  const getSlugFromPath = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    return segments.length > 1 ? segments[segments.length - 1] : '';
  };
  
  return {
    slug: getSlugFromPath(location.pathname)
  };
};
export default useCustomParams;
