import Link from '@/components/shared/link';
import {BsChevronDown} from 'react-icons/bs';
import ListMenu from '@/components/shared/list-menu';
import SubMega from '@/components/shared/mega/sub-mega';
import cn from 'classnames';
import {MainMenuType, SubMenuType} from "@/services/types";
import React from "react";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import SubDemo from "@/components/shared/mega/sub-demo";

interface MenuProps {
  navigations: MainMenuType[];
  className?: string;
  classLink?: string;
  bgPrimary?: boolean;
}

const MainMenu: React.FC<MenuProps> = ({  navigations, className, bgPrimary,classLink }) => {
  const { selectedColor } = usePanel();
  
  return (
    <nav className={cn('headerMenu flex', className)}>
      {navigations?.map((item: MainMenuType) => (
        <div
          className={`menuItem group py-3 mx-2 xl:mx-3 2xl:mx-4 flex-shrink-0 ${
            item.type == 'mega' || item.type == 'demo' ? '' : 'relative'
          }`}
          key={item.id}

        >
          <Link
            to={item.path}
            className={cn('text-brand-dark inline-flex items-center text-xs xl:text-sm py-1 font-semibold relative whitespace-nowrap',
                classLink,
                {
                  [`${colorMap[selectedColor].groupHoverLink} ${colorMap[selectedColor].headerMenuBefore}`]: !bgPrimary, // ✅ Fixed!
                },
            )}

          >
            {item.label}

            {( item?.subMenu) && (
              <span
                className={`text-xs w-4 flex justify-end  opacity-80 `}
              >
                <BsChevronDown className="transition duration-300 ease-in-out transform" />
              </span>
            )}
          </Link>

          {item?.subMenu && Array.isArray(item?.subMenu) && (
            <>
              {(() => {
                switch (item?.type) {
                  case 'mega':
                    return <SubMega item={item} />
                  case 'demo':
                    return <SubDemo item={item} />
                  default:
                    return (
                        <div className="absolute z-30 opacity-0 subMenu drop-shadow-dropDown transition-all duration-300 invisible bg-white left-0  w-[220px] xl:w-[240px] group-hover:opacity-100">
                          <ul className="py-5 text-sm text-brand-muted">
                            {item.subMenu.map((menu: SubMenuType, index: number) => {
                              const dept: number = 1;
                              const menuName: string = `sidebar-menu-${dept}-${index}`;

                              return (
                                  <ListMenu
                                      dept={dept}
                                      data={menu}
                                      hasSubMenu={menu.subMenu}
                                      menuName={menuName}
                                      key={menuName}
                                      menuIndex={index}
                                  />
                              );
                            })}
                          </ul>
                        </div>
                    );
                }
              })()}

            </>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MainMenu;
