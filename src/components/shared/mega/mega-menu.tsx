
import Link from '@/components/shared/link';
import Image from '@/components/shared/image';

const ListMenu = ({ dept, data, hasSubMenu, menuIndex }: any) => {
  return (
    <li className="relative">
      {data?.image && (
        <Link to={data.path} className={`block pb-2`}>
          <Image
            src={data?.image?.thumbnail ?? '/assets/placeholder/collection.svg'}
            alt={data.label || ('text-category-thumbnail')}
            width={255}
            height={160}
            className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform "
          />
        </Link>
      )}

      <Link
        to={data.path}
        className={` flex items-center justify-between py-2   ${
          data.subMenu ? 'font-semibold text-brand-dark' : ' text-brand-muted hover:ps-3'
        }`}
      >
        {data.label}
      </Link>
      {hasSubMenu && (
        <SubMenu
          dept={dept}
          data={data.subMenu}
          menuIndex={menuIndex}
        />
      )}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex }) => {
  dept = dept + 1;
  return (
    <ul className="subMenuChild  w-full">
      {data?.map((menu: any, index: number) => {
        const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
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
  );
};

export default ListMenu;
