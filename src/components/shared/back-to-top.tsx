
import { IoIosArrowUp } from 'react-icons/io';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const BackToTopButton: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleScrollListener = debounce(() => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalScrollHeight = document.body.scrollHeight;

        if (
            currentScrollY <= 100 ||
            currentScrollY >= totalScrollHeight - windowHeight - 20
        ) {
            setIsShow(false);
            return;
        }

      setIsShow(true);
      
      // Calculate scroll progress for arrow fill
      const progress = Math.min(currentScrollY / (totalScrollHeight - windowHeight), 1);
      setScrollProgress(progress);
    }, 100);

    window.addEventListener('scroll', handleScrollListener);

    return () => {
      window.removeEventListener('scroll', handleScrollListener);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      onClick={handleClick} 
      className={`fixed bottom-40 end-5 z-[100] flex content-center items-center cursor-pointer rounded w-10 h-10  bg-white overflow-hidden transition ease-in-out duration-200 ${!isShow && 'opacity-0 translate-y-7'}`}
    >
      {/* Progress fill background */}
      <div 
        className="absolute inset-0 bg-[#3B3310] transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateY(${100 - (scrollProgress * 100)}%)` 
        }}
      />
      
      {/* Arrow icon */}
      <IoIosArrowUp 
        className={`text-xl lg:text-2xl m-auto relative z-10 transition-colors duration-300 ${
          scrollProgress > 0.5 ? 'text-white' : 'text-[#3B3310]'
        }`} 
      />
    </div>
  )
}

export default BackToTopButton;
