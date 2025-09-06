import type { FC } from 'react';
import Text from '@/components/shared/text';
import StarIcon from '@/components/icons/star-icon';
import { Timestamp } from 'firebase/firestore';

interface ReviewProps {
  item: {
    id?: string;
    rating: number;
    description: string;
    author: string;
    createdAt?: Timestamp | Date;
  };
  className?: string;
}

const ReviewCard: FC<ReviewProps> = ({ item, className = '' }) => {
  // Format date for display
  const formatDate = (date?: Timestamp | Date) => {
    if (!date) return '';
    
    let jsDate: Date;
    if (date instanceof Timestamp) {
      jsDate = date.toDate();
    } else {
      jsDate = date;
    }
    
    return jsDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      className={`border-b border-border-base last:border-0 pb-6 mb-6 last:mb-0 ${className}`}
    >
      <div className="flex -mx-0.5 mb-3.5">
        {[...Array(5)].map((_, idx) => (
          <StarIcon
            key={idx}
            color={idx < item.rating ? '#F3B81F' : '#DFE6ED'}
            className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
          />
        ))}
      </div>
      <Text className="xl:leading-[2em]">{item.description}</Text>
      <div className="pt-2 text-sm text-brand-dark text-opacity-80 flex items-center justify-between">
        <div>
          By
          <span className="inline-block ltr:ml-[3px] rtl:mr-[3px] font-semibold">
            {item.author}
          </span>
        </div>
        {item.createdAt && (
          <span className="text-xs text-gray-500">
            {formatDate(item.createdAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
