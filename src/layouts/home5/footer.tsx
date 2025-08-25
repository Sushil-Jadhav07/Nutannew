import Widgets from '@/layouts/footer/widget/widget5';
import Copyright from '@/layouts/footer/copyright';
import {footerSettings} from '@/data/footer-settings';
import React from "react";
import cn from "classnames";

const {widgets, payment} = footerSettings;

interface FooterProps {
    variant?: string;
    className?: string;
    showWidgetServices?: boolean;
}

const Footer: React.FC<FooterProps> = ({variant = 'default',className,showWidgetServices = false}) => {
    return (
        <footer className={cn(
            'footer-one border-t  border-border-base',{
                '': variant === 'default',
                'bg-background': variant === 'home3',
                'bg-[#1f2024]': variant === 'home5',
            },
            className
        )}
        >
            <Widgets widgets={widgets} variant={variant}  showWidgetServices={showWidgetServices}/>
            <Copyright payment={payment} variant={variant} />
        </footer>
    );
};

export default Footer;
