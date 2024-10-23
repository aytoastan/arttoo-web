import React from 'react';

const Steps = [
  {
    title: 'Explore',
    poster: '/sec_I.png',
    video: 'sequence_01.mp4',
    videoWebm: 'sequence_01.webm',
    progress: { min: 0, max: 0.33 },
    description:
      "Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's.",
  },
  {
    title: 'Invest',
    poster: '/sec_II.png',
    video: 'sequence_02.mp4',
    videoWebm: 'sequence_02.webm',
    progress: { min: 0.33, max: 0.66 },
    description:
      'Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.',
  },
  {
    title: 'Earn',
    poster: '/sec_lII.png',
    video: 'sequence_03.mp4',
    videoWebm: 'sequence_03.webm',
    progress: { min: 0.66, max: 1 },
    description:
      'Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more.',
  },
];

const Learn: React.FC = () => {
  return (
    <section className='w-[90vw] sm:w-[85vw] mx-auto relative z-10 -mt-[80px] md:pb-10 lg:pb-20'>
      {Steps.map((step, index) => (
        <div key={index} className={`flex flex-col lg:flex-row w-full`}>
          <div
            className={`flex align-middle justify-center w-full lg:w-1/2 ${
              index % 2 === 0 ? 'lg:order-first' : 'lg:order-last'
            }`}
          >
            <video
              className='h-full w-full max-w-[600px] max-h-[600px] object-contain'
              autoPlay
              playsInline
              muted
              loop
              preload='auto'
            >
              <source src={step.videoWebm} type="video/webm; codecs='vp8, vorbis'" />
              <source src={step.video} type='video/mp4' />
              <p>Your browser does not support the HTML5 Video element.</p>
            </video>
          </div>
          <div
            className={`w-full lg:w-1/2 p-8 flex items-center justify-center order-first ${
              index % 2 === 0 ? 'lg:order-last' : 'lg:order-first'
            }`}
          >
            <div className='flex gap-4 items-start justify-start sm:pt-8 lg:pt-16'>
              <span className='text-black/30 text-[40px] italic leading-[52.4px] lg:mt-4'>{`0${index + 1}`}</span>
              <div className='flex flex-col gap-2'>
                <h4 className='text-[50px] sm:text-[75px] md:text-[100px] text-balance leading-[65px] sm:leading-[100px] md:leading-[131px] italic font-medium'>
                  {step.title}
                </h4>
                <p className='text-[16px] leading-[20.4px] md:text-[20px] md:leading-[26.2px]'>{step.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Learn;
