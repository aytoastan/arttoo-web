import { useEffect, useRef, useState } from "react"

interface AddEmailProps {
  onSuccess: () => void
  onClose: () => void
}

export const AddEmail = ({ onSuccess, onClose }: AddEmailProps) => {
  const [email, setEmail] = useState('')
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const handleEmailLogin = async () => {
    if (!email || !email.trim() || isEmailLoading) return
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return
    if (isEmailLoading) return
    setIsEmailLoading(true)
    setTimeout(() => {
      setIsEmailLoading(false)
      onSuccess()
    }, 2000)
  }
  const btnDisabled = !email || !email.trim() || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  return <div className='w-full h-svh bg-white flex flex-col fixed top-0 left-0 z-10'>
    <div className="text-[30px] font-[600] leading-[45px] text-black poppins flex items-center justify-center px-[20px] pt-[12px]">
      Tell us where to find you
      <div className="flex-1"></div>
      <div className="h-[45px] rounded-full flex items-center justify-center cursor-pointer" onClick={onClose}>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.75781 17.7431L12.0004 12.5005M12.0004 12.5005L17.243 7.25781M12.0004 12.5005L6.75781 7.25781M12.0004 12.5005L17.243 17.7431" stroke="black" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
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
}

interface CheckCodeProps {
  onClose: () => void
  onSuccess: () => void
}
export const CheckCode = ({ onClose, onSuccess }: CheckCodeProps) => {
  const [code, setCode] = useState<string[]>(Array.from({ length: 6 }, () => ''))
  const [isCodeLoading, setIsCodeLoading] = useState(false)
  const [isResendCodeLoading, setIsResendCodeLoading] = useState(false)
  const [countDown, setCountDown] = useState(-1)
  const [errorMsg, setErrorMsg] = useState('')
  const codeString = code.join('')
  const inputRefs = useRef<any[]>(Array.from({ length: 6 }, () => null))
  useEffect(() => {
    // inputRefs.current[0].focus()
    // 监听 键盘 事件
    const handleKeyDown = (e: KeyboardEvent) => {
      // 如果是 backspace 并且 当前没有值，则 向前一个 input 聚焦
      const index = inputRefs.current.findIndex(input => input === e.target)
      if (e.key === 'Backspace' && inputRefs.current[index].value === '' && index > 0) {
        inputRefs.current[index - 1].focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  // 倒计时
  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1)
      }, 1000)
    }
  }, [countDown])
  const handleCodeLogin = async () => {
    if (!codeString || !codeString.trim() || isCodeLoading) return
    if (isCodeLoading) return
    setIsCodeLoading(true)
    setTimeout(() => {
      if (codeString === '111111') {
        setIsCodeLoading(false)
        onSuccess()
      }
      else {
        setIsCodeLoading(false)
        setErrorMsg('The verification code is wrong, please re-enter')
      }
    }, 2000)
  }
  const handleResendCode = () => {
    setIsResendCodeLoading(true)
    setTimeout(() => {
      setIsResendCodeLoading(false)
      setCountDown(60)
    }, 2000)
  }
  const btnDisabled = !codeString || !codeString.trim() || codeString.length !== 6
  const renderResendCode = () => {
    if (isResendCodeLoading) {
      return <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-black animate-spin"></div>
    }
    if (countDown > 0) {
      return countDown
    }
    return 'Resend code'
  }
  return <div className='w-full h-svh bg-white flex flex-col fixed top-0 left-0 z-10'>
    <div className="text-[30px] font-[600] leading-[45px] text-black poppins flex items-center justify-center px-[20px] pt-[12px]">
      Enter the code
      <div className="flex-1"></div>
      <div className="h-[45px] rounded-full flex items-center justify-center cursor-pointer" onClick={onClose}>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.75781 17.7431L12.0004 12.5005M12.0004 12.5005L17.243 7.25781M12.0004 12.5005L6.75781 7.25781M12.0004 12.5005L17.243 17.7431" stroke="black" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
      <div className='text-[16px] font-[400] leading-[24px] md:w-[444px] mt-[4px] text-black/50 poppins'>
        A 6-digit code has been sent to your email. Please enter it within the next 30 minutes.
      </div>
      <div className="md:w-[444px] mt-[24px]">
        <div className="flex md:gap-[16px] gap-[8px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              key={index} value={code[index]} onChange={(e) => {
                const newCode = [...code]
                setErrorMsg('')
                // 如果 e.target.value 是多个字符，只取最后一个
                newCode[index] = e.target.value.slice(-1)
                setCode(newCode)
                if (newCode[index] && inputRefs.current[index + 1]) {
                  inputRefs.current[index + 1].focus()
                }
                // 最后一个则取消聚焦
                if (index === 5 && e.target.value !== '') {
                  inputRefs.current[index].blur()
                }
              }} placeholder="" className={`w-full h-[68px] text-center poppins text-black/90 text-[24px] font-[600] ${errorMsg ? 'login_inputError' : 'login_input'}`} />
          ))}
        </div>
        {errorMsg && <div className="text-[16px] font-[400] leading-[24px] text-[#FF0000]/90 poppins">{errorMsg}</div>}
        {/* resend code */}
        <div className="text-[16px] font-[400] leading-[24px] text-black/90 poppins mt-[12px] cursor-pointer select-none" onClick={handleResendCode}>
          {/* {isResendCodeLoading ? <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-black animate-spin"></div> : "Resend code"} */}
          {renderResendCode()}
        </div>
        <div className={`w-full mt-[40px] login_submit_button poppins ${btnDisabled ? 'disabled' : ''}`} onClick={handleCodeLogin}>
          {isCodeLoading ? <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-white animate-spin"></div> : "Send code"}
        </div>
        <div className="h-[40px] md:hidden"></div>
      </div>
    </div>
  </div>
}

