import Container from '@/components/shared/container';
import Image from '@/components/shared/image';
import Link from '@/components/shared/link';
import {MainMenuType} from "@/services/types";
import {usePanel} from "@/contexts/usePanel";
import {colorMap} from "@/data/color-settings";
import cn from "classnames";

const SubDemo = ({item}: any) => {
    const {
        mega_categoryCol,
    } = item ?? {};

    return (
        <div className="subMega drop-shadow-dropDown bg-white  z-30 absolute start-0 opacity-0 group-hover:opacity-100">
            <Container className={"lg:max-w-[1230px]"}>
                <div className={` pt-8 py-10`}>
                    <ul
                        className={`text-body text-sm grid grid-cols-${mega_categoryCol} gap-10 `}
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
            </Container>

        </div>
    );
};

const ListMenu = ({ data}: any) => {
    const {selectedColor} = usePanel();
    return (
        <li className="p-1.5 bg-white rounded-md overflow-hidden text-center drop-shadow-thumb border border-transparent hover:border-brand-dark transition-all duration-300 ">
            {data?.image && (
                <Link to={`${data.path}`} className={`group `}>
                    <Image
                        src={data?.image?.thumbnail ?? '/assets/placeholder/collection.svg'}
                        alt={data.label || ('text-category-thumbnail')}
                        width={180}
                        height={200}
                        className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform "
                    />
                    <span className={cn("block font-semibold text-brand-dark py-3 ",colorMap[selectedColor].hoverLink)}>{data.label}</span>
                </Link>
            )}


        </li>
    );
};

export default SubDemo;
