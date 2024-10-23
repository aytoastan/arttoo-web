'use client';
import { Axa, Dietl, Gurrjohns, Momart } from '@/assets/images';
import FadeInUpwardAnimation from '@/components/FadeInUpwardAnimation';
import Image from 'next/image';

const aboutList = [
  {
    img: <Image src={Gurrjohns} alt='Gurrjohns' className=' w-[160px]' />,
    title: 'Expert Authentication',
    description:
      'We collaborates with renowned appraisers from GurrJohns (or other established appraisal firms) to meticulously verify artwork authenticity, condition, and provenance, with its proof of appraisal embedded directly within each token',
  },
  {
    img: <Image src={Axa} alt='Axa' className=' w-[40px]' />,
    title: 'Comprehensive Insurance',
    description:
      'We partner with a leading art insurance company to provide tailored coverage against theft, damage, and loss during transportation, storage, and loans.',
  },
  {
    img: (
      <div className='flex gap-8'>
        <Image src={Momart} alt='Momart' className='w-[40px]' />
        <Image src={Dietl} alt='Dietl' className='w-[40px]' />
      </div>
    ),
    title: 'Secure Transportation and Storage',
    description:
      'We partner with trusted companies like Momart and DIETL International, to ensure secure transportation of the artwork from your location to our state-of-the-art storage facility equipped with advanced security systems and climate control to guarantee its preservation.',
  },
];

const About = () => {
  return (
    <section
      id='about-section'
      className='max-w-screen-2xl w-[90vw] sm:w-[85vw] mx-auto flex flex-col lg:mb-8 justify-center gap-8 lg:gap-16'
    >
      <FadeInUpwardAnimation>
        <h2 className='text-[42px] sm:text-[60px] lg:text-[70px] xl:text-[100px] text-balance leading-[52px] sm:leading-[70px] lg:leading-[88px]  xl:leading-[131px] max-w-[800px] mb-8'>
          Your investments are <span className='italic font-medium'>secured</span> with us
        </h2>
      </FadeInUpwardAnimation>

      <div className='grid grid-cols-1 lg:grid-cols-3 justify-between gap-8 lg:gap-16'>
        {aboutList.map((item, index) => {
          return (
            <FadeInUpwardAnimation key={index} delay={(index + 1) * 0.1}>
              <div id='about-content' className='flex flex-col gap-8'>
                {item.img}
                <div className='flex flex-col gap-1'>
                  <h3 className='text-[20px] md:text-[24px] font-semibold leading-[31.44px]'>{item.title}</h3>
                  <p className='text-[16px] md:text-[20px] leading-[20.4px] md:leading-[26.2px] text-black/60'>
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeInUpwardAnimation>
          );
        })}
      </div>
    </section>
  );
};

export default About;
