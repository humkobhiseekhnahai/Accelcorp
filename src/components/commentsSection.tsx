import React, { useRef } from 'react';

interface CommentSectionProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: () => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ onChange, onClick }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleClick = () => {
        onClick();
        if (textareaRef.current) {
            textareaRef.current.value = ''; 
        }
    };

    return (
            <div className="w-full h-full mb-4">
                <div className="h-3/6 w-11/12 bg-white m-2">
                    <textarea
                        ref={textareaRef}
                        onChange={onChange}
                        className="w-full h-full p-4 text-sm text-black bg-gray-100 focus:ring-0 placeholder-gray-400"
                        placeholder="Share your insights and experiences related to market trends..."
                        required
                    />
                </div>
                <div className="flex items-center justify-between py-2 border-t ml-2 w-11/12">
                    <button
                        type="button"
                        onClick={handleClick}
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    >
                        Post comment
                    </button>
                </div>
            </div>
    );
};
