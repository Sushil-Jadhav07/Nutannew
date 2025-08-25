import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { usePanel } from '@/contexts/usePanel';
import { colorMap } from '@/data/color-settings';
import cn from 'classnames';

interface TimerRendererProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}

interface ProductCountdownTimerProps {
    date: string | number | Date;
    variant?: string;
}

const ProductCountdownTimer: React.FC<ProductCountdownTimerProps> = ({ date,variant ="default" }) => {
    const { selectedColor } = usePanel();
    
    const TimerRenderer = ({ days, hours, minutes, seconds, completed }: TimerRendererProps) => {
        if (completed) return null;
        
        const times = [days, hours, minutes, seconds];
        
        return (
            <div className={cn("flex items-center  font-semibold gap-2",
                {
                    "text-base xl:text-lg" : variant==="default",
                    "text-[14px] " : variant==="heading",
                }
                )}>
                {times.map((time, idx) => (
                    <React.Fragment key={idx}>
                    <span
                        className={cn(
                            'flex items-center justify-center   rounded p-1',
                            colorMap[selectedColor]?.bg || 'bg-brand-dark',
                            {
                                " bg-red-600 text-brand-light min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px]" : variant==="default",
                                [`text-brand-light ${colorMap[selectedColor]?.bg} min-w-[40px] md:min-w-[45px] min-h-[30px] md:min-h-[30px]`] : variant==="heading",
                            }
                        )}
                    >
                        {zeroPad(time)}
                    </span>
                    {variant==="default" && idx < times.length - 1 && ':'}
                    </React.Fragment>
                ))}
            </div>
        );
    };
    
    return <Countdown date={date} intervalDelay={1000} renderer={TimerRenderer} />;
};

export default ProductCountdownTimer;