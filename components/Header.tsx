'use client'
import { useUser } from "@/contexts/UserContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

interface SlideBottomBoxProps {
  children: React.ReactNode
  close: () => void
  show: boolean
}
const SlideBottomBox = ({ children, close, show }: SlideBottomBoxProps) => {
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
    else{
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
export default function Header() {
  const { user } = useUser()
  const isLogin = user ? true : false
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const walltes = useMemo(() => {
    return [
      {
        name: 'Suiet Wallet',
        icon: '/wallets/suiet.png',
        hasInstall: (window as any).suiWallet ? true : false,
        onClick: () => {
          // to add email
          router.push('/add-email')
        }
      },
      {
        name: 'Sui Wallet',
        icon: '/wallets/sui.png',
        onClick: () => { }
      },
      {
        name: 'Nightly',
        icon: '/wallets/nightly.png',
        onClick: () => { }
      },
      {
        name: 'OKX Wallet',
        icon: '/wallets/okx.png',
        onClick: () => { }
      }
    ]
  }, [])
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  return <>
    <div className='md:mx-[40px] mx-[20px] md:h-[88px] h-[62px] items-center flex'>
      <Link href="/" className={`${isLogin ? 'logo337' : 'logo312'}`}>
        <img src={'/arttoo-logo.png'} alt="logo" className='md:h-[35px] h-[20px]' style={{ filter: 'invert(1)' }} />
      </Link>
      <div className='flex-1'>
      </div>
      <div className='flex items-center justify-center'>
        <div
          className='md:w-[157px] md:h-[48px] h-[40px] w-auto px-[12px] text-[16px] font-[400] poppins flex items-center justify-center bg-black-0-05 md:rounded-[12px] rounded-[8px] cursor-pointer md:hover:bg-[#c0c0c0] select-none'
          onClick={() => setIsOpen(true)}
        >
          Connect Walllet
        </div>
      </div>
    </div>
    <div className='h-[1px] w-full bg-black-0-1'></div>
    {isOpen && <div className="fixed top-[0px] left-0 w-full h-full z-10 max-md:hidden">
      {/* bg */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute top-[0px] left-0 w-full h-full bg-black/50"
      />
      <div className='flex flex-col bg-white p-[32px] bg-white rounded-[16px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
        <div className="text-[24px] font-[600] poppins leading-[32px] mb-[12px]">Connect Wallet</div>
        <div className="flex gap-[8px] flex-col">
          {walltes.map((wallet, index) => (
            <div key={index}
              onClick={wallet.onClick}
              className="flex w-[362px] p-[16px] items-center border border-black/10 border-width-[1px] border-radius-12 cursor-pointer hover:bg-black/5 select-none">
              <img src={wallet.icon} alt={wallet.name} className="w-[28px] h-[28px]" />
              <div className="text-[18px] font-[500] text-black/90 poppins ml-[12px]">{wallet.name}</div>
            </div>
          ))}
        </div>
        <div className="absolute top-[0px] right-[0px] w-[64px] h-[64px] flex items-center justify-center cursor-pointer select-none" onClick={() => setIsOpen(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.7583 17.2431L12.0009 12.0005M12.0009 12.0005L17.2435 6.75781M12.0009 12.0005L6.7583 6.75781M12.0009 12.0005L17.2435 17.2431" stroke="black" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>}
    {isOpen && <SlideBottomBox close={() => setIsOpen(false)} show={isOpen}>
      <div className="text-[24px] font-[600] mb-[12px] leading-[32px] text-black poppins">Connect Wallet</div>
      <div className="flex flex-col gap-[8px]">
        {walltes.map((wallet, index) => (
          <div 
          onClick={wallet.onClick}
          key={index} className="flex w-full p-[16px] items-center border border-black/10 border-width-[1px] border-radius-12 cursor-pointer active:bg-black/5 select-none">
            <img src={wallet.icon} alt={wallet.name} className="w-[28px] h-[28px]" />
            <div className="text-[18px] font-[500] text-black/90 poppins ml-[12px]">{wallet.name}</div>
          </div>
        ))}
      </div>
    </SlideBottomBox>}
  </>
}
