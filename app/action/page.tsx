'use client'
import Header from "@/components/Header"
import { AmountInput, ProgressBar, SlideInput } from "@/components/input"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { formatNumber, isValidNumber } from "@/utils"
import * as d3 from "d3";
const ActionPage = () => {
  const svgRef2 = useRef<SVGSVGElement>(null)
  const searchParams = useSearchParams()
  const step = Number(searchParams?.get('step')) || 0
  const type = searchParams?.get('type') === 'buy' ? true : false
  const [slippage, setSlippage] = useState(false)
  const [slideValue, setSlideValue] = useState(78)
  const [value, setValue] = useState(0)
  const [isBuy, setIsBuy] = useState(type)
  const [amount, setAmount] = useState('')
  const [confirmBuy, setConfirmBuy] = useState(false)
  const buyStyle = Number(searchParams?.get('style')) || 0
  const router = useRouter()
  useEffect(() => {
    if (svgRef2.current) {
      const data = [
        { date: "2024-01", value: 1 },
        { date: "2024-02", value: 2 },
        { date: "2024-03", value: 1.5 },
        { date: "2024-04", value: 2.5 },
        { date: "2024-05", value: 2.2 },
        { date: "2024-06", value: 3.5 },
        { date: "2024-07", value: 4 },
      ];

      // 图表尺寸
      const width = 520;
      const height = 169;
      const margin = { top: 0, right: 0, bottom: 30, left: 40 };


      // 格式化日期
      const parseDate = d3.timeParse("%Y-%m");
      const formatDate = d3.timeFormat("%b");

      // 转换日期格式
      data.forEach((d: any) => {
        d.date = parseDate(d.date);
      });

      // 创建比例尺
      const xScale = d3
        .scaleTime()
        .domain((d3 as any).extent(data, (d: any) => {
          return d.date
        }))
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([1, (d3 as any).max(data, (d: any) => d.value) * 1.2]) // 放大最大值以留白
        .range([height - margin.bottom, margin.top]);

      // 创建 SVG 容器
      const svg = d3
        .select(svgRef2.current)
        .attr('viewBox', `0 0 ${width} ${height}`) // 设置视窗大小
        .attr('preserveAspectRatio', 'xMidYMid meet') // 保持纵横比
        .classed('responsive', true); // 添加类以便后续使用 CSS

      // 清空 SVG（防止多次渲染重复）
      svg.selectAll("*").remove();
      // 绘制 x 轴
      svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(
          (d3 as any).axisBottom(xScale)
            .ticks(data.length)
            .tickFormat((d: any) => {
              if (new Date(d).getMonth() === 0) return "2024"
              return formatDate(d)
            })
        )
        // .selectAll("text")
        // .style("font-size", "12px")
        // .style("color", "rgba(0, 0, 0, 0.4)")
        .call((g) => {
          g.select(".domain").attr("stroke", "rgba(0, 0, 0, 0.4)")
          g.selectAll(".tick line") // 修改刻度线样式
            .attr("stroke", "rgba(0, 0, 0, 0.2)")
            .attr("stroke-width", 1)

          g.selectAll(".tick text") // 调整刻度文字的位置
            // .attr("dx", "-0px") // 将文字向左移动 10px
            .attr("fill", "black") // 设置文字颜色
            .attr("font-size", "12px");

          // 最后一个刻度左移 10px
          g.selectAll(".tick:last-of-type text")
            .attr("dx", "-10px")
        })
        .attr("font-size", "12px")

      // 绘制 y 轴
      svg
        .append("g")
        .call(
          (d3 as any).axisLeft(yScale)
            .ticks(5) // 设置刻度数量
            .tickSize(-width) // 设置刻度线长度为图表宽度的负值，横穿整个象限
            .tickFormat((d: any) => d) // 可选：保留默认刻度文字
            .tickFormat((d: any) => {
              // 0 不展示
              if (d === 0) return ''
              return d + 'M'
            })
        )
        .attr("transform", `translate(${margin.left}, 0)`)
        .call((g) => {
          g.select(".domain").remove()

          g.selectAll(".tick line") // 修改刻度线样式
            .attr("stroke", "rgba(0, 0, 0, 0.2)")
            .attr("stroke-width", 0.5)

          g.selectAll(".tick text") // 调整刻度文字的位置
            .attr("dx", "-10px") // 将文字向左移动 10px
            .attr("fill", "black") // 设置文字颜色
            .attr("font-size", "12px");
        }) // 移除轴线
        .attr("font-size", "12px")

      // 修改 Y 轴刻度文字的颜色
      svg
        .selectAll(".tick text") // 选择 Y 轴的刻度文字
        .attr("fill", "rgba(0, 0, 0, 0.4)"); // 设置字体颜色

      // 绘制填充区域
      const area = d3
        .area()
        .x((d: any) => xScale(d.date))
        .y0(height - margin.bottom) // 起始 y 值（底部）
        .y1((d: any) => yScale(d.value)) // 终止 y 值（数据点的 y 值）
        .curve(d3.curveLinear); // 曲线类型（可改为 d3.curveMonotoneX）
      // 绘制填充区域
      const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "greenGradient")
        .attr("x1", "0.5")
        .attr("y1", "0")
        .attr("x2", "0.5")
        .attr("y2", "1");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgba(18, 183, 106, 0.01)");

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "rgba(255, 255, 255, 0.9)");
      svg
        .append("path")
        .datum(data)
        .attr("fill", "url(#greenGradient)") // 填充颜色
        .attr("d", (area as any));

      // 绘制折线
      const line = d3
        .line()
        .x((d: any) => xScale(d.date))
        .y((d: any) => yScale(d.value))
        .curve(d3.curveLinear); // 曲线类型

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#4CAF50") // 折线颜色
        .attr("stroke-width", 2)
        .attr("d", (line as any));
    }
  }, [])
  const renderMain = () => {
    if (step === 1) {
      return <>
        <div className="flex items-center">
          <div className="w-[50%] md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-5 poppins">Whitelist</div>
          {buyStyle === 4 ? <div className="md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-5 poppins">Public</div> : null}
        </div>
        {buyStyle !== 4 ? <div className="relative bg-black-0-1 h-[11px] md:my-[8px] my-[8px]">
          {buyStyle === 1 ? <div className="h-[11px] bg-black w-[0%]"></div> : null}
          {buyStyle === 2 || buyStyle === 0 ? <div className="h-[11px] bg-black w-[50%]"></div> : null}
          {buyStyle === 3 ? <div className="h-[11px] bg-black w-[100%]"></div> : null}
        </div> : <div className="relative flex bg-black-0-1 h-[11px] md:my-[8px] my-[8px]">
          <div className="h-[11px] bg-black w-[50%]"></div>
          <ProgressBar value={20} />
          <ProgressBar value={30} isThin={true} />
        </div>}
        <div className="flex justify-between">
          <div className="md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-5 poppins">270,141 USDC</div>
          <div className="flex-1"></div>
          <div className="md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-5 poppins">Goal 100,000 SUI</div>
        </div>
        <div className="flex items-center justify-between  md:mt-[24px] mt-[12px] gap-[48px]">
          {[
            {
              key: 'Backers',
              value: '144'
            },
            {
              key: 'Days to go',
              value: '18'
            },
            {
              key: 'Progress',
              value: buyStyle === 4 ? '155%' : buyStyle === 1 ? '0%' : buyStyle === 2 ? '50%' : buyStyle === 3 ? '100%' : '50%'
            }
          ].map((item, index) => <div className="flex items-center md:text-[16px] text-[12px] font-[400] md:leading-[28.8px] leading-[18px] poppins" key={index}>
            <div className="text-black-0-9 font-[500] mr-[4px] poppins">{item.value}</div>
            <div className="text-black-0-5 font-[400] poppins">{item.key}</div>
          </div>)}
        </div>
        {
          buyStyle === 4 ? <>
            <div className="h-[1px] bg-black-0-1 w-full md:my-[40px] my-[24px]"></div>
            <div className="md:text-[16px] text-[12px] font-[400] mb-[-8px] md:leading-[20px] leading-[14.4px] text-black-0-9 poppins">Price (USDC)</div>
            <div className="w-full">
              <svg ref={svgRef2} />
            </div>
          </> : null
        }
        <div className="">
          <div className="h-[1px] bg-black-0-1 w-full md:my-[40px] my-[24px] relative"></div>
          {/* 输入框 */}
          <div className="flex items-center justify-between mb-[8px] relative">
            <div className="md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-6 poppins">
              Amount
            </div>
            {buyStyle > 0 ? <div
              onClick={() => setSlippage(true)}
              className="flex items-center md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-5 poppins cursor-pointer">
              <svg
                className="mr-[5px]"
                width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.46222 4.50195C11.8054 4.50195 14.6653 4.50195 14.6653 4.50195M2.66534 4.50195H5.16534M5.16534 4.50195C5.16534 5.60652 6.06077 6.50195 7.16534 6.50195C8.26991 6.50195 9.16534 5.60652 9.16534 4.50195C9.16534 3.39738 8.26991 2.50195 7.16534 2.50195C6.06077 2.50195 5.16534 3.39738 5.16534 4.50195ZM2.66534 11.502H7.86222M12.1653 11.502H14.6653M12.1653 11.502C12.1653 12.6066 11.2699 13.502 10.1653 13.502C9.06077 13.502 8.16534 12.6066 8.16534 11.502C8.16534 10.3974 9.06077 9.50195 10.1653 9.50195C11.2699 9.50195 12.1653 10.3974 12.1653 11.502Z" stroke="black" strokeOpacity="0.5" strokeLinecap="round" />
              </svg>
              {formatNumber(value)}% slippage
            </div> : null}
          </div>
          <AmountInput
            hideSuffix={true}
            value={'$10,385.00'}
            disabled={true}
            onChange={() => {
            }}
          />
          <div className="pr-[12px] pt-[4px]">
            <SlideInput
              value={slideValue}
              onChange={(value) => setSlideValue(value)}
            />
          </div>
          {[
            {
              key: 'Avail. Buying Power',
              value: '0.00 USDC'
            },
            {
              key: 'Avail. Quota',
              value: '300.00 / 300.00 USDC'
            },
            {
              key: 'Estimated Fee',
              value: '$0.00'
            },
            {
              key: 'Estimated Total',
              value: '0.00 USDC'
            },
          ].map((item, index) => <div className={`${index === 3 ? 'mt-[10px]' : 'md:mb-[16px] mb-[4px]'} flex justify-between`} key={index}>
            <div className={`flex-1 ${index === 3 ? 'md:text-[24px] text-[18px] md:leading-[24px] leading-[18px] font-[400]' : 'md:text-[16px] text-[12px] md:leading-[20px] leading-[18px] font-[400]'} text-black-0-3 poppins`}>{item.key}</div>
            <div className={`flex-1 ${index === 3 ? 'md:text-[24px] text-[18px] md:leading-[24px] leading-[18px] font-[400]' : 'md:text-[16px] text-[12px] md:leading-[20px] leading-[18px] font-[400]'} text-black-0-9 poppins text-right`}>{item.value}</div>
          </div>)}
        </div>
        <div
          onClick={() => { }}
          className="h-[48px] cursor-pointer rounded-[8px] bg-black text-white text-[18px] font-[500] text-center mt-[24px] flex items-center justify-center hover:bg-[#474747] poppins">
          {buyStyle > 0 ? 'Lock' : 'Buy'}
        </div>
      </>
    }
    return <>
      <div className="mt-[24px] flex gap-[24px]">
        <div>
          <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6 poppins">Price (USDC)</div>
          <div className="md:text-[20px] text-[16px] font-[500] md:leading-[30px] leading-[19.5px] text-black-0-9 poppins mt-[18px]">100.2350</div>
        </div>
        <div>
          <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6 poppins">24h Change</div>
          <div className="md:text-[20px] text-[16px] font-[400] md:leading-[30px] leading-[19.5px] text-[#12B76A] flex items-center poppins mt-[18px]">
            <svg
              className="mr-[4px]"
              width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#12B76A" />
            </svg>
            1.21%</div>
        </div>
        <div>
          <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6 poppins">YTD Change</div>
          <div className="md:text-[20px] text-[16px] font-[400] md:leading-[30px] leading-[19.5px] text-[#12B76A] flex items-center poppins mt-[18px]">
            <svg
              className="mr-[4px]"
              width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#12B76A" />
            </svg>
            3.35%</div>
        </div>
      </div>
      <div className="md:text-[16px] text-[12px] font-[400] mt-[24px] mb-[-8px] md:leading-[20px] leading-[14.4px] text-black-0-9 poppins">Price (USDC)</div>
      <div className="w-full">
        <svg ref={svgRef2} />
      </div>
      <div className='md:h-[16px] h-[0px]'></div>
      <div className="">
        <div className="h-[1px] bg-black-0-1 w-full md:my-[40px] my-[24px]"></div>
        <div className="h-[48px] w-full bg-black-0-05 rounded-[12px] mb-[16px] flex items-center justify-center p-[4px]">
          <div
            onClick={() => setIsBuy(true)}
            className={`flex-1 h-full poppins text-center text-[16px] font-[500] flex items-center justify-center leading-[20px] cursor-pointer ${isBuy ? 'text-white bg-black-0-9 rounded-[10px]' : 'text-black-0-3'}`}>Buy</div>
          <div
            onClick={() => setIsBuy(false)}
            className={`flex-1 h-full poppins text-center text-[16px] font-[500] flex items-center justify-center leading-[20px] cursor-pointer ${!isBuy ? 'text-white bg-black-0-9 rounded-[10px]' : 'text-black-0-3'}`}>Sell</div>
        </div>
        <div className="flex items-center justify-between mb-[8px]">
          <div className="md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-6">
            Amount
          </div>
          <div
            onClick={() => setSlippage(true)}
            className="flex items-center md:text-[16px] text-[12px] font-[400] md:leading-[24px] leading-[14.4px] text-black-0-5 poppins cursor-pointer">
            <svg
              className="mr-[5px]"
              width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.46222 4.50195C11.8054 4.50195 14.6653 4.50195 14.6653 4.50195M2.66534 4.50195H5.16534M5.16534 4.50195C5.16534 5.60652 6.06077 6.50195 7.16534 6.50195C8.26991 6.50195 9.16534 5.60652 9.16534 4.50195C9.16534 3.39738 8.26991 2.50195 7.16534 2.50195C6.06077 2.50195 5.16534 3.39738 5.16534 4.50195ZM2.66534 11.502H7.86222M12.1653 11.502H14.6653M12.1653 11.502C12.1653 12.6066 11.2699 13.502 10.1653 13.502C9.06077 13.502 8.16534 12.6066 8.16534 11.502C8.16534 10.3974 9.06077 9.50195 10.1653 9.50195C11.2699 9.50195 12.1653 10.3974 12.1653 11.502Z" stroke="black" strokeOpacity="0.5" strokeLinecap="round" />
            </svg>
            {formatNumber(value)}% slippage
          </div>
        </div>
        <AmountInput
          value={amount}
          onChange={(value) => {
            if (isValidNumber(value)) {
              setAmount(value)
            }
          }}
        />
        <div className="pr-[12px] pt-[4px]">
          <SlideInput
            value={slideValue}
            onChange={(value) => setSlideValue(value)}
          />
        </div>
        {[
          {
            key: 'Avail. Buying Power',
            value: '0.00 USDC'
          },
          {
            key: 'Available USDC',
            value: '0.00 USDC'
          },
          {
            key: 'Available Points',
            value: '30.00 AP'
          },
          {
            key: 'Estimated Fee',
            value: '$0.00'
          },
          {
            key: 'Estimated Total',
            value: '0.00 USDC'
          },
        ].map((item, index) => <div className={`${index === 5 ? '' : 'md:mb-[16px] mb-[8px]'} flex justify-between ${index === 1 || index === 2 ? 'md:ml-[24px] ml-[12px]' : ''}`} key={index}>
          <div className={`flex-1 ${index === 4 ? 'md:text-[24px] text-[18px] md:leading-[24px] leading-[18px] font-[400]' : 'md:text-[16px] text-[12px] md:leading-[20px] leading-[18px] font-[400]'} text-black-0-3 poppins`}>{item.key}</div>
          <div className={`flex-1 ${index === 4 ? 'md:text-[24px] text-[18px] md:leading-[24px] leading-[18px] font-[400]' : 'md:text-[16px] text-[12px] md:leading-[20px] leading-[18px] font-[400]'} text-black-0-9 poppins text-right`}>{item.value}</div>
        </div>)}
        <div
          onClick={() => {
            setConfirmBuy(true)
          }}
          className="h-[48px] poppins font-[500] cursor-pointer rounded-[8px] bg-black text-white text-[18px] font-[400] text-center mt-[40px] flex items-center justify-center hover:bg-[#474747]">
          {isBuy ? 'Buy' : 'Sell'}
        </div>
      </div>
    </>
  }
  return <div className="w-full bg-white action_page">
    <Header isLogin={true} />
    <div className="w-full h-[100px] px-[20px]">
      <div className="mt-[16px] mb-[8px] flex items-center text-[18px] font-[500] leading-[27px] text-black">
        <div className="trade_desc_desc_item1 poppins">NATHM1898</div>
        <div className="trade_desc_desc_item2 mx-[8px] poppins">/</div>
        <div className="trade_desc_desc_item2 poppins">USDC</div>
      </div>
      {
        renderMain()
      }
      <div className="h-[40px]"></div>
    </div>
    {slippage && <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center transition-all duration-300 ${slippage ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
      <div
        onClick={() => {
          setSlippage(false)
        }}
        className="flex items-center justify-center absolute top-0 left-0 w-full h-full"></div>
      <div className="max-md:flex-1" />
      <div className={`bg-white md:px-[32px] px-[20px] py-[0] md:py-[32px] md:w-[480px] w-full md:rounded-[16px] rounded-t-[16px] transition-all duration-300 ${slippage ? 'scale-100' : 'scale-0'}`}>
        <div className="md:hidden flex h-[36px] items-center justify-center" onClick={() => {
          setSlippage(false)
        }}>
          <div className="w-[32px] h-[4px] bg-black-0-1 rounded-full flex items-center justify-center"></div>
        </div>
        <div className="text-[#121212] text-center md:text-[32px] text-[24px] font-[600] poppins md:leading-[48px] leading-[36px]">Max. slippage</div>
        <div className="my-[24px] flex items-center justify-between gap-[8px]">
          {
            [0.3, 0.5, 1, 100].map((item) => <div key={item} className={`flex-1 h-[88px] rounded-[8px] ${value === item ? 'bg-black text-white' : 'border-[1px] border-black-0-1 text-black-0-9 hover:opacity-80 cursor-pointer'} text-[18px] font-[400] text-center flex items-center justify-center poppins`} onClick={() => setValue(item)}>
              {item}%
            </div>)
          }
        </div>
        <div
          onClick={() => {
            setSlippage(false)
          }}
          className="h-[48px] cursor-pointer rounded-[12px] bg-black text-white text-[18px] font-[400] text-center flex items-center justify-center hover:bg-[#474747] poppins">
          Save
        </div>
        <div className="md:hidden h-[24px]"></div>
      </div>
    </div>}
    {confirmBuy && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center transition-all duration-300">
      <div
        onClick={() => {
          setConfirmBuy(false)
        }}
        className="flex items-center justify-center absolute top-0 left-0 w-full h-full"></div>
      <div className="max-md:flex-1" />
      <div className={`bg-white md:px-[32px] px-[20px] py-[0] md:py-[32px] md:w-[480px] w-full md:rounded-[16px] rounded-t-[16px] transition-all duration-300 ${confirmBuy ? 'scale-100' : 'scale-0'}`}>
        <div className="md:hidden flex h-[36px] items-center justify-center" onClick={() => {
          setConfirmBuy(false)
        }}>
          <div className="w-[32px] h-[4px] bg-black-0-1 rounded-full flex items-center justify-center"></div>
        </div>
        {
          [
            {
              key: 'Type',
              value: 'Market / Buy'
            },
            {
              key: 'Amount',
              value: '30'
            },
            {
              key: 'Cost',
              value: '1.00 USDC'
            },
            {
              key: 'Total Cost',
              value: '0.00 USDC'
            },
          ].map((item, index) => <div key={index} className="flex justify-between mb-[8px]">
            <div className="md:text-[16px] text-[14px] font-[400] text-black/30 poppins">{item.key}</div>
            <div className="md:text-[16px] text-[14px] font-[400] text-black/90 poppins">{item.value}</div>
          </div>)
        }
        {/* line */}
        <div className="h-[1px] bg-black-0-1 w-full"></div>
        <div className="md:text-[16px] text-[14px] font-[400] text-black/30 poppins md:mt-[16px] mt-[8px]">You’re placing an order to buy 3 share(s) of NATHM1898 at 1.00 price. </div>
        <div
          onClick={() => {
            setConfirmBuy(false)
            router.push('/result')
            // setToSuccessPage(true)
          }}
          className="h-[48px] cursor-pointer rounded-[8px] bg-black text-white text-[18px] font-[500] poppins text-center mt-[40px] flex items-center justify-center hover:bg-[#474747]">
          Confirm
        </div>
        <div className="md:hidden h-[24px]"></div>
      </div>
    </div>}
  </div>
}

export default ActionPage