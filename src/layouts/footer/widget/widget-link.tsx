import Heading from '@/components/shared/heading';
import Link from '@/components/shared/link';
import cn from 'classnames';
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";

interface Props {
  className?: string;
  variant?: string;
  data: {
      id: number;
      widgetTitle: string;
        lists?: {
          id: number | undefined;
          path: string| undefined;
          title: string| undefined;
        }[];
  };
}

const WidgetLink: React.FC<Props> = ({  className, data,variant }) => {
    const { selectedColor } = usePanel();
    const { widgetTitle, lists } = data;
    
  return (
      <div className={cn( {
              'text-fill-footer': variant === 'home5' || variant === 'home6' || variant === 'home7' || variant === 'home8',
          },
          className
      )}
      >
          <Heading variant="base" className={cn('uppercase mb-4 lg:mb-5', {
                  'text-brand-light': variant === 'home5' || variant === 'home6' || variant === 'home7' || variant === 'home8',
              })}>
              {widgetTitle}
          </Heading>
          <ul className="text-sm lg:text-14px flex flex-col space-y-1">
              {lists?.map((list) => (
                  <li
                      key={`widget-list--key${list.id}`}
                  >
                    
                      <Link
                          to={`${list.path ? list.path : ''}`}
                          className={cn("leading-7 transition-colors duration-200 block ", colorMap[selectedColor].hoverLink)}
                      >
                          {list.title}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default WidgetLink;
