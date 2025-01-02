'use client'
import Header from "@/components/Header"
const ResultPage = () => {
  return <div className="w-full bg-white result_page">
    <Header />
    <div className="px-[20px]">
      <div className="flex flex-col mb-[40px] mt-[60px] items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 25L20 31L34 17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 44C35.0456 44 44 35.0456 44 24C44 12.9543 35.0456 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0456 12.9543 44 24 44Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-[24px] font-[400] VictorSherif leading-[48px] text-black">Order <span className="font-[500] VictorSherif italic">Completed</span></div>
      </div>
      <div className="h-[1px] bg-black-0-1 w-full mb-[20px]"></div>
      {
        [
          {
            key: 'Pair',
            value: 'NATHM1898 '
          },
          {
            key: 'Type',
            value: 'Presale / Buy'
          },
          {
            key: 'Amount',
            value: '30'
          },
          {
            key: 'Direction',
            value: 'Long'
          },
          {
            key: 'Average Cost',
            value: '1.99 USDC'
          },
          {
            key: 'Fee',
            value: '0.00 USDC'
          },
          {
            key: 'Total Cost',
            value: '1.99 USDC'
          },
        ].map((item, index) => <div key={index} className="flex justify-between mb-[8px]">
          <div className="md:text-[16px] text-[14px] font-[400] text-black/30 poppins">{item.key}</div>
          <div className={`md:text-[16px] text-[14px] font-[400] ${index === 3 ? 'text-[#12B76A]' : 'text-black/90'} poppins`}>{item.value}</div>
        </div>)
      }
      {/* line */}
      <div className="h-[1px] bg-black-0-1 w-full mt-[12px]"></div>
      <div
        onClick={() => {
          // setToSuccessPage(false)
        }}
        className="h-[48px] cursor-pointer rounded-[8px] bg-black text-white text-[18px] font-[500] poppins text-center mt-[40px] flex items-center justify-center hover:bg-[#474747]">
        Done
      </div>
      <div className="flex items-center justify-center mt-[24px] ">
        <a href="#" className="font-[18px] font-[400] text-center text-black/90 poppins">View Transaction</a>
      </div>
      <div className="md:hidden h-[24px]"></div>
    </div>

  </div >
}

export default ResultPage