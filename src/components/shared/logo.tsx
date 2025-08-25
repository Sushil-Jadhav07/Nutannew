
import { Link } from 'react-router-dom'; // Use this for routing
import cn from 'classnames';

import { siteSettings } from '@/data/site-settings';
import React from "react";
import SiteLogo from "@/components/icons/logo";
import { usePanel } from '@/contexts/usePanel';
// import {colorMap} from "@/data/color-settings";

interface Props {
  variant?: "white"|"dark";
  className?: string;
  href?: string;
}

const Logo: React.FC<Props> = ({
                                 className,
                                 variant,
                                 href = siteSettings.logo.href,
                                 ...props
                               }) => {
  const { theme } = usePanel();
  return (
      <Link
          to={href}
          className={cn('inline-flex focus:outline-none ', className, )}
          {...props}
      >
        {variant === "dark" || theme && theme === "dark" ? (
            <SiteLogo variant={"dark"} />
        )  : (
            <SiteLogo />
        )}
      </Link>
  );
};

export default Logo;
