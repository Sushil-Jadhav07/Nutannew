import Image from '@/components/shared/image';
import Text from '@/components/shared/text';
import {collectionPlaceholder} from '@/assets/placeholders';
import StarIcon from "@/components/icons/star-icon";

interface Props {
    imgWidth?: number ;
    imgHeight?: number ;
    collection: {
        image: string;
        author_name: string;
        author_position: string;
        description?: string;
    };
}

const TestimonialCard: React.FC<Props> = ({
                                              collection,
                                              imgWidth = 80,
                                              imgHeight = 80,
                                          }) => {
    const {image, author_name, author_position, description} = collection;
    return (
        <div className={"border border-border-base rounded-lg p-4 lg:p-8 text-brand-dark"}>
            <div className="testimonial-image w-[60px] relative mb-1">
                <Image
                    src={image ?? collectionPlaceholder}
                    alt={author_name || ('card-thumbnail')}
                    width={imgWidth}
                    height={imgHeight}
                    className="bg-skin-thumbnail object-cover transform transition duration-300 ease-in-out rounded-full "
                />
            </div>
            <div className="pb-4">
                <p className="mb-2 text-sm font-bold">
                    {author_name}
                </p>
                <div className="flex space-x-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, idx) => (
                            <StarIcon
                                key={idx}
                                color={idx < 5 ? '#F3B81F' : '#DFE6ED'}
                                className="w-3 h-3 mx-px"
                            />
                        ))}
                    </div>
                    <span className="text-sm "> {author_position}</span>
                </div>
            </div>
            
            <div className="testimonial-text  font-medium">
                <Text variant="small">{description}</Text>
            </div>
        
        </div>
    );
};

export default TestimonialCard;
