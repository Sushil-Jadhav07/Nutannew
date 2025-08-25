import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@/components/shared/container';
import {footerSettings} from '@/data/footer-settings';
import React from 'react';


import ServiceFeature from "@/components/common/service-featured";
import ServicesHome6 from "@/components/common/services-home6";

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
        <Container>
            {showWidgetServices  && (
                <>
                    {(() => {
                        switch (variant) {
                            case 'home6':
                                return   <ServicesHome6 variant={variant} className={'mb-0'} uniqueKey="services" />
                            default:
                                return   <ServiceFeature variant={variant} className={'mb-0'} uniqueKey="services" />
                        }
                    })()}
                </>
            
            )}
           
            <div
                className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-[50px] pt-10 md:pt-16">
                <WidgetAbout
                    social={social}
                    className="col-span-full sm:col-span-1 md:col-span-4"
                    variant={variant}
                />
                {widgets?.slice(0, 4)?.map((widget) => (
                    <WidgetLink
                        key={`footer-widget--key${widget.id}`}
                        data={widget}
                        className="col-span-1 md:col-span-2"
                        variant={variant}
                    />
                ))}

            </div>
        </Container>
    );
};

export default Widgets;
