
import cn from 'classnames';
import { colorMap } from '@/data/color-settings';
import { Category } from '@/services/types';
import { usePanel } from '@/contexts/usePanel';

const DesktopTabs = ({ childrenData, activeTab, onNavClick }: { childrenData: Category[]; activeTab: number; onNavClick: (id: number) => void }) => {
    const { selectedColor } = usePanel();

    return (
        <div className="ltabs-tabs-wrap flex justify-end xl:basis-[70%] overflow-x-auto">
            <ul className="flex text-sm gap-2 whitespace-nowrap">
                {childrenData.map((currentItem, idx) => (
                    <li
                        className={`ps-2 ${activeTab === currentItem.id ? 'text-skin-primary' : 'text-fill-base '}`}
                        key={`${currentItem.id || idx}`}
                    >
                        <button
                            onClick={() => onNavClick(currentItem.id)}
                            className={cn(
                                'px-4 py-2 rounded-full whitespace-nowrap',
                                activeTab === currentItem.id
                                    ? `${colorMap[selectedColor].bg} text-brand-light`
                                    : `text-gray-700 ${colorMap[selectedColor].hoverLink}`
                            )}
                        >
                            {currentItem.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DesktopTabs;
