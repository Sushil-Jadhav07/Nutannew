
import Link from '@/components/shared/link';
import useWindowSize from '@/utils/use-window-size';
import cn from 'classnames';

interface BannerProps {
    banner: any;
    variant?: 'rounded' | 'default' | 'rounded-xl';
    effectActive?: boolean;
    className?: string;
    classNameInner?: string;
}

function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 850 ? imgObj.mobile : imgObj.desktop;
}

const BannerCard: React.FC<BannerProps> = ({
                                               banner,
                                               className,
                                               variant = 'default',
                                               effectActive = true,
                                               classNameInner,
                                           }) => {
    const {width} = useWindowSize();
    const {slug, title, image} = banner;
    const selectedImage = getImage(width!, image);
    return (
        <div className={cn('mx-auto', className)}>
            <Link
                to={slug}
                className={cn(
                    'h-full w-full group flex justify-center relative overflow-hidden block',
                    classNameInner
                )}
            >
                <div className="relative inline-block overflow-hidden w-full box-sizing">
                    <div className="block w-full box-sizing">
                        <svg className="block max-w-full h-auto" xmlns="http://www.w3.org/2000/svg" width={selectedImage.width} height={selectedImage.height} version="1.1"/>
                    </div>
                    <img
                        src={selectedImage.url}
                        alt={title}
                        width={0}
                        height={0}
                        className={cn('absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full min-h-full object-cover object-left-top', {
                            'rounded-md': variant === 'rounded',
                            'rounded-xl': variant === 'rounded-xl',
                        })}
                       
                    />
                </div>
                {effectActive && (
                    <div
                        className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white dark:to-black opacity-30 group-hover:animate-banner"/>
                )}
            </Link>
        </div>
    );
};

export default BannerCard;
