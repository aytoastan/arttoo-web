import { useWindowSize } from "@/utils"
import { useRef, useState, useEffect, FC } from "react"

interface AmountInputProps {
  value: string
  disabled?: boolean
  onChange: (value: string) => void
  hideSuffix?: boolean
}
export const AmountInput = (props: AmountInputProps) => {
  const [isFocus, setIsFocus] = useState(false)
  return <div className={`flex items-center px-[12px] md:py-[20px] py-[15px] w-full md:h-[68px] h-[56px] border-2 ${!isFocus ? 'border-black' : 'border-black'} rounded-[12px]`}>
    <input
      className="flex-1 h-full bg-transparent outline-none md:text-[24px] text-[18px] font-[400] text-black-0-9 caret-[#12B76A] poppins"
      value={props.value}
      onFocus={() => !props.disabled && setIsFocus(true)}
      onBlur={() => !props.disabled && setIsFocus(false)}
      onChange={(e) => !props.disabled && props.onChange(e.target.value)}
      disabled={props.disabled}
    />
    {!props.hideSuffix && <div className="md:text-[24px] text-[18px] font-[400] text-black-0-3 md:mr-[12px] mr-[6px] poppins">
      USDC
    </div>}
    <div className="md:w-[48px] md:h-[48px] w-[36px] h-[36px] bg-black-0-05 rounded-[8px] flex items-center justify-center cursor-pointer" onClick={() => !props.disabled && setIsFocus(true)}>
      <svg
        className="md:w-[24px] md:h-[24px] w-[18px] h-[18px]"
        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17L20 17M20 17L17 20M20 17L17 14" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 7L4 7M4 7L7 10M4 7L7 4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
}

interface SlideInputProps {
  value: number
  onChange: (value: number) => void
}
export const SlideInput = (props: SlideInputProps) => {
  const percent = props.value / 100
  const [showPercent, setShowPercent] = useState(props.value > 0)
  const isDraggingRef = useRef(false)
  const isTouchingRef = useRef(false)

  useEffect(() => {
    // window.addEventListener('mouseup', () => {
    //   console.log('mouse up')
    //   isDraggingRef.current = false
    // })
  }, [])
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    let value = Math.round(x / rect.width * 100)
    if (value < 0) value = 0
    if (value > 100) value = 100
    props.onChange(value)
    // 如果是 0 则不显示百分比
    // if (value === 0) {
    //   setShowPercent(false)
    // } else {
    //   setShowPercent(true)
    // }
  }
  const handleClickPoint = (index: number = 25) => {
    props.onChange(index)
    setShowPercent(true)
  }
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log('touch start')
    isTouchingRef.current = true
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    let value = Math.round(x / rect.width * 100)
    if (value < 0) value = 0
    if (value > 100) value = 100
    props.onChange(value)
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTouchingRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      let value = Math.round(x / rect.width * 100)
      if (value < 0) value = 0
      if (value > 100) value = 100
      props.onChange(value)
    }
  }
  const handleTouchEnd = () => {
    isTouchingRef.current = false
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true
    handleClick(e)
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      handleClick(e)
    }
  }
  const handleMouseUp = () => {
    isDraggingRef.current = false
  }
  const handleMouseLeave = () => {
    isDraggingRef.current = false
  }
  return <div
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    onTouchCancel={handleTouchEnd}
    // 兼容 pc 和 移动端
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseLeave}
    className="md:my-[16px] my-[8px] mb-[14px] h-[26px] w-[calc(100%-15px)] ml-[5px] relative cursor-pointer w-full user-select-none">
    <div className="h-[2px] w-full bg-gray-1 absolute bottom-[4px]"></div>
    {/* 0% */}
    <div className="h-[10px] w-[10px] rounded-full bg-gray-1 absolute bottom-0 left-[0%] ml-[-5px]" onClick={() => handleClickPoint(0)}>
      {props.value > 0 ? <div className="h-[8px] w-[8px] rounded-full bg-black-23 absolute bottom-[1px] left-[1px]"></div> : null}
    </div>
    <div className="h-[10px] w-[10px] rounded-full bg-gray-1 absolute bottom-0 left-[25%] ml-[-5px]" onClick={() => handleClickPoint(25)}>
      {props.value >= 25 ? <div className="h-[4px] w-[4px] rounded-full bg-black-23 absolute bottom-[3px] left-[3px]"></div> : null}
    </div>
    <div className="h-[10px] w-[10px] rounded-full bg-gray-1 absolute bottom-0 left-[50%] ml-[-5px]" onClick={() => handleClickPoint(50)}>
      {props.value >= 50 ? <div className="h-[4px] w-[4px] rounded-full bg-black-23 absolute bottom-[3px] left-[3px]"></div> : null}
    </div>
    <div className="h-[10px] w-[10px] rounded-full bg-gray-1 absolute bottom-0 left-[75%] ml-[-5px]" onClick={() => handleClickPoint(75)}>
      {props.value >= 75 ? <div className="h-[4px] w-[4px] rounded-full bg-black-23 absolute bottom-[3px] left-[3px]"></div> : null}
    </div>
    <div className="h-[10px] w-[10px] rounded-full bg-gray-1 absolute bottom-0 left-[100%] ml-[-5px]" onClick={() => handleClickPoint(75)}>
      {props.value >= 100 ? <div className="h-[8px] w-[8px] rounded-full bg-black-23 absolute bottom-[1px] left-[1px]"></div> : null}
    </div>
    <div className="w-[calc(100%-4px)] h-[2px] absolute bottom-[4px] left-[2px]">
      <div className="h-[2px] bg-black-23"
        style={{
          width: `${percent * 100}%`
        }}
      ></div>
    </div>
    {/* cursor */}
    {<div


      className="h-[10px] w-[10px] rounded-full bg-gray-1 absolute bottom-0 hover:scale-150 transition-transform duration-300"
      style={{
        left: `${percent * 100}%`,
        marginLeft: '-5px',
      }}
    >
      <div className="h-[8px] w-[8px] rounded-full bg-black-23 absolute bottom-[1px] left-[1px]"></div>
    </div>}
    {/* show percent */}
    {showPercent ? <div
      style={{
        left: `${percent * 100}%`
      }}
      className="bottom-triangle absolute bottom-[15px] translate-x-[-50%] bg-black-23 text-white text-[12px] leading-[12px] font-[500] p-[2px] rounded-[2px] poppins"
    >
      {props.value}%
    </div> : null}
  </div>
}

