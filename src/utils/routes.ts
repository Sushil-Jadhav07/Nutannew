
type RouteType = string; // Simplified, or use Route if available

export const ROUTES : Record<string, RouteType> = {
  HOME: '/',
  HOME2: '/home2',
  HOME3: '/home3',
  HOME4: '/home4',
  HOME5: '/home5',
  HOME6: '/home6',
  HOME7: '/home7',
  HOME8: '/home8',
  HOME9: '/home9',
  HOME10: '/home10',
  
  PRODUCTS: '/products',
  PRODUCT: `/products`,
  PRODUCT_SLUG: `/products/:slug`,
  CATEGORIES : '/categories',
  CATEGORY: '/category',
  CATEGORY_HORI: '/category/category-hori',
  CATEGORY_CANVAS: '/category/category-canvas',
  CATEGORY_SLUG: '/category/:slug',
  CATEGORY_SUB_SLUG: '/category/:slug/:subslug',
  
  CHECKOUT: '/checkout',
  CART : '/cart',
  CONTACT: '/contact-us',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  FAQ: '/faq',
  ABOUT: '/about-us',
  RETURN: '/return-policy',
  FORGET_PASSWORD: '/forget-password',
  CHANGE_PASSWORD: '/change-password',
  ACCOUNT: '/account',
  ACCOUNT_BILLING: '/account-billing',
  SAVELISTS: '/account-savelists',
  LOGIN: '/login',
  REGISTER: '/register',
  
  COMPARE: '/compare',
  ORDERS: '/account-order' ,
  ORDER: '/checkout/order-confirmation',
  
  BLOG: `/blog`,
  BLOGBIG: `/blog/blog-category-big`,
  BLOGGRID: `/blog/blog-category-grid`,
  BLOGLIST: `/blog/blog-category-list`,
  BLOGPOST: `/blog/:slug`,
  BLOGPOSTLEFT: `/blog/blog-post-left`,
  BLOGPOSTRIGHT: `/blog/blog-post-right`,
  
  SEARCH: `/search`,
  ERROR_403: "/error/403",
};

export const API_BE =
    "https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app";

export const USER_ROLE = {
  ADMIN: "admin",
  MEMBER: "member",
  OPERATOR: "operator",
  MANAGER: "manager",
};
