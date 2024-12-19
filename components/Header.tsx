'use client'
import Link from "next/link"
import { useState } from "react"
interface HeaderProps {
  isLogin?: boolean
}
export default function Header({ isLogin }: HeaderProps) {
  const navs = [
    "Explore",
    "Trade",
    "Portfolio",
  ]
  const [isOpen, setIsOpen] = useState(false)
  return <>
    <div className='md:mx-[80px] ml-[20px] md:h-[88px] h-[52px] items-center flex'>
      <div className={`${isLogin ? 'logo337' : 'logo312'}`}>
        <img src={'/arttoo-logo.png'} alt="logo" className='md:h-[35px] h-[20px]' style={{ filter: 'invert(1)' }} />
      </div>
      <div className='md:flex hidden items-center flex-1 justify-center'>
        {navs.map((nav, index) => (
          <Link href={`/${nav.toLowerCase()}`} key={index} className={`text-[18px] font-[500] ${index === navs.length - 1 ? 'mr-0' : 'mr-10'} myTitle`}>{nav}</Link>
        ))}
      </div>
      <div className='hidden md:flex items-center justify-center'>
        <div className='w-[48px] h-[48px] flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer mr-[12px]'>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 33L28.65 28.65M31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className='w-[48px] h-[48px] flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer mr-[12px]'>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.3333 29.8334C32.3333 30.2937 31.9602 30.6667 31.5 30.6667H16.5C16.0397 30.6667 15.6666 30.2937 15.6666 29.8334C15.6666 29.3732 16.0397 29.0001 16.5 29.0001V23.1929C16.5 19.0363 19.8578 15.6667 24 15.6667C28.1421 15.6667 31.5 19.0363 31.5 23.1929V29.0001C31.9602 29.0001 32.3333 29.3732 32.3333 29.8334ZM18.1666 29.0001H29.8333V23.1929C29.8333 19.9568 27.2216 17.3334 24 17.3334C20.7783 17.3334 18.1666 19.9568 18.1666 23.1929V29.0001ZM21.9166 31.5001H26.0833C26.0833 32.6507 25.1505 33.5834 24 33.5834C22.8494 33.5834 21.9166 32.6507 21.9166 31.5001Z" fill="black" fillOpacity="0.9" />
          </svg>
        </div>
        {
          isLogin ? <>
            <Link href="/auth/login"
              className='w-[157px] h-[48px] flex items-center justify-center bg-black-0-05 border-radius-12 cursor-pointer mr-[12px] hover:bg-[#c0c0c0]'>
              <div className='text-[16px] font-[400]'>Deposit Funds</div>
            </Link>
            {/* 头像  48 * 48 */}
            <div className='w-[48px] h-[48px] flex rounded-full items-center justify-center bg-black cursor-pointer hover:bg-[#c0c0c0]'>

            </div>
          </> : <>
            <Link href="/auth/login"
              className='w-[90px] h-[48px] flex items-center justify-center bg-black-0-05 border-radius-12 cursor-pointer mr-[12px] hover:bg-[#c0c0c0]'>
              <div className='text-[16px] font-[400]'>Login</div>
            </Link>
            <Link href="/auth/register"
              className='w-[90px] h-[48px] flex items-center justify-center bg-black-0-9 border-radius-12 cursor-pointer hover:bg-[#474747]'>
              <div className='text-[16px] font-[400] text-white'>Sign up</div>
            </Link>
          </>
        }
      </div>
      <div className='md:hidden flex-1 flex items-center justify-end'>
        {/* <div className={`w-[52px] h-[52px] flex mr-[4px] items-center justify-center cursor-pointer text-black `}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 33L28.65 28.65M31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z" stroke="black" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={`w-[52px] h-[52px] flex items-center justify-center cursor-pointer text-black`}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.3333 29.8334C32.3333 30.2937 31.9602 30.6667 31.5 30.6667H16.5C16.0397 30.6667 15.6666 30.2937 15.6666 29.8334C15.6666 29.3732 16.0397 29.0001 16.5 29.0001V23.1929C16.5 19.0363 19.8578 15.6667 24 15.6667C28.1421 15.6667 31.5 19.0363 31.5 23.1929V29.0001C31.9602 29.0001 32.3333 29.3732 32.3333 29.8334ZM18.1666 29.0001H29.8333V23.1929C29.8333 19.9568 27.2216 17.3334 24 17.3334C20.7783 17.3334 18.1666 19.9568 18.1666 23.1929V29.0001ZM21.9166 31.5001H26.0833C26.0833 32.6507 25.1505 33.5834 24 33.5834C22.8494 33.5834 21.9166 32.6507 21.9166 31.5001Z" fill="black" fillOpacity="0.9" />
          </svg>
        </div> */}
        {
          isLogin ? <div className={`w-[28px] h-[28px] ml-[4px] flex items-center justify-center cursor-pointer text-black rounded-full bg-black`}>
          </div> : null
        }
        <div className={`w-[72px] h-[52px] flex items-center justify-center cursor-pointer text-black`} onClick={() => { setIsOpen(!isOpen) }}>
          {!isOpen ? <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
            <rect width="24" height="2" fill="currentColor" style={{ fill: 'currentColor', fillOpacity: 1 }} />
            <rect y="10" width="24" height="2" fill="currentColor" style={{ fill: 'currentColor', fillOpacity: 1 }} />
            <rect y="20" width="24" height="2" fill="currentColor" style={{ fill: 'currentColor', fillOpacity: 1 }} />
          </svg> :
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
              <rect x="2.80762" y="18.7783" width="24" height="2" transform="rotate(-45 2.80762 18.7783)" fill="currentColor" style={{ fill: 'currentColor', fillOpacity: 1 }} />
              <rect width="24" height="2" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 21.1914 18.7783)" fill="currentColor" style={{ fill: 'currentColor', fillOpacity: 1 }} />
            </svg>
          }
        </div>
      </div>

    </div>
    <div className='h-[1px] w-full bg-black-0-1'></div>
    {isOpen && <div className="fixed top-[52px] left-0 w-full h-full bg-black-0-9 z-10 md:hidden flex flex-col">
      <div className='flex flex-col items-center justify-center  bg-white'>
        {navs.map((nav, index) => (
          <Link href={`/`} key={index} className={`text-[18px] border-b  w-full h-[48px] flex items-center justify-center font-[500] ${index === navs.length - 1 ? 'mr-0' : 'md:mr-10'} myTitle`}>{nav}</Link>
        ))}
      </div>
      {isLogin ? <div className='flex flex-col bg-white p-[20px]'>
        <Link href="/auth/login"
          className='px-[20px] h-[48px] flex items-center justify-center bg-black-0-05 border-radius-12 cursor-pointer mr-[12px] hover:bg-[#c0c0c0]'>
          <div className='text-[16px] font-[400]'>Deposit Funds</div>
        </Link>
      </div> : <div className='flex flex-col bg-white p-[20px]'>
        <Link href="/auth/login"
          className='px-[20px] mb-[20px] h-[48px] flex items-center justify-center bg-black-0-05 border-radius-12 cursor-pointer mr-[12px] hover:bg-[#c0c0c0]'>
          <div className='text-[16px] font-[400]'>Login</div>
        </Link>
        <Link href="/auth/register"
          className='px-[20px] h-[48px] flex items-center justify-center bg-black-0-9 border-radius-12 cursor-pointer hover:bg-[#474747]'>
          <div className='text-[16px] font-[400] text-white'>Sign up</div>
        </Link>
      </div>}
      <div className="flex-1" onClick={() => { setIsOpen(false) }}></div>
    </div>}
  </>
}
