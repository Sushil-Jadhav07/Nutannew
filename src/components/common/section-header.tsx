
import cn from 'classnames';
import Heading from '@/components/shared/heading';
import Text from '@/components/shared/text';

interface Props {
  sectionHeading?: string;
  sectionSubHeading?: string;
  className?: string;
  headingPosition?: string;
}

const SectionHeader: React.FC<Props> = ({
            sectionHeading = 'text-section-title',
            sectionSubHeading,
            className = 'mb-5 xl:mb-8',
            headingPosition = 'left',
                                        }) => {
    return (
        <div
            className={cn(` ${className}`, {
                'text-[16px]':headingPosition === 'hotdeal',
                'text-center':headingPosition === 'center' || headingPosition === 'center-xl',
            })}
        >
            <Heading
                variant="mediumHeading"
                className={cn({
                    ' text-red-600': headingPosition === 'hotdeal',
                    'text-[24px] sm:mb-1.5 ': headingPosition === 'center',
                    'text-[24px] xl:text-[30px] xl:mb-2 ': headingPosition === 'center-xl',
                })}
            >
                <div dangerouslySetInnerHTML={{
                    __html: sectionHeading,
                }}>
                
                </div>
            </Heading>
            {sectionSubHeading && (
                <Text variant="small"  className={cn({
                    'xl:text-15px': headingPosition === 'center-xl',
                })}>
                    {sectionSubHeading}
                </Text>
            )}
        </div>
    );
};

export default SectionHeader;
