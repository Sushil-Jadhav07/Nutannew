import ListMenu from '@/components/shared/mega/mega-menu';
import Container from '@/components/shared/container';
import Image from '@/components/shared/image';
import { productPlaceholder } from '@/assets/placeholders';
import Link from '@/components/shared/link';
import {MainMenuType} from "@/services/types";
import { usePanel } from "@/contexts/usePanel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

const SubMega = ({ item }: any) => {
  const {
    mega_categoryCol,
    mega_bannerMode,
    mega_bannerImg: image,
    mega_bannerUrl,
    // mega_contentBottom,
  } = item ?? {};
  const { selectedColor } = usePanel();
  let isBannerMode = false;
  if (mega_bannerMode == 'left' || mega_bannerMode == 'right') isBannerMode = true;

  return (
    <div className="subMega drop-shadow-dropDown bg-white  z-30 absolute start-0 opacity-0 group-hover:opacity-100">
      <Container className={'mx-auto'}>
        <div className={`flex flex-row gap-5 pt-8 py-5`}>
          <div
            className={`cateArea ${isBannerMode ? 'basis-3/4' : 'basis-full'} `}
          >
            <ul
              className={`text-body text-sm grid grid-cols-${mega_categoryCol} gap-4 `}
            >
              {item.subMenu.map((menu: MainMenuType, index: number) => {
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
          {isBannerMode && (
            <div
              className={`imageArea basis-1/4 ${
                mega_bannerMode == 'left' && 'order-first'
              }`}
            >
              <Link to={mega_bannerUrl} className="text-brand-dark ">
                <div className="card-img-container max-w-[350px]">
                  <Image
                    src={image ?? productPlaceholder}
                    alt={'Product Image'}
                    width={450}
                    height={300}
                    className="object-cover bg-skin-thumbnail"
                  />
                </div>
              </Link>
            </div>
          )}
        </div>
      </Container>
      {/* {mega_contentBottom.trim().length != 0 && (
        <div className={cn("navPages-contentbottom bg-brand",colorMap[selectedColor].bg)}>
          <Container>
            <div
              className={`text-brand-light text-sm text-center py-4`}
              dangerouslySetInnerHTML={{ __html: mega_contentBottom }}
            />
          </Container>
        </div>
      )} */}
    </div>
  );
};

export default SubMega;
