'use client'
import { useRef, useState } from "react"
import Link from 'next/link';


export default function Register() {
  const [email, setEmail] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isPasswordFocused2, setIsPasswordFocused2] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [codes, setCodes] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<HTMLInputElement[]>([])
  const handleSendEmail = () => {
    console.log('send email')
    setStep(2)
  }
  const handleConfirm = () => {
    // setStep(3)
  }
  const handleResendCode = () => { }
  const renderStep = () => {
    if (step === 1) {
      return <div className='md:w-[444px] w-full'>
        <div className='text-[30px] font-[600] leading-[45px] w-full md:mt-[80px] mt-[40px] myLabel'>
          Register
        </div>
        <div className="w-full mt-[40px]">
          <div className='text-[16px] font-[400] leading-[24px] myLabel'>Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" className='w-full h-[48px] p-[14px_16px] login_input mt-[8px]' />
          <div className='text-[16px] font-[400] leading-[24px] mt-[16px] myLabel'>Password</div>
          <div className={`h-[48px] mt-[8px] flex relative password_input_box overflow-hidden ${isPasswordFocused ? 'password_input_box_focused' : ''}`}>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          <div className='text-[16px] font-[400] leading-[24px] mt-[16px] myLabel'>Confirm Password</div>
          <div className={`h-[48px] mt-[8px] flex relative password_input_box overflow-hidden ${isPasswordFocused2 ? 'password_input_box_focused' : ''}`}>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused2(true)}
              onBlur={() => setIsPasswordFocused2(false)}
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
          <div className='text-[16px] font-[400] leading-[24px] myLabel mt-[16px]'>Invitation Code (Optional)</div>
          <input value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} placeholder="Enter your Invitation Code" className='w-full h-[48px] p-[14px_16px] login_input mt-[8px]' />
          <div className="text-[14px] font-[400] leading-[21px] text-black-0-6 mt-[4px]">Invitations have been shared in community channels of Arttoo and our partners. Please refer to our social media platforms for further details. </div>
          <div className="w-full mt-[40px] login_submit_button" onClick={handleSendEmail}>
            Sign Up
          </div>
          <div className="w-full flex justify-center mt-[24px] text-[14px] font-[400] leading-[20px] text-[#6B6B6B]">
            Already have an account? <Link href="/auth/login" className="font-[500] ml-[4px] myLabel">Log In</Link>
          </div>
        </div>
      </div>
    }
    else if (step === 2) {
      return <div className='md:w-[444px] w-full'>
        <div className='text-[30px] font-[600] leading-[45px] w-full md:mt-[80px] mt-[40px] myLabel'>
          Verify Email
        </div>
        <div className="w-full text-[16px] font-[400] leading-[24px] text-left mt-[5px] text-[#6B6B6B]">
          A 6-digit code has been sent to your registering email. Please enter it within the next 30 minutes.
        </div>
        {/* 使用 6 个 input 框来接收验证码 ，每一个 input 框的宽度为 60px 高度 68 ,有边框，只能输入一个数字 */}
        <div className="w-full flex mt-[30px] justify-between">
          {
            Array.from({ length: 6 }).map((_, index) => (
              <input
                ref={(el) => {
                  inputRefs.current[index] = el as HTMLInputElement
                }}
                value={codes[index]}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace') {
                    // 如果当前位置为 “”，则返回上一个输入框
                    if (codes[index] === '') {
                      if (index > 0) {
                        inputRefs.current[index - 1].focus()
                      }
                    }
                  }
                }}
                onChange={(e) => {
                  console.log(e.target.value, e.target.value === '')
                  if (e.target.value === '') {
                    codes[index] = ''
                    setCodes([...codes])
                    return
                  }
                  if (e.target.value) {
                    // 当前如果已经有值，则不进行处理
                    if (codes[index]) {
                      return
                    }
                    // 如果不是数字，则不进行处理
                    if (!/^\d*$/.test(e.target.value)) {
                      return
                    }
                    // 添加，则 code 增加
                    if (e.target.value) {
                      codes[index] = e.target.value
                      setCodes([...codes])
                      // 如果还有下一个输入框，则跳转下一个输入框
                      if (index < 5) {
                        inputRefs.current[index + 1].focus()
                      }
                      else {
                        // 如果已经是最后一个输入框，则提交
                        inputRefs.current[index].blur()
                        // handleConfirm()
                      }
                    }
                  }

                }}
                key={index}
                type="text"
                className="md:w-[60px] md:h-[68px] w-[48px] h-[48px] text-center text-[24px] font-[400] leading-[32px] text-[#121212] codeInput"
              />
            ))
          }
        </div>
        <div className="w-full flex justify-end">
          <div className="text-[14px] font-[500] leading-[20px] mt-[16px] cursor-pointer myLabel" onClick={handleResendCode}>Resend Code</div>
        </div>
        <div className="w-full mt-[40px]">
          <div className="w-full login_submit_button" onClick={handleConfirm}>
            Confirm
          </div>
        </div>
      </div>
    }
  }
  return <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
    {
      renderStep()
    }
    <div className="h-[40px] md:hidden"></div>
  </div>
}