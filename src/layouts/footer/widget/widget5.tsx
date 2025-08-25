import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@/components/shared/container';
import {footerSettings} from '@/data/footer-settings';
import React from 'react';

import ServiceFeature from "@/components/common/service-featured";
import WidgetSubscription from "@/layouts/footer/widget/widget-subscription";
import cn from "classnames";

interface WidgetsProps {
    variant?: string;
    showWidgetServices?: boolean;
    widgets: {
        id: number;
        widgetTitle: string;
        lists?: {
            id: number ;
            path: string;
            title: string;
        }[]; // Fix: lists is an optional array
    }[];
}


const Widgets: React.FC<WidgetsProps> = ({
         widgets,
         showWidgetServices,
         variant = 'default',
     }) => {
    const {social} = footerSettings;
    return (
        <>
            {showWidgetServices  && (
                <div className={"border-b border-white/10 dark:border-black/10"}>
                    <Container className="2xl:max-w-[1730px]">
                            <ServiceFeature  variant={variant} className={'mb-0'} />
                    </Container>
                </div>

            )}

            <Container className={cn(
                {'2xl:max-w-[1730px]': variant === 'home5',}
            )}>
                <div
                    className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-14 pt-10 md:pt-14">
                    <WidgetAbout
                        social={social}
                        className="col-span-full sm:col-span-1 md:col-span-4"
                        variant={variant}
                    />
                    {widgets?.slice(0, 2)?.map((widget) => (
                        <WidgetLink
                            key={`footer-widget--key${widget.id}`}
                            data={widget}
                            className="col-span-1 md:col-span-2"
                            variant={variant}
                        />
                    ))}
                    <WidgetSubscription  variant={variant}  className={"col-span-full md:col-span-4"} />

                </div>
            </Container>
        </>

    );
};

export default Widgets;
