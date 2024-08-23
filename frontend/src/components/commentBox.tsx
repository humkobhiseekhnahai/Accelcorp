import React from 'react';

interface CommentBoxProps {
    id: number;
    time: Date;
    message: string;
}


export const CommentBox: React.FC<CommentBoxProps> = ({ id, time, message }) => {
    return (
        <div className="flex items-start gap-2.5 my-1 p-2 bg-gradient-to-r from-gray-100 via-white via-95%">
            <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-black">Farmer {id}</span>
                    <span className="text-sm font-normal text-black">{time.toLocaleString()}</span>
                </div>
                <p className="text-sm font-normal py-2 text-black">{message}</p>
            </div>
        </div>
    );
};
