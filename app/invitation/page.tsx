'use client'
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Invitation = () => {
  const [code, setCode] = useState('')
  const [isCodeLoading, setIsCodeLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const router = useRouter()
  const handleCodeLogin = async () => {
    if (!code || !code.trim() || isCodeLoading) return
    if (isCodeLoading) return
    setIsCodeLoading(true)
    setTimeout(() => {
      setIsCodeLoading(false)
      setErrorMsg('Invalid invitation code. Please verify you have entered the correct code.')
    }, 2000)
  }
  const handleSkip = () => {
    router.push('/trade')
  }
  const btnDisabled = !code || !code.trim()
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
            Got an invitation?
          </div>
          <div className="md:w-[444px] md:mt-[40px] mt-[24px]">
            <div className='text-[16px] font-[400] leading-[24px] myLabel poppins flex items-center'>
              Invitation Code
              <svg className="ml-[4px] cursor-pointer select-none" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setShowInfo(!showInfo)}>
                <path d="M7 7H8V11.5M8 11.5H6.5M8 11.5H9.5M8 4.75H8.005V4.755H8V4.75ZM8.25 4.75C8.25 4.88807 8.13808 5 8 5C7.86193 5 7.75 4.88807 7.75 4.75C7.75 4.61193 7.86193 4.5 8 4.5C8.13808 4.5 8.25 4.61193 8.25 4.75ZM14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8Z" stroke="black" strokeOpacity="0.5" />
              </svg>
            </div>
            <input value={code} onChange={(e) => {
              setCode(e.target.value)
              setErrorMsg('')
            }}
              placeholder="Enter your Invitation Code"
              className={`w-full h-[48px] p-[14px_16px] mt-[8px] poppins ${errorMsg ? 'login_inputError' : 'login_input'}`}
            />
            {errorMsg && <div className="text-[16px] font-[400] leading-[24px] text-[#FF0000]/90 poppins mt-[4px]">{errorMsg}</div>}
            <div className="text-[16px] font-[400] leading-[24px] text-black/50 poppins mt-[4px]">Don’t worry if you don’t have a code right now, you could add an invitation code later.</div>
            <div className={`w-full mt-[40px] login_submit_button poppins ${btnDisabled ? 'disabled' : ''}`} onClick={handleCodeLogin}>
              {isCodeLoading ? <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-white animate-spin"></div> : "Submit"}
            </div>
            <div className={`w-full login_submit_button2 poppins`} onClick={handleSkip}>
              Skip
            </div>
            <div className="h-[40px] md:hidden"></div>
          </div>
        </div>
      </div>
    </div>
    {
      showInfo && <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
        <div className="w-[400px] bg-white rounded-[16px] p-[32px]">
          <div className="text-[24px] font-[600] leading-[36px] text-black poppins">Invitation Code</div>
          <div className="text-[16px] font-[400] leading-[24px] text-black/50 poppins mt-[4px]">
            {`As part of Arttoo's strategic rollout plan, invitation codes are initially distributed in Arttoo’s socials and to key ecosystem partners, and community leaders in the Sui ecosystem.
            Invitation code grants users exclusive access to the whitelisted Initial Art Offering (IAO) phase, allowing them to purchase artwork tokens at a fixed price before public sale.`}
          </div>
          {/* close */}
          <div className="cursor-pointer hover:bg-black/80 w-full h-[50px] rounded-[8px] bg-black/90 flex items-center justify-center mt-[24px] text-[18px] font-[500] leading-[27px] text-white poppins" onClick={() => setShowInfo(false)}>
            Close
          </div>
        </div>
      </div>
    }
  </div>
}

export default Invitation