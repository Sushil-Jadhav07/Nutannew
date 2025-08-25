import Widgets from '@/layouts/footer/widget/';
import Copyright from '@/layouts/footer/copyright';
import {footerSettings} from '@/data/footer-settings';
import React from "react";
import cn from "classnames";
import WidgetSubscription from '../footer/widget/widget-newsletter';
const {widgets, payment} = footerSettings;

interface FooterProps {
    variant?: string;
    className?: string;
    showWidgetServices?: boolean;
}

const Footer: React.FC<FooterProps> = ({variant = 'default',className,showWidgetServices = false}) => {
    return (
        <footer className={cn(
            'footer-one  dark:bg-[#282828]',
            className
        )}
        >
            <WidgetSubscription
                className={cn('newsletterFooter')}
            />
            <Widgets widgets={widgets} variant={variant}  showWidgetServices={showWidgetServices}/>
            <Copyright payment={payment} variant={variant} />
        </footer>
    );
};

export default Footer;
