import React, { Fragment } from "react";
import {Route, Routes} from 'react-router-dom';
import {ROUTES, USER_ROLE} from "@/utils/routes";

// layout
import HomeLayout from "@/layouts/home/layout";
import Home2Layout from "@/layouts/home2/layout";
import Home3Layout from "@/layouts/home3/layout";
import Home4Layout from "@/layouts/home4/layout";
import Home5Layout from "@/layouts/home5/layout";

import Home6Layout from "@/layouts/home6/layout";
import Home7Layout from "@/layouts/home7/layout";
import Home8Layout from "@/layouts/home8/layout";

import DefaultLayout from "@/layouts/default/layout";
import AccountLayout from "@/pages/(default)/(account)/layout";

// routes
import AuthRoute from "@/routes/auth-route";
import GuestRoute from "@/routes/guest-route";
import RoleRoute from "@/routes/role-route";
import NotFound from "@/pages/not-found";

// Home pages
const Homepage = React.lazy(() => import("@/pages/home/page"));
const Home2page = React.lazy(() => import("@/pages/home2/page"));
const Home3page = React.lazy(() => import("@/pages/home3/page"));
const Home4page = React.lazy(() => import("@/pages/home4/page"));
const Home5page = React.lazy(() => import("@/pages/home5/page"));
const Home6page = React.lazy(() => import("@/pages/home6/page"));
const Home7page = React.lazy(() => import("@/pages/home7/page"));
const Home8page = React.lazy(() => import("@/pages/home8/page"));


//Cart and Checkout
const Cartpage = React.lazy(() => import("@/pages/(default)/cart/page"));
const Checkoutpage = React.lazy(() => import("@/pages/(default)/checkout/page"));
const Confirmationpage = React.lazy(() => import("@/pages/(default)/checkout/order-confirmation/page"));

// Blog pages
const Blogpage = React.lazy(() => import("@/pages/(default)/blog/page"));
const Bloggrid = React.lazy(() => import("@/pages/(default)/blog/blog-category-grid/page"));
const Bloglist = React.lazy(() => import("@/pages/(default)/blog/blog-category-list/page"));
const Blogbig = React.lazy(() => import("@/pages/(default)/blog/blog-category-big/page"));
const SinglePost = React.lazy(() => import("@/pages/(default)/blog/[slug]/page"));
const SinglePostLeft = React.lazy(() => import("@/pages/(default)/blog/blog-post-left/page"));
const SinglePostRight = React.lazy(() => import("@/pages/(default)/blog/blog-post-right/page"));

//Bonus Page
const Contactpage = React.lazy(() => import("@/pages/(default)/contact-us/page"));
const Faqpage = React.lazy(() => import("@/pages/(default)/faq/page"));
const Privacypage = React.lazy(() => import("@/pages/(default)/privacy/page"));
const Termspage = React.lazy(() => import("@/pages/(default)/terms/page"));
const Searchpage = React.lazy(() => import("@/pages/(default)/search/page"));
const Comparepage = React.lazy(() => import("@/pages/(default)/compare/page"));

//Categories and Product
const Categoriespage = React.lazy(() => import("@/pages/(default)/categories/page"));
const Categorypage = React.lazy(() => import("@/pages/(default)/category/page"));

const CategoryHoripage = React.lazy(() => import("@/pages/(default)/category/category-hori/page"));
const CategoryCanvaspage = React.lazy(() => import("@/pages/(default)/category/category-canvas/page"));
const CategorySlug = React.lazy(() => import("@/pages/(default)/category/[slug]/page"));
const Productpage = React.lazy(() => import("@/pages/(default)/products/page"));
const ProductSlug = React.lazy(() => import("@/pages/(default)/products/[slug]/page"));

//My Account
const Accountpage = React.lazy(() => import("@/pages/(default)/(account)/account/page"));
const Orderpage = React.lazy(() => import("@/pages/(default)/(account)/account-order/page"));
const Savelistpage = React.lazy(() => import("@/pages/(default)/(account)/account-savelists/page"));
const Billingpage = React.lazy(() => import("@/pages/(default)/(account)/account-billing/page"));
const ChangePassword = React.lazy(() => import("@/pages/(default)/(account)/change-password/page"));

//Author
const Loginpage = React.lazy(() => import("@/pages/(default)/login/page"));
const Registerpage = React.lazy(() => import("@/pages/(default)/register/page"));


