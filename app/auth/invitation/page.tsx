'use client'
import { useState } from "react"


export default function Register() {
  const [inviteCode, setInviteCode] = useState('')
  const handleSendEmail = () => {
    console.log('send email')
  }
  return <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
    <div className='md:w-[444px] w-full'>
      <div className='text-[30px] font-[600] leading-[45px] w-full md:mt-[80px] mt-[40px] myLabel'>
        Invitation Code
      </div>
      <div className="w-full mt-[40px]">
        <div className='text-[16px] font-[400] leading-[24px] myLabel'>Invitation Code (Optional)</div>
        <input value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="Enter your Invitation Code" className='w-full h-[48px] p-[14px_16px] login_input mt-[8px]' />
        <div className="text-[14px] font-[400] leading-[21px] text-black-0-6 mt-[4px]">Invitations have been shared in community channels of Arttoo and our partners. Please refer to our social media platforms for further details. </div>
        <div className="w-full mt-[40px] login_submit_button" onClick={handleSendEmail}>
          Next
        </div>
      </div>
    </div>
    <div className="h-[40px] md:hidden"></div>
  </div>
}