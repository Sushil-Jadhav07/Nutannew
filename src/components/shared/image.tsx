import cn from "classnames";

interface Props {
    variant?: string;
    className?: string;
    width?: number;
    height?: number;
    src: string;
    alt: string;
  }

  
const Image : React.FC<Props>  = ({
    className,
    variant,
    width ,
    height = 100,
    src,
    alt,
  }) => {
    return (
        <div className={cn('relative overflow-hidden ')}>
            <div className={cn("block w-full box-sizing")}>
                <svg
                    className="block max-w-full h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    version="1.1"
                />
            </div>
            <img
                src={src}
                 alt={alt}
                 width={0}
                 height={0}
                 sizes="100vw"
                 className={cn('absolute top-0 left-0 right-0 bottom-0 max-w-full max-h-full min-w-full object-cover',
                     {'rounded-md': variant === 'rounded',},
                     className
                 )}
            />
        </div>
    );
}
export default Image;
