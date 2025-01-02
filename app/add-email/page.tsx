'use client'
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CheckCode = () => {
  const [email, setEmail] = useState('')
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const router = useRouter()
  const handleEmailLogin = async () => {
    if (!email || !email.trim() || isEmailLoading) return
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return
    if (isEmailLoading) return
    setIsEmailLoading(true)
    setTimeout(() => {
      setIsEmailLoading(false)
      router.push(`/check-code?email=${email}`)
    }, 2000)
  }
  const btnDisabled = !email || !email.trim() || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
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
        <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
          <div className='text-[30px] font-[600] leading-[45px] md:w-[444px] md:mt-[80px] mt-[30px] text-black/90 poppins'>
            Add your email
          </div>
          <div className="md:w-[444px] md:mt-[40px] mt-[24px]">
            <div className='md:text-[16px] text-[14px] font-[400] md:leading-[24px] leading-[20px] myLabel poppins'>Email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" className='w-full h-[48px] p-[14px_16px] login_input md:mt-[8px] mt-[4px] poppins' />
            <div className={`w-full mt-[40px] login_submit_button poppins ${btnDisabled ? 'disabled' : ''}`} onClick={handleEmailLogin}>
              {isEmailLoading ? <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-white animate-spin"></div> : "Send code"}
            </div>
            <div className="h-[40px] md:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default CheckCode