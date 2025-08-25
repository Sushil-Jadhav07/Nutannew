import {useModalAction, useModalState} from '@/components/common/modal/modalContext';
import CloseButton from '@/components/shared/close-button';


const ProductVideo = () => {
    const {closeModal} = useModalAction();
    const {data:videoUrl} = useModalState();
    
    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string): string => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : ""
    }
    
    const videoId = getYouTubeVideoId(videoUrl)
    
    return (
        <div className="md:w-[600px] lg:w-[940px] mx-auto p-1  lg:p-3 bg-white rounded-md">
            <CloseButton onClick={closeModal}/>
            <div className="text-center mb-4 pt-9">
                {videoId ? (
                    <iframe
                        className="w-full h-[300px]  lg:h-[500px]"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                        <p className="text-gray-500">Invalid YouTube URL</p>
                    </div>
                )}
            </div>
        
        
        </div>
    );
};

export default ProductVideo;
