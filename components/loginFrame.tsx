import Header from "./Header";

interface LoginFrameProps {
  children: React.ReactNode;
}
export const LoginFrame = ({ children }: LoginFrameProps) => {
  return <div className='w-full h-svh bg-white mainPage flex flex-col'>
    <Header />
    <div className='flex flex-1'>
      <div className='hidden md:block flex-1 h-full'>
        <video
          playsInline={true}
          muted={true}
          loop={true}
          autoPlay={true}
          id='video2'
          poster='/sec_2II.png'
          className='h-full object-cover'
        >
          <source src='/section2-highres.webm' type="video/webm; codecs='vp8, vorbis'" />
          <source src='/section2-highres.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='flex-1 md:h-full'>
        {children}
      </div>
    </div>
  </div>;
}