interface ProgressBarProps {
  value: number
  isThin?: boolean
}
export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<number[]>([])
  const [size] = useWindowSize()
  useEffect(() => {
    // 获取宽度
    console.log(props.value, ref.current?.clientWidth)
    const width = (ref.current?.clientWidth || 0) + 30
    // 每个 1px ，间隔 3 px
    const count = Math.floor(width / (props.isThin ? 3.5 : 4))
    const list = []
    for (let i = 0; i < count; i++) {
      list.push(i)
    }
    setList(list)
  }, [props.value, size])
  return <div
    style={{
      width: `${props.value}%`
    }}
    className={`h-[11px] relative overflow-hidden`} ref={ref}>
    <div className="absolute top-0 left-0 flex">
      {
        // 旋转中心 50%
        list.map((item) => <div key={item}
          className="h-[30px] bg-black"
          style={{
            width: props.isThin ? '0.5px' : '1px',
            marginLeft: props.isThin ? '3px' : '3px',
            transformOrigin: '0% 0%',
            transform: `rotate(45deg)`
          }}
        ></div>)
      }
    </div>
  </div>
}

interface SlippageInputProps {
  close: () => void
  value: number
  onChange: (value: number) => void
}
export const SlippageInput = (props: SlippageInputProps) => {
  // const [value, setValue] = useState(0.5)
  // const [value, setValue] = useState(props.value)
  return <>
    <div
      onClick={() => props.close()}
      className="fixed top-0 left-0 w-full h-full bg-black-0-5 z-[2] "></div>
    <div className="w-[100%] h-[261px] px-[20px] py-[24px] bg-white my-shadow-2xl rounded-[16px] absolute top-[24px] left-0 z-[9]">
      <div className="text-[20px] font-[600] leading-[28.8px] text-center text-[#121212]">Max. slippage</div>
      <div className="my-[24px] flex items-center justify-between">
        {
          [0.3, 0.5, 1, 100].map((item) => <div key={item} className={`w-[100px] h-[88px] rounded-[8px] ${props.value === item ? 'bg-black text-white' : 'border-[1px] border-black-0-1 text-black-0-9 hover:opacity-80 cursor-pointer'} text-[18px] font-[400] text-center flex items-center justify-center`} onClick={() => props.onChange(item)}>
            {item}%
          </div>)
        }
      </div>
      <div
        onClick={() => {
          props.close()
        }}
        className="h-[48px] max-md:hidden cursor-pointer rounded-[12px] bg-black text-white text-[18px] font-[400] text-center flex items-center justify-center hover:bg-[#474747]">
        Save
      </div>
    </div>
  </>
}


interface ListButtonProps {
  activeIndex: number
  onChange: (index: number) => void
}
export const ListButton = (props: ListButtonProps) => {
  const { activeIndex, onChange } = props
  const list = [
    'LIVE',
    "4h",
    "1D",
    "1W",
    "1Y",
    "MAX"
  ]
  return <div className="flex items-center justify-between mt-[12px] select-none">
    {
      list.map((item, index) => <div key={item} className={`px-[8px] py-[2px] rounded-[4px] ${activeIndex === index ? 'bg-black text-white' : 'bg-black/5 text-black-0-9'} text-[14px] font-[400] poppins text-center flex items-center justify-center cursor-pointer`} onClick={() => onChange(index)}>{item}</div>)
    }
  </div>
}