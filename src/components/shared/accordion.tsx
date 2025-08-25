
import cn from 'classnames';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import { FiPlus,FiMinus } from "react-icons/fi";
type CollapseProps = {
  item: any;
  variant?: 'underline' | 'transparent';
};

export const Accordion: React.FC<CollapseProps> = ({
  item,
  variant = 'underline',
}) => {
  const {  title, content } = item;
  const { selectedColor } = usePanel();
  

  return (
    <div className="w-full">
      <div className="w-full mx-auto  group ">
        <Disclosure as="div">
          {({ open }) => (
            <>
              <DisclosureButton className={cn("border-b-1 border-border-base  flex justify-between w-full py-4 text-base text-left  text-brand-dark focus:outline-none ",colorMap[selectedColor].hoverLink)}>
                <span
                  className={cn(
                    'text-sm font-medium leading-relaxed text-heading ltr:pr-2 rtl:pl-2',
                    {
                      'md:text-base ': variant === 'underline',
                      'md:text-base lg:text-lg': variant === 'transparent',
                    },
                    { [colorMap[selectedColor].link as string]: open}
                  )}
                >
                  {title}
                </span>
                {open ? <FiMinus className={`text-lg ${colorMap[selectedColor].link}`} /> : <FiPlus className={"text-lg"}/>}
              
              </DisclosureButton>
              
                {open && (
                  <DisclosurePanel transition>
                    <div className="py-3   leading-7 ">
                      {content}
                    </div>
                  </DisclosurePanel>
                )}
              
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;
