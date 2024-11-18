import { useRef, useState, useEffect } from "react"

interface AmountInputProps {
  value: string
  disabled?: boolean
  onChange: (value: string) => void
}
export const AmountInput = (props: AmountInputProps) => {
  const [isFocus, setIsFocus] = useState(false)
  return <div className={`flex items-center px-[12px] py-[20px] w-full h-[72px] border-2 ${!isFocus ? 'border-black' : 'border-[#12B76A]'} rounded-[12px]`}>
    <input
      className="flex-1 h-full bg-transparent outline-none text-[24px] font-[400] leading-[32px] text-black-0-9 caret-[#12B76A]"
      value={props.value}
      onFocus={() => !props.disabled && setIsFocus(true)}
      onBlur={() => !props.disabled && setIsFocus(false)}
      onChange={(e) => !props.disabled && props.onChange(e.target.value)}
      disabled={props.disabled}
    />
    <div className="w-[48px] h-[48px] bg-black-0-05 rounded-[8px] flex items-center justify-center cursor-pointer" onClick={() => !props.disabled && setIsFocus(true)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  const [showPercent, setShowPercent] = useState(false)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    window.addEventListener('mouseup', () => {
      console.log('mouse up')
      isDraggingRef.current = false
    })
  }, [])
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    let value = Math.round(x / rect.width * 100)
    if (value < 0) value = 0
    if (value > 100) value = 100
    props.onChange(value)
    setShowPercent(true)

  }
  const handleClickPoint = (index: number = 25) => {
    props.onChange(index)
    setShowPercent(true)
  }
  return <div
    onMouseLeave={() => setShowPercent(false)}
    onClick={handleClick}
    onMouseMove={(e) => {
      if (isDraggingRef.current) {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        let value = Math.round(x / rect.width * 100)
        if (value < 0) value = 0
        if (value > 100) value = 100
        props.onChange(value)
        setShowPercent(true)
      }
    }}
    className="my-[16px] mb-[14px] h-[26px] w-[calc(100%-10px)] ml-[5px] relative cursor-pointer w-full">
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
    {props.value > 0 && <div
      // 鼠标拖动
      onMouseDown={() => {
        console.log('mouse down')
        // setIsDragging(true)
        isDraggingRef.current = true
      }}
      // onMouseUp={() => {
      //   console.log('mouse up')
      //   setIsDragging(false)
      // }}


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
      className="bottom-triangle absolute bottom-[15px] translate-x-[-50%] bg-black-23 text-white text-[12px] leading-[12px] font-[500] p-[2px] rounded-[2px]"
    >
      {props.value}%
    </div> : null}
  </div>
}