import type { FC } from 'react';

import ReviewCard from '@/components/cards/review-card';
import ReviewForm from "@/components/product/productDetails/review-form";

const data = [
  {
    id: 1,
    rating: 4,
    title: ' Aenean at consectetur felis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero neque, sed sodales nulla facilisis quis. Praesent convallis eget dolor in pellentesque. Etiam in tincidunt metus',
    author: 'Luhan Nguyen',
  },
  {
    id: 2,
    rating: 5,
    title: 'Donec porttitor aliquam lobortis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero neque, sed sodales nulla facilisis quis. Praesent convallis eget dolor in pellentesque. Etiam in tincidunt metus',
    author: 'Luhan Nguyen',
  },
  {
    id: 3,
    rating: 3,
    title: 'Pellentesque accumsan',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero neque, sed sodales nulla facilisis quis. Praesent convallis eget dolor in pellentesque. Etiam in tincidunt metus',
    author: 'Luhan Nguyen',
  },
];

const ProductReview: FC = () => {
  return (
    <div className="lg:flex">
      <div className="pt-2 basis-1/2">
        {data?.map((item) => (
          <ReviewCard item={item} key={`review-key-${item.id}`} />
        ))}
      </div>
      <ReviewForm
        className="basis-1/2 lg:ps-10  xl:ps-14  3xl:ps-20  shrink-0 pt-10"
      />
    </div>
  );
};

export default ProductReview;
