'use client'
import { useUser } from "@/contexts/UserContext"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AddEmail, CheckCode, InviteCode } from "./email"


export default function Header() {
  const { user } = useUser()
  const isLogin = user ? true : false
  const [isOpen, setIsOpen] = useState(false)
  const [isAddEmailOpen, setIsAddEmailOpen] = useState(false)
  const [isCheckCodeOpen, setIsCheckCodeOpen] = useState(false)
  const [isInviteCodeOpen, setIsInviteCodeOpen] = useState(false)
  const walltes = useMemo(() => {
    return [
      {
        name: 'Suiet Wallet',
        icon: '/wallets/suiet.png',
        hasInstall: (window as any).suiWallet ? true : false,
        onClick: () => {
          setIsAddEmailOpen(true)
          setIsOpen(false)
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
      },
      {
        name: 'Martian Sui Wallet',
        icon: '/wallets/martian.png',
        onClick: () => {
          setIsOpen(true)
        }
      },
      {
        name: 'Surf Wallet',
        icon: '/wallets/surf.png',
        onClick: () => { }
      },
      {
        name: 'Onekey Wallet',
        icon: '/wallets/onekey.png',
        onClick: () => { }
      },
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
          Connect
        </div>
      </div>
    </div>
    <div className='h-[1px] w-full bg-black-0-1'></div>
    {isOpen && <div className="fixed top-[0px] left-0 w-full h-full z-10 max-md:hidden">
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
    {isOpen && <div className="fixed top-[0px] left-0 w-full h-full z-10 bg-white px-[20px] pt-[12px]">
      <div className="text-[30px] font-[600] mb-[12px] leading-[45px] text-black poppins flex items-center justify-center">
        Connect Wallet
        <div className="flex-1"></div>
        <div className="h-[45px] rounded-full flex items-center justify-end cursor-pointer" onClick={() => setIsOpen(false)}>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75781 17.7431L12.0004 12.5005M12.0004 12.5005L17.243 7.25781M12.0004 12.5005L6.75781 7.25781M12.0004 12.5005L17.243 17.7431" stroke="black" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        {walltes.map((wallet, index) => (
          <div
            onClick={wallet.onClick}
            key={index} className="flex w-full py-[14px] px-[16px] items-center border border-black/10 border-width-[1px] border-radius-12 cursor-pointer active:bg-black/5 select-none">
            <img src={wallet.icon} alt={wallet.name} className="w-[32px] h-[32px]" />
            <div className="text-[18px] font-[400] text-black/90 poppins ml-[12px]">{wallet.name}</div>
          </div>
        ))}
      </div>
    </div >}
    {
      isAddEmailOpen && <AddEmail onClose={() => setIsAddEmailOpen(false)} onSuccess={() => {
        setIsCheckCodeOpen(true)
        setIsAddEmailOpen(false)
      }} />
    }
    {
      isCheckCodeOpen && <CheckCode onClose={() => setIsCheckCodeOpen(false)} onSuccess={() => {
        setIsCheckCodeOpen(false)
        setIsInviteCodeOpen(true)
      }} />
    }
    {
      isInviteCodeOpen && <InviteCode onClose={() => setIsInviteCodeOpen(false)} onSuccess={() => {
        setIsInviteCodeOpen(false)
      }} />
    }
  </>
}