interface InviteCodeProps {
  onClose: () => void
  onSuccess: () => void
}
export const InviteCode = ({ onClose }: InviteCodeProps) => {
  const [code, setCode] = useState('')
  const [isCodeLoading, setIsCodeLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const handleCodeLogin = async () => {
    if (!code || !code.trim() || isCodeLoading) return
    if (isCodeLoading) return
    setIsCodeLoading(true)
    setTimeout(() => {
      setIsCodeLoading(false)
      setErrorMsg('Invalid invitation code. Please verify you have entered the correct code.')
    }, 2000)
  }
  const btnDisabled = !code || !code.trim()
  return <div className='w-full h-svh bg-white flex flex-col fixed top-0 left-0 z-10'>
    <div className="text-[30px] font-[600] leading-[45px] text-black poppins flex items-center justify-center px-[20px] pt-[12px]">
      Got an invitation?
      <div className="flex-1"></div>
      <div className="h-[45px] rounded-full flex items-center justify-center cursor-pointer" onClick={onClose}>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.75781 17.7431L12.0004 12.5005M12.0004 12.5005L17.243 7.25781M12.0004 12.5005L6.75781 7.25781M12.0004 12.5005L17.243 17.7431" stroke="black" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    <div className='md:h-full w-full flex md:items-center flex-col md:px-[0px] px-[20px]'>
      <div className="md:w-[444px] md:mt-[40px] mt-[24px]">
        <div className='text-[16px] font-[400] leading-[24px] myLabel poppins flex items-center'>
          Invitation Code
        </div>
        <input value={code} onChange={(e) => {
          setCode(e.target.value)
          setErrorMsg('')
        }}
          placeholder="Enter your Invitation Code"
          className={`w-full h-[48px] p-[14px_16px] mt-[8px] poppins ${errorMsg ? 'login_inputError' : 'login_input'}`}
        />
        {errorMsg && <div className="text-[16px] font-[400] leading-[24px] text-[#FF0000]/90 poppins mt-[4px]">{errorMsg}</div>}
        <div className="text-[16px] font-[400] leading-[24px] text-black/50 poppins mt-[4px]">{`Get early access to Arttoo's Initial Art Offering (IAO) via invitation codes distributed on our socials to partners and key contributors.`}</div>
        <div className="text-[16px] font-[400] leading-[24px] text-black/50 poppins mt-[4px]">{`Don’t worry if you don’t have a code right now, you could add an invitation code later.`}</div>
        <div className={`w-full mt-[40px] login_submit_button poppins ${btnDisabled ? 'disabled' : ''}`} onClick={handleCodeLogin}>
          {isCodeLoading ? <div className="w-[20px] h-[20px] rounded-full border-t-2 border-b-2 border-white animate-spin"></div> : "Submit"}
        </div>
        <div className={`w-full login_submit_button2 poppins`} onClick={onClose}>
          Skip
        </div>
        <div className="h-[40px] md:hidden"></div>
      </div>
    </div>
  </div>
}

interface SlideBottomBoxProps {
  children: React.ReactNode
  close: () => void
  show: boolean
}
export const SlideBottomBox = ({ children, close, show }: SlideBottomBoxProps) => {
  const startTouchY = useRef(0)
  const startTouchTime = useRef(0)
  const isTouching = useRef(false)
  const [moveY, setMoveY] = useState(0)
  const [isClose, setIsClose] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  if (!show) return null

  const handleClose = () => {
    startTouchY.current = 0
    isTouching.current = false
    const endTouchTime = Date.now()
    const moveDistance = Math.abs(moveY)
    const moveSpeed = moveDistance / (endTouchTime - startTouchTime.current)
    const allDistance = boxRef.current?.getBoundingClientRect().height || 0
    if (moveY > allDistance / 3 || moveSpeed > 100) {
      setMoveY(allDistance)
      setIsClose(true)
    }
    else {
      setMoveY(0)
    }
  }
  const handleAnimationEnd = () => {
    // setMoveY(0)
    if (isClose) {
      close()
    }
  }
  return <div className="fixed top-0 left-0 w-full h-svh bg-black/50 flex flex-col items-center justify-center md:hidden z-10">
    <div className="flex-1 w-full" onClick={close}></div>
    <div
      ref={boxRef}
      // 过渡动画结束
      onTransitionEnd={handleAnimationEnd}
      className="w-full bg-white rounded-t-[12px] px-[20px]" style={{
        touchAction: 'none',
        transform: `translateY(${moveY}px)`,
        ...(isClose ? {
          transition: 'transform 0.3s ease-in-out'
        } : {})
      }}>
      {/* 按住下滑关闭  */}
      <div
        onTouchStart={(e) => {
          startTouchY.current = e.touches[0].clientY
          startTouchTime.current = Date.now()
          isTouching.current = true
        }}
        onTouchMove={(e) => {
          if (isTouching.current) {
            // 只能下拉
            const moveY = e.touches[0].clientY - startTouchY.current
            if (moveY > 0) {
              setMoveY(moveY)
            }
            else {
              setMoveY(0)
            }
          }
        }}
        onTouchEnd={handleClose}
        onTouchCancel={handleClose}
        className="h-[36px] w-full flex items-center justify-center">
        <div className="w-[32px] h-[4px] bg-black-0-1 rounded-full flex items-center justify-center"></div>
      </div>
      {children}
      <div className="footer-fixed-24"></div>
    </div>
  </div>
}