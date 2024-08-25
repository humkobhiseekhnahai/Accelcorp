import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

function Hero() {
  const slides = [
   
    {
      url: 'https://mcmscache.epapr.in/post_images/website_350/post_21151454/full.jpg',
    },
    {
      url: 'https://www.nibio.no/en/news/innovative-platforms-for-knowledge-sharing-in-india/_/image/d9543a0b-4157-44c6-b589-212236f651c9:c5c55139e072f26569d791e097495564381f8161/max-1280/dscf0955_cropped.jpg?quality=60',
    },

    {
      url: 'https://plus.unsplash.com/premium_photo-1663011279090-63d0e5d9e5c7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0dGxlfGVufDB8fDB8fHww',
    },
    {
      url: 'https://assets.weforum.org/article/image/OFmrVg02eeGSvuI-_NT2D7gFKPagzGCrF-KYLcreYDU.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (<div >
   
    <div className='w-auto h-[480px]  mx-2 relative group '>
     
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500 opacity-85 flex flex-col justify-center'
      >
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
    
    
  </div>
      </div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-white/50 text-black cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={50} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-white/50 text-black cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={50} />
      </div>
    </div></div>
  );
}

export default Hero;