const routesConfig = [
    {
        path: ROUTES.HOME,
        component: Homepage,
        layout: HomeLayout,
        roles: [USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.OPERATOR],
    },{
        path: ROUTES.HOME2,
        component: Home2page,
        layout: Home2Layout,
    },{
        path: ROUTES.HOME3,
        component: Home3page,
        layout: Home3Layout,
    },{
        path: ROUTES.HOME4,
        component: Home4page,
        layout: Home4Layout,
    },{
        path: ROUTES.HOME5,
        component: Home5page,
        layout: Home5Layout,
    },{
        path: ROUTES.HOME6,
        component: Home6page,
        layout: Home6Layout,
    },{
        path: ROUTES.HOME7,
        component: Home7page,
        layout: Home7Layout,
    },{
        path: ROUTES.HOME8,
        component: Home8page,
        layout: Home8Layout,
    },
    {
        path: ROUTES.CONTACT,
        component: Contactpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.ACCOUNT,
        component: Accountpage,
        layout: AccountLayout,
        guard: AuthRoute,
    },
    {
        path: ROUTES.ORDERS,
        component: Orderpage,
        layout: AccountLayout,
        guard: AuthRoute,
    },
    {
        path: ROUTES.SAVELISTS,
        component: Savelistpage,
        layout: AccountLayout,
        guard: AuthRoute,
    },
    {
        path: ROUTES.ACCOUNT_BILLING,
        component: Billingpage,
        layout: AccountLayout,
        guard: AuthRoute,
    },
    {
        path: ROUTES.CHANGE_PASSWORD,
        component: ChangePassword,
        layout: AccountLayout,
        guard: AuthRoute,
    },
    {
        path: ROUTES.REGISTER,
        component: Registerpage,
        layout: DefaultLayout,
        guard: GuestRoute,
    },
    {
        path: ROUTES.LOGIN,
        component: Loginpage,
        layout: DefaultLayout,
        guard: GuestRoute,
    },
    {
        path: ROUTES.FAQ,
        component: Faqpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.TERMS,
        component: Termspage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.PRIVACY,
        component: Privacypage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.SEARCH,
        component: Searchpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.COMPARE,
        component: Comparepage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.PRODUCTS,
        component: Productpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.PRODUCT_SLUG,
        component: ProductSlug,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.CATEGORIES,
        component: Categoriespage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.CATEGORY,
        component: Categorypage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.CATEGORY_HORI,
        component: CategoryHoripage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.CATEGORY_CANVAS,
        component: CategoryCanvaspage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.CATEGORY_SLUG,
        component: CategorySlug,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.CART,
        component: Cartpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.CHECKOUT,
        component: Checkoutpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.ORDER,
        component: Confirmationpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.BLOG,
        component: Blogpage,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.BLOGGRID,
        component: Bloggrid,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.BLOGLIST,
        component: Bloglist,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.BLOGBIG,
        component: Blogbig,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.BLOGPOST,
        component: SinglePost,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.BLOGPOSTLEFT,
        component: SinglePostLeft,
        layout: DefaultLayout,
    },
    {
        path: ROUTES.BLOGPOSTRIGHT,
        component: SinglePostRight,
        layout: DefaultLayout,
    },
    //   {
    //     path: ROUTES.ERROR_403,
    //     component: Error403,
    //     layout: Template1,
    //     guard: AuthRoute,
    //   },
];

function renderRoutes() {
    return (
        <Routes>
            {routesConfig.map((route, index) => {
                const Component: React.FC<React.PropsWithChildren> = route.component || Fragment;
                // @ts-ignore
                const Layout: React.FC<React.PropsWithChildren> = route.layout || Fragment;
                const Authenticate: React.FC<React.PropsWithChildren> = route.guard || Fragment;
                const roles = route.roles;
                
                return (
                    <Route
                        key={`routes-${index}`}
                        path={route.path}
                        element={
                            <Authenticate>
                                <Layout>
                                    <RoleRoute roles={roles}>
                                        <Component/>
                                    </RoleRoute>
                                </Layout>
                            </Authenticate>
                        }
                    />
                );
            })}
            <Route path="*" element=<NotFound/> />
        </Routes>
    );
}

export const RoutesMain = () => {
    return renderRoutes();
};
