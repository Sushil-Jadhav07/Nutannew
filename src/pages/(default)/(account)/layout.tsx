import Container from '@/components/shared/container';
import AccountNav from '@/components/account/account-nav';
import {ROUTES} from '@/utils/routes';

import AccountNavMobile from '@/components/account/account-nav-mobile';
import Layout from "@/pages/(default)/layout";
import React from "react";

const accountMenu = [
    {
        slug: ROUTES.ACCOUNT,
        name: 'Account info',
    },
    {
        slug: ROUTES.ORDERS,
        name: 'My Order',
    },
    {
        slug: ROUTES.SAVELISTS ,
        name: 'Wishlist',
    },
    // {
    //     slug: ROUTES.ACCOUNT_BILLING,
    //     name: 'Change Billing',
    // },
    
    // {
    //     slug: ROUTES.CHANGE_PASSWORD,
    //     name: 'Change password',
    // },
];

export default  function AccountLayout({ children }: React.PropsWithChildren) {
    return (
        <>
        <Layout>
            <Container>
                <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 mx-auto">
                    <div className="flex flex-col w-full rounded bg-white p-4 sm:p-5 lg:p-8">
                        <div className="lg:hidden">
                            <AccountNavMobile options={accountMenu}/>
                        </div>
                        <div className="hidden lg:block flex-shrink-0 ">
                            <AccountNav options={accountMenu}/>
                        </div>

                        <div
                            className="w-full  mt-4 md:mt-8 ">
                            {children}
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
        </>
    );
}
