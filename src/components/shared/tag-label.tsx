import { Tag } from '@/services/types';
import cn from 'classnames';
import { ROUTES } from '@/utils/routes';

interface Props {
  data: Tag;
  className?: string;
}

const TagLabel: React.FC<Props> = ({ className, data }) => {
  const { name } = data;
  function changeTags() {
    window.location.href =ROUTES.BLOG;
  }
  return (
    <div
      className={cn(
        'text-sm rounded  block border border-border-one px-2 py-1 cursor-pointer',
        className
      )}
      role="button"
      onClick={changeTags}
    >
      {name}
    </div>
  );
};

export default TagLabel;
