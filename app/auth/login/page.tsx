'use client'
import { useState } from "react";
import Link from 'next/link';

// const clientId = "YOUR_CLIENT_ID";
export default function Home() {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    console.log('login')
  }
  return <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
    <div className='text-[30px] font-[600] leading-[45px] md:w-[444px] md:mt-[80px] mt-[40px] myLabel'>
      Login
    </div>
    <div className="md:w-[444px] mt-[40px]">
      <div className='text-[16px] font-[400] leading-[24px] myLabel'>Email</div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" className='w-full h-[48px] p-[14px_16px] login_input mt-[8px]' />
      <div className='text-[16px] font-[400] leading-[24px] mt-[16px] myLabel'>Password</div>
      <div className={`h-[48px] mt-[8px] flex relative password_input_box overflow-hidden ${isPasswordFocused ? 'password_input_box_focused' : ''}`}>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Enter your Password"
          className='w-full h-full password_input pl-[16px] flex-1' />
        <div
          onClick={() => setIsShowPassword(!isShowPassword)}
          className="cursor-pointer px-[16px] h-full flex items-center justify-center">
          {!isShowPassword ? <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z" p-id="5417" fill="#5b5b5b"></path><path d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" p-id="5418" fill="#5b5b5b"></path></svg> :
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M955.733333 492.8c-6.4-12.8-162.133333-317.866667-443.733333-317.866667-23.466667 0-46.933333 2.133333-70.4 6.4-17.066667 4.266667-29.866667 19.2-25.6 36.266667 4.266667 17.066667 19.2 29.866667 36.266667 25.6 19.2-4.266667 38.4-4.266667 57.6-4.266667 209.066667 0 345.6 209.066667 379.733333 266.666667-10.666667 19.2-32 53.333333-64 91.733333-10.666667 12.8-8.533333 34.133333 4.266667 44.8 6.4 4.266667 12.8 6.4 21.333333 6.4s19.2-4.266667 25.6-10.666666c51.2-61.866667 78.933333-115.2 78.933333-117.333334 6.4-8.533333 6.4-19.2 0-27.733333zM215.466667 125.866667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l91.733333 91.733333C138.666667 354.133333 72.533333 484.266667 68.266667 490.666667c-4.266667 8.533333-4.266667 19.2 0 29.866666 6.4 12.8 162.133333 315.733333 443.733333 315.733334 83.2 0 164.266667-27.733333 241.066667-81.066667l96 96c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8L215.466667 125.866667z m243.2 334.933333l104.533333 104.533333c-12.8 12.8-32 21.333333-51.2 21.333334-40.533333 0-74.666667-34.133333-74.666667-74.666667 0-19.2 8.533333-38.4 21.333334-51.2zM512 772.266667c-209.066667 0-345.6-209.066667-379.733333-266.666667 21.333333-36.266667 81.066667-130.133333 174.933333-196.266667l104.533333 104.533334c-25.6 25.6-38.4 59.733333-38.4 96 0 76.8 61.866667 138.666667 138.666667 138.666666 36.266667 0 70.4-14.933333 96-38.4l98.133333 98.133334c-61.866667 42.666667-128 64-194.133333 64z" fill="#5b5b5b" p-id="7343"></path></svg>}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Link href="/auth/forgetPassword" className="text-[14px] font-[500] leading-[20px] mt-[16px] text-[#3D3D3D]">Forget Password?</Link>
      </div>
      <div className="w-full mt-[40px] login_submit_button" onClick={handleLogin}>
        Log in
      </div>
      <div className="w-full flex justify-center mt-[24px] text-[14px] font-[400] leading-[20px] text-[#6B6B6B]">
        Don’t have an account?  <Link href="/auth/register" className="font-[500] ml-[4px] myLabel">Register Now</Link>
      </div>
      <div className="w-full flex mt-[48px] mb-[40px] items-center">
        <div className="flex-1 h-[1px] bg-black-0-1"></div>
        <div className="text-[14px] font-[400] leading-[20px] text-black-0-6 px-[16px]">Or continue with</div>
        <div className="flex-1 h-[1px] bg-black-0-1"></div>
      </div>
      <Link href="/auth/invitation" className="w-full social_login_button">
        <svg className="mr-[8px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.1716 8.368H17.5003V8.33341H10.0003V11.6667H14.7099C14.0228 13.6072 12.1766 15.0001 10.0003 15.0001C7.23908 15.0001 5.00033 12.7613 5.00033 10.0001C5.00033 7.23883 7.23908 5.00008 10.0003 5.00008C11.2749 5.00008 12.4345 5.48091 13.3174 6.26633L15.6745 3.90925C14.1862 2.52216 12.1953 1.66675 10.0003 1.66675C5.39824 1.66675 1.66699 5.398 1.66699 10.0001C1.66699 14.6022 5.39824 18.3334 10.0003 18.3334C14.6024 18.3334 18.3337 14.6022 18.3337 10.0001C18.3337 9.44133 18.2762 8.89591 18.1716 8.368Z" fill="#FFC107" />
          <path d="M2.62781 6.12125L5.36572 8.12917C6.10656 6.29501 7.90072 5.00001 10.0003 5.00001C11.2749 5.00001 12.4345 5.48084 13.3174 6.26625L15.6745 3.90917C14.1861 2.52209 12.1953 1.66667 10.0003 1.66667C6.79947 1.66667 4.02364 3.47376 2.62781 6.12125Z" fill="#FF3D00" />
          <path d="M9.9998 18.3334C12.1523 18.3334 14.1081 17.5096 15.5869 16.17L13.0077 13.9875C12.1429 14.6452 11.0862 15.0009 9.9998 15C7.8323 15 5.99189 13.618 5.29855 11.6892L2.58105 13.783C3.96022 16.4817 6.76105 18.3334 9.9998 18.3334Z" fill="#4CAF50" />
          <path d="M18.1712 8.36791H17.5V8.33333H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.9879L13.0079 13.9871L15.5871 16.1696C15.4046 16.3354 18.3333 14.1667 18.3333 9.99999C18.3333 9.44124 18.2758 8.89583 18.1712 8.36791Z" fill="#1976D2" />
        </svg>
        Google
      </Link>
      <Link href="/auth/invitation" className="w-full social_login_button mt-[8px]">
        <img src={'/mdi_facebook.png'} alt="sui" className='w-[20px] h-[20px] mr-[8px]' />
        Sui Wallet
      </Link>
      <div className="h-[40px] md:hidden"></div>
    </div>
  </div>
}

