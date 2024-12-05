'use client'

import Header from "@/components/Header"
import { useEmailSubmit } from "@/pages/landing/components/Footer"
import { useEffect, useRef, useState } from "react"
import { isValidNumber } from "@/utils"
import { AmountInput, SlideInput } from "@/components/input"
import * as d3 from "d3";
const times = ['Days', 'Hours', 'Min', 'Seconds']
const props = [
  {
    key: 'Artist',
    value: 'Henri Matisse'
  },
  {
    key: 'Creation year',
    value: '1898'
  },
  {
    key: 'Dimensions',
    value: '59 cm × 73.1 cm'
  },
  {
    key: 'Medium',
    value: 'Oil on canvas'
  }
]
const props2 = [
  {
    key: 'License type',
    value: 'All rights reserved'
  },
  {
    key: 'Certificate of provenance',
    value: 'See here'
  },
  {
    key: 'Terms of sales',
    value: 'Read more'
  },
  {
    key: 'Agreement with foundation',
    value: 'Read more'
  }
]
const Trade = () => {
  const { email, setEmail, loading, message, messageError, handleSubmit } = useEmailSubmit();
  const [showMore, setShowMore] = useState(false)
  const [showMorePrice, setShowMorePrice] = useState(false)
  const [step, setStep] = useState(2)
  // const [width] = useWindowSize()
  const [isBuy, setIsBuy] = useState(true)
  const [amount, setAmount] = useState('')
  const [slideValue, setSlideValue] = useState(0)
  // const blockWidth = (width - 160 - 140 - (2 * 63)) / 64
  const svgRef = useRef<SVGSVGElement>(null)
  const svgRef2 = useRef<SVGSVGElement>(null)
  const svgRef3 = useRef<SVGSVGElement>(null)
  const svgBoxRef3 = useRef<HTMLDivElement>(null)
  const svgRef4 = useRef<SVGSVGElement>(null)
  const svgBoxRef4 = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (svgRef.current && step === 2) {
      // 示例数据
      const data = [
        { x: 0, y: 10 },
        { x: 1, y: 20 },
        { x: 2, y: 15 },
        { x: 3, y: 25 },
        { x: 4, y: 30 },
        { x: 5, y: 50 },
      ];

      // 图表尺寸
      const width = 103;
      const height = 49;
      const margin = { top: 0, right: 0, bottom: 0, left: 0 };

      // 创建 SVG
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // 创建比例尺
      const x = d3
        .scaleLinear()
        .domain((d3 as any).extent(data, (d: any) => d.x)) // 根据数据范围自动计算
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([0, (d3 as any).max(data, (d: any) => d.y)]) // 数据最大值
        .range([height - margin.bottom, margin.top]);


      // 创建区域生成器
      const area = d3
        .area()
        .x((d: any) => x(d.x))
        .y0(height - margin.bottom) // 底部固定
        .y1((d: any) => y(d.y)); // 上方根据 y 数据绘制

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
        .attr("d", (area as any))
        .attr("fill", "url(#greenGradient)")

      // 创建折线生成器
      const line = d3
        .line()
        .x((d: any) => x(d.x))
        .y((d: any) => y(d.y));

      // 绘制折线
      svg
        .append("path")
        .datum(data)
        .attr("d", (line as any))
        .attr("fill", "none")
        .attr("stroke", "#12B76A")
        .attr("stroke-width", 2);
    }
  }, [step])
  useEffect(() => {
    if (svgRef2.current && step === 2 && showMorePrice) {
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
  }, [step, showMorePrice])
  useEffect(() => {
    if (svgRef3.current) {
      const data = [
        { date: 1996, value: 1 },
        { date: 1998, value: 1.2 },
        { date: 2000, value: 1.5 },
        { date: 2002, value: 1.8 },
        { date: 2004, value: 2 },
        { date: 2006, value: 2.5 },
        { date: 2008, value: 3 },
        { date: 2010, value: 3.5 },
        { date: 2012, value: 4 },
        { date: 2014, value: 3 },
        { date: 2016, value: 3.5 },
      ];

      // 图表尺寸
      const width = 800;
      const height = 400;
      const margin = { top: 0, right: 5, bottom: 30, left: 40 };
      // 创建比例尺
      const xScale = d3
        .scaleLinear()
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
        .select(svgRef3.current)
        .attr('viewBox', `0 0 ${width} ${height}`) // 设置视窗大小
        .attr('preserveAspectRatio', 'xMidYMid meet') // 保持纵横比
        .classed('responsive', true); // 添加类以便后续使用 CSS

      // svg.attr("width", width)
      // svg.attr("height", height);

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
              return d
            })
        )
        // .selectAll("text")
        // .style("font-size", "12px")
        // .style("color", "rgba(0, 0, 0, 0.4)")
        .call((g) => {
          g.select(".domain").attr("stroke", "rgba(0, 0, 0, 0.4)")
          g.selectAll(".tick line") // 修改刻度线样式
            // 虚线
            .attr("stroke-dasharray", "5,5")
            .attr("stroke", "rgba(0, 0, 0, 0.2)")
            .attr("stroke-width", 0.5)

          g.selectAll(".tick text") // 调整刻度文字的位置
            // .attr("dx", "-0px") // 将文字向左移动 10px
            .attr("fill", "black") // 设置文字颜色
            .attr("font-size", "14px");

          // 最后一个刻度左移 10px
          g.selectAll(".tick:last-of-type text")
            .attr("dx", "-10px")
        })
        .attr("font-size", "14px")

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
              return "$" + d + 'M'
            })
        )
        .attr("transform", `translate(${margin.left}, 0)`)
        .call((g) => {
          g.select(".domain").remove()

          g.selectAll(".tick line") // 修改刻度线样式
            .attr("stroke", "rgba(0, 0, 0, 0.2)")
            .attr("stroke-width", 0.5)
            // 虚线
            .attr("stroke-dasharray", "5,5")

          g.selectAll(".tick text") // 调整刻度文字的位置
            .attr("dx", "-10px") // 将文字向左移动 10px
            .attr("fill", "black") // 设置文字颜色
            .attr("font-size", "14px");
        }) // 移除轴线
        .attr("font-size", "14px")

      // 修改 Y 轴刻度文字的颜色
      svg
        .selectAll(".tick text") // 选择 Y 轴的刻度文字
        .attr("fill", "rgba(0, 0, 0, 0.4)"); // 设置字体颜色

      // 绘制填充区域
      // const area = d3
      //   .area()
      //   .x((d: any) => xScale(d.date))
      //   .y0(height - margin.bottom) // 起始 y 值（底部）
      //   .y1((d: any) => yScale(d.value)) // 终止 y 值（数据点的 y 值）
      //   .curve(d3.curveLinear); // 曲线类型（可改为 d3.curveMonotoneX）
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
      // .attr("fill", "url(#greenGradient)") // 填充颜色
      // .attr("d", (area as any));

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
    if (svgRef4.current) {
      const data = [
        { date: 1996, value: 3 },
        { date: 1998, value: 2.2 },
        { date: 2000, value: 2.5 },
        { date: 2002, value: 2.8 },
        { date: 2004, value: 3 },
        { date: 2006, value: 3.5 },
        { date: 2008, value: 4 },
        { date: 2010, value: 4.5 },
        { date: 2012, value: 4 },
        { date: 2014, value: 3 },
        { date: 2016, value: 3.5 },
      ];

      // 图表尺寸
      const width = 800;
      const height = 400;
      const margin = { top: 0, right: 5, bottom: 30, left: 40 };
      // 创建比例尺
      const xScale = d3
        .scaleLinear()
        .domain((d3 as any).extent(data, (d: any) => {
          return d.date
        }))
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([1, (d3 as any).max(data, (d: any) => d.value) * 1.5]) // 放大最大值以留白
        .range([height - margin.bottom, margin.top]);

      // 创建 SVG 容器
      const svg = d3
        .select(svgRef4.current)
        .attr('viewBox', `0 0 ${width} ${height}`) // 设置视窗大小
        .attr('preserveAspectRatio', 'xMidYMid meet') // 保持纵横比
        .classed('responsive', true); // 添加类以便后续使用 CSS

      // svg.attr("width", width)
      // svg.attr("height", height);

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
              return d
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
            .attr("font-size", "14px");

          // 最后一个刻度左移 10px
          g.selectAll(".tick:last-of-type text")
            .attr("dx", "-10px")
        })
        .attr("font-size", "14px")

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
              return "$" + d + 'M'
            })
        )
        .attr("transform", `translate(${margin.left}, 0)`)
        .call((g) => {
          g.select(".domain").remove()

          g.selectAll(".tick line") // 修改刻度线样式
            .attr("stroke", "rgba(0, 0, 0, 0.2)")
            .attr("stroke-width", 0.5)
            // 虚线
            .attr("stroke-dasharray", "5,5")

          g.selectAll(".tick text") // 调整刻度文字的位置
            .attr("dx", "-10px") // 将文字向左移动 10px
            .attr("fill", "black") // 设置文字颜色
            .attr("font-size", "14px");
        }) // 移除轴线
        .attr("font-size", "14px")

      // 修改 Y 轴刻度文字的颜色
      svg
        .selectAll(".tick text") // 选择 Y 轴的刻度文字
        .attr("fill", "rgba(0, 0, 0, 0.4)"); // 设置字体颜色

      // 绘制填充区域
      // const area = d3
      //   .area()
      //   .x((d: any) => xScale(d.date))
      //   .y0(height - margin.bottom) // 起始 y 值（底部）
      //   .y1((d: any) => yScale(d.value)) // 终止 y 值（数据点的 y 值）
      //   .curve(d3.curveLinear); // 曲线类型（可改为 d3.curveMonotoneX）
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
      // .attr("fill", "url(#greenGradient)") // 填充颜色
      // .attr("d", (area as any));

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
  const handleNotify = () => {
    setStep(1)
  }
  const handleBuy = () => {
    setStep(2)
  }
  const handleBuyOrSell = () => { }
  const renderMain = () => {
    switch (step) {
      case 0:
        return <div className="md:my-[50px] my-[24px]">
          <div className="flex md:text-[16px] text-[12px] font-[400] text-black-0-9 items-center poppins">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mr-[4px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.16699 7.34078H15.8337V5.25745C15.8337 5.19328 15.8069 5.13453 15.7535 5.0812C15.7001 5.02772 15.6414 5.00099 15.5772 5.00099H4.42345C4.35928 5.00099 4.30053 5.02772 4.2472 5.0812C4.19373 5.13453 4.16699 5.19328 4.16699 5.25745V7.34078ZM4.42345 17.9177C4.00248 17.9177 3.64616 17.7718 3.35449 17.4802C3.06283 17.1885 2.91699 16.8322 2.91699 16.4112V5.25745C2.91699 4.83648 3.06283 4.48016 3.35449 4.18849C3.64616 3.89682 4.00248 3.75099 4.42345 3.75099H5.5772V1.98828H6.85928V3.75099H13.1735V1.98828H14.4235V3.75099H15.5772C15.9982 3.75099 16.3545 3.89682 16.6462 4.18849C16.9378 4.48016 17.0837 4.83648 17.0837 5.25745V9.81036C16.8838 9.72273 16.6797 9.65189 16.4714 9.59786C16.263 9.54398 16.0505 9.50155 15.8337 9.47057V8.59078H4.16699V16.4112C4.16699 16.4754 4.19373 16.5341 4.2472 16.5874C4.30053 16.6409 4.35928 16.6677 4.42345 16.6677H9.84178C9.9122 16.8984 9.99741 17.1165 10.0974 17.3222C10.1973 17.5279 10.3107 17.7264 10.4378 17.9177H4.42345ZM15.1605 18.751C14.12 18.751 13.2348 18.3861 12.5051 17.6564C11.7754 16.9267 11.4105 16.0415 11.4105 15.001C11.4105 13.9604 11.7754 13.0753 12.5051 12.3456C13.2348 11.6159 14.12 11.251 15.1605 11.251C16.2012 11.251 17.0864 11.6159 17.816 12.3456C18.5457 13.0753 18.9105 13.9604 18.9105 15.001C18.9105 16.0415 18.5457 16.9267 17.816 17.6564C17.0864 18.3861 16.2012 18.751 15.1605 18.751ZM16.5485 16.9081L17.0676 16.3889L15.5293 14.8504V12.5491H14.792V15.1516L16.5485 16.9081Z" fill="black" fillOpacity="0.9" />
            </svg>
            Launching soon · Sale stars 2024-10-10 8:47 P.M.
          </div>
          <div className="flex md:mt-[16px] mt-[8px] gap-[48px] md:gap-[32px]">
            {['07', '27', '59', '20'].map((item, index) => <div key={index} className={`flex flex-col items-center`}>
              <div className="md:text-[32px] text-[24px] text-black-0-9 font-[500] md:leading-[38.4px] leading-[28.8px] poppins">{item}</div>
              <div className="md:text-[12px] text-[8px] text-black-0-9 font-[400] md:leading-[14.4px] leading-[9.6px] poppins">{times[index]}</div>
            </div>)}
          </div>
          <div
            onClick={handleNotify}
            className="h-[56px] md:flex hidden cursor-pointer rounded-[12px] bg-black text-white text-[18px] font-[400] text-center mt-[40px] items-center justify-center hover:bg-[#474747] poppins">
            Notify me on launch
          </div>
        </div>
      case 1:
        return <div className="md:my-[40px] my-[24px]">
          <div className="md:text-[24px] text-[18px] font-[500] md:leading-[28.8px] leading-[21.6px] text-black-0-9 poppins">Amount for Sale 50,000 SUI</div>
          <div className="relative bg-black-0-1 h-[11px] md:my-[16px] my-[8px]">
            <div className="h-[11px] bg-black w-[50%]"></div>
          </div>
          <div className="flex justify-between">
            <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6 poppins">Goal 100,000 SUI</div>
            <div className="flex-1"></div>
            <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6 poppins">Progress 50.5%</div>
          </div>
          <div className="flex md:mt-[24px] mt-[12px] gap-[48px]">
            {[
              {
                key: 'Backers',
                value: '144'
              },
              {
                key: 'Days to go',
                value: '18'
              }
            ].map((item, index) => <div className="flex flex-col items-center" key={index}>
              <div className="md:text-[24px] text-[18px] font-[400] md:leading-[28.8px] leading-[21.6px] text-black-0-6 poppins">{item.value}</div>
              <div className="md:text-[12px] text-[8px] font-[400] md:leading-[14.4px] leading-[9.6px] text-black-0-6 poppins">{item.key}</div>
            </div>)}
          </div>
          <div className="max-md:hidden">
            <div className="h-[1px] bg-black-0-1 w-full md:my-[40px] my-[24px]"></div>
            {/* 输入框 */}
            <div className="flex items-center md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6 mb-[8px]">
              {`Amount (`}
              <svg
                className="md:w-[20px] md:h-[20px] w-[10px] h-[10px] mx-[4px]"
                viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_3747)">
                  <path d="M10 20C15.5417 20 20 15.5417 20 10C20 4.4583 15.5417 0 10 0C4.4583 0 0 4.4583 0 10C0 15.5417 4.4583 20 10 20Z" fill="#2775CA" />
                  <path d="M12.7513 11.583C12.7513 10.1247 11.8763 9.62471 10.1263 9.41641C8.87627 9.24971 8.62627 8.91641 8.62627 8.33301C8.62627 7.74961 9.04297 7.37471 9.87627 7.37471C10.6263 7.37471 11.043 7.62471 11.2513 8.24971C11.293 8.37471 11.418 8.45801 11.543 8.45801H12.2096C12.3763 8.45801 12.5013 8.33301 12.5013 8.16641V8.12471C12.3346 7.20801 11.5846 6.49971 10.6263 6.41641V5.41641C10.6263 5.24971 10.5013 5.12471 10.293 5.08301H9.66797C9.50127 5.08301 9.37627 5.20801 9.33457 5.41641V6.37471C8.08457 6.54141 7.29297 7.37471 7.29297 8.41641C7.29297 9.79141 8.12627 10.333 9.87627 10.5414C11.043 10.7497 11.418 10.9997 11.418 11.6664C11.418 12.3331 10.8346 12.7914 10.043 12.7914C8.95957 12.7914 8.58457 12.333 8.45957 11.708C8.41797 11.5414 8.29297 11.458 8.16797 11.458H7.45957C7.29297 11.458 7.16797 11.583 7.16797 11.7497V11.7914C7.33457 12.833 8.00127 13.583 9.37627 13.7914V14.7914C9.37627 14.958 9.50127 15.083 9.70957 15.1247H10.3346C10.5013 15.1247 10.6263 14.9997 10.668 14.7914V13.7914C11.918 13.583 12.7513 12.708 12.7513 11.583Z" fill="white" />
                  <path d="M7.87581 15.9576C4.62581 14.791 2.95911 11.166 4.16751 7.95762C4.79251 6.20762 6.16751 4.87432 7.87581 4.24932C8.04251 4.16602 8.12581 4.04102 8.12581 3.83262V3.24932C8.12581 3.08262 8.04251 2.95762 7.87581 2.91602C7.83411 2.91602 7.75081 2.91602 7.70911 2.95762C3.75081 4.20762 1.58411 8.41602 2.83411 12.3743C3.58411 14.7076 5.37581 16.4993 7.70911 17.2493C7.87581 17.3326 8.04251 17.2493 8.08411 17.0826C8.12581 17.041 8.12581 16.9993 8.12581 16.916V16.3326C8.12581 16.2076 8.00081 16.041 7.87581 15.9576ZM12.2925 2.95762C12.1258 2.87432 11.9591 2.95762 11.9175 3.12432C11.8758 3.16602 11.8758 3.20762 11.8758 3.29102V3.87432C11.8758 4.04102 12.0008 4.20762 12.1258 4.29102C15.3758 5.45762 17.0425 9.08262 15.8341 12.291C15.2091 14.041 13.8341 15.3743 12.1258 15.9993C11.9591 16.0826 11.8758 16.2076 11.8758 16.416V16.9993C11.8758 17.166 11.9591 17.291 12.1258 17.3326C12.1675 17.3326 12.2508 17.3326 12.2925 17.291C16.2508 16.041 18.4175 11.8326 17.1675 7.87432C16.4175 5.49932 14.5841 3.70762 12.2925 2.95762Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_1_3747">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {`USDC)`}
            </div>
            <AmountInput
              value={'$10,385.00'}
              disabled={true}
              onChange={(value) => {
                // 只允许输入数字，'',可以带上小数点，但是小数点不能在开头和结尾
                if (isValidNumber(value)) {
                  setAmount(value)
                }
              }}
            />
            <div className="md:h-[16px] h-[8px]"></div>
            {[
              {
                key: 'Buying Power',
                value: '$188,888.00'
              },
              {
                key: 'Estimated Fee',
                value: '$0.00'
              },
              {
                key: 'Estimated Total',
                value: '$10,385.00'
              },
            ].map((item, index) => <div className={`${index === props.length - 1 ? '' : 'md:mb-[16px] mb-[8px]'} flex justify-between`} key={index}>
              <div className="flex-1 md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[18px] text-black-0-3 poppins">{item.key}</div>
              <div className="flex-1 md:text-[16px] text-[12px] text-right font-[400] md:leading-[20px] leading-[18px] text-black-0-9 poppins">{item.value}</div>
            </div>)}
          </div>
          <div
            onClick={handleBuy}
            className="h-[56px] max-md:hidden cursor-pointer rounded-[12px] bg-black text-white text-[18px] font-[400] text-center mt-[40px] flex items-center justify-center hover:bg-[#474747]">
            Buy
          </div>
        </div>
      case 2:
        return <div className="md:my-[40px] my-[24px]">
          <div className="h-[51px] mt-[16px] flex">
            <div className="flex-1">
              <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6">Price (USDC)</div>
              <div className="md:text-[20px] text-[15px] font-[500] md:leading-[30px] leading-[22.5px] text-black-0-9">100.2350</div>
            </div>
            <div className="flex-1">
              <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6">24h Change</div>
              <div className="md:text-[20px] text-[15px] font-[500] md:leading-[30px] leading-[22.5px] text-[#12B76A] flex items-center">
                <svg
                  className="mr-[4px]"
                  width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#12B76A" />
                </svg>
                1.21%</div>
            </div>
            <div className="flex-1">
              <div className="md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6">YTD Change</div>
              <div className="md:text-[20px] text-[15px] font-[500] md:leading-[30px] leading-[22.5px] text-[#12B76A] flex items-center">
                <svg
                  className="mr-[4px]"
                  width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#12B76A" />
                </svg>
                3.35%</div>
            </div>
            <div style={{ opacity: showMorePrice ? 0 : 1 }}>
              <svg ref={svgRef} />
            </div>
          </div>
          {
            showMorePrice ? <>
              <div className="md:text-[16px] text-[12px] font-[400] mt-[24px] mb-[8px] md:leading-[20px] leading-[14.4px] text-black-0-9">Price (USDC)</div>
              <div className="w-full">
                <svg ref={svgRef2} />
              </div>
              <div className='md:h-[16px] h-[0px]'></div>
            </> : null
          }
          <div className="flex items-center justify-center mt-[8px]">
            <div className="w-[21px] h-[20px] cursor-pointer" onClick={() => setShowMorePrice(!showMorePrice)}>
              <svg
                className={`text-black-0-3 ${!showMorePrice ? 'rotate-180' : ''}`}
                width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 12.5L10.5 7.5L15.5 12.5"
                  stroke='currentColor'
                  strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

          </div>
          <div className="max-md:hidden">
            <div className="h-[1px] bg-black-0-1 w-full md:my-[40px] my-[24px]"></div>
            <div className="h-[48px] w-full bg-black-0-05 rounded-[12px] mb-[16px] flex items-center justify-center p-[4px]">
              <div
                onClick={() => setIsBuy(true)}
                className={`flex-1 h-full text-center text-[16px] font-[400] flex items-center justify-center leading-[20px] cursor-pointer ${isBuy ? 'text-white bg-black-0-9 rounded-[10px]' : 'text-black-0-3'}`}>Buy</div>
              <div
                onClick={() => setIsBuy(false)}
                className={`flex-1 h-full text-center text-[16px] font-[400] flex items-center justify-center leading-[20px] cursor-pointer ${!isBuy ? 'text-white bg-black-0-9 rounded-[10px]' : 'text-black-0-3'}`}>Sell</div>
            </div>
            <div className="flex items-center md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[14.4px] text-black-0-6 mb-[8px]">
              {`Amount (`}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-[4px]">
                <g clipPath="url(#clip0_1_3747)">
                  <path d="M10 20C15.5417 20 20 15.5417 20 10C20 4.4583 15.5417 0 10 0C4.4583 0 0 4.4583 0 10C0 15.5417 4.4583 20 10 20Z" fill="#2775CA" />
                  <path d="M12.7513 11.583C12.7513 10.1247 11.8763 9.62471 10.1263 9.41641C8.87627 9.24971 8.62627 8.91641 8.62627 8.33301C8.62627 7.74961 9.04297 7.37471 9.87627 7.37471C10.6263 7.37471 11.043 7.62471 11.2513 8.24971C11.293 8.37471 11.418 8.45801 11.543 8.45801H12.2096C12.3763 8.45801 12.5013 8.33301 12.5013 8.16641V8.12471C12.3346 7.20801 11.5846 6.49971 10.6263 6.41641V5.41641C10.6263 5.24971 10.5013 5.12471 10.293 5.08301H9.66797C9.50127 5.08301 9.37627 5.20801 9.33457 5.41641V6.37471C8.08457 6.54141 7.29297 7.37471 7.29297 8.41641C7.29297 9.79141 8.12627 10.333 9.87627 10.5414C11.043 10.7497 11.418 10.9997 11.418 11.6664C11.418 12.3331 10.8346 12.7914 10.043 12.7914C8.95957 12.7914 8.58457 12.333 8.45957 11.708C8.41797 11.5414 8.29297 11.458 8.16797 11.458H7.45957C7.29297 11.458 7.16797 11.583 7.16797 11.7497V11.7914C7.33457 12.833 8.00127 13.583 9.37627 13.7914V14.7914C9.37627 14.958 9.50127 15.083 9.70957 15.1247H10.3346C10.5013 15.1247 10.6263 14.9997 10.668 14.7914V13.7914C11.918 13.583 12.7513 12.708 12.7513 11.583Z" fill="white" />
                  <path d="M7.87581 15.9576C4.62581 14.791 2.95911 11.166 4.16751 7.95762C4.79251 6.20762 6.16751 4.87432 7.87581 4.24932C8.04251 4.16602 8.12581 4.04102 8.12581 3.83262V3.24932C8.12581 3.08262 8.04251 2.95762 7.87581 2.91602C7.83411 2.91602 7.75081 2.91602 7.70911 2.95762C3.75081 4.20762 1.58411 8.41602 2.83411 12.3743C3.58411 14.7076 5.37581 16.4993 7.70911 17.2493C7.87581 17.3326 8.04251 17.2493 8.08411 17.0826C8.12581 17.041 8.12581 16.9993 8.12581 16.916V16.3326C8.12581 16.2076 8.00081 16.041 7.87581 15.9576ZM12.2925 2.95762C12.1258 2.87432 11.9591 2.95762 11.9175 3.12432C11.8758 3.16602 11.8758 3.20762 11.8758 3.29102V3.87432C11.8758 4.04102 12.0008 4.20762 12.1258 4.29102C15.3758 5.45762 17.0425 9.08262 15.8341 12.291C15.2091 14.041 13.8341 15.3743 12.1258 15.9993C11.9591 16.0826 11.8758 16.2076 11.8758 16.416V16.9993C11.8758 17.166 11.9591 17.291 12.1258 17.3326C12.1675 17.3326 12.2508 17.3326 12.2925 17.291C16.2508 16.041 18.4175 11.8326 17.1675 7.87432C16.4175 5.49932 14.5841 3.70762 12.2925 2.95762Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_1_3747">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {`USDC)`}
            </div>
            <AmountInput
              value={amount}
              onChange={(value) => {
                // 只允许输入数字，'',可以带上小数点，但是小数点不能在开头和结尾
                if (isValidNumber(value)) {
                  setAmount(value)
                }
              }}
            />
            {
              isBuy ? <div className="h-[16px]"></div> :
                <SlideInput
                  value={slideValue}
                  onChange={(value) => setSlideValue(value)}
                />
            }
            {[
              {
                key: 'Buying Power',
                value: '$188,888.00'
              },
              {
                key: 'Estimated Fee',
                value: '$0.00'
              },
              {
                key: 'Estimated Total',
                value: '$10,385.00'
              },
            ].map((item, index) => <div className={`${index === props.length - 1 ? '' : 'md:mb-[16px] mb-[4px]'} flex justify-between`} key={index}>
              <div className="flex-1 md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[18px] text-black-0-3">{item.key}</div>
              <div className="flex-1 md:text-[16px] text-[12px] text-right font-[400] md:leading-[20px] leading-[18px] text-black-0-9">{item.value}</div>
            </div>)}
            <div
              onClick={handleBuyOrSell}
              className="h-[56px] max-md:hidden cursor-pointer rounded-[12px] bg-black text-white text-[18px] font-[400] text-center mt-[40px] flex items-center justify-center hover:bg-[#474747]">
              {isBuy ? 'Buy' : 'Sell'}
            </div>
          </div>
        </div>
    }
  }
  const renderFooter = () => {
    switch (step) {
      case 0:
        return <div
          onClick={handleNotify}
          className="h-[56px] cursor-pointer flex rounded-[12px] bg-black text-white text-[18px] font-[400] text-center mt-[16px] mx-[20px] items-center justify-center active:bg-[#474747] poppins">
          Notify me on launch
        </div>
      case 1:
        return <div
          onClick={handleBuy}
          className="h-[56px] cursor-pointer flex rounded-[12px] bg-black text-white text-[18px] font-[400] text-center mt-[16px] mx-[20px] items-center justify-center active:bg-[#474747] poppins">
          Buy
        </div>
      case 2:
        return <div
          onClick={handleBuyOrSell}
          className="h-[56px] cursor-pointer flex rounded-[12px] bg-black text-white text-[18px] font-[400] text-center mt-[16px] mx-[20px] items-center justify-center active:bg-[#474747] poppins">
          {isBuy ? 'Buy' : 'Sell'}
        </div>
    }
  }
  return <div className='w-full bg-white mainPage2'>
    <Header isLogin={true} />
    <div className='block md:mt-[40px] mt-[20px]'>
      <div className='trade_page'>
        <div className='trade_page_image'>
          <img src="/trade/1.png" alt="trade_page_image" />
        </div>
        <img src="/trade/1.png" alt="trade_page_image_mobile" className="w-full md:hidden" />
        <div className='trade_page_content'>
          <div className="trade_desc_title">Nature Morte avec des Fruits</div>
          <div className="trade_desc_desc">
            <div className="trade_desc_desc_item1 poppins">NATHM1898</div>
            <div className="trade_desc_desc_item2 mx-[8px] poppins">/</div>
            <div className="trade_desc_desc_item2 poppins">USDC</div>
          </div>
          <div className="h-[1px] bg-black-0-1 w-full md:mt-[50px] mt-[24px]"></div>
          {renderMain()}
          <div className="h-[1px] bg-black-0-1 w-full md:mb-[40px] mb-[24px]"></div>
          {props.map((item, index) => <div className={`${index === props.length - 1 ? '' : 'md:mb-[16px] mb-[4px]'} flex justify-between`} key={index}>
            <div className="flex-1 md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[18px] text-left text-black-0-3 poppins">{item.key}</div>
            <div className="flex-1 md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[18px] md:text-left text-right text-black-0-9 poppins">{item.value}</div>
          </div>)}
          {
            showMore ? <>
              <div className="h-[1px] bg-black-0-1 w-full md:my-[40px] my-[24px]"></div>
              {props2.map((item, index) => <div className={`${index === props2.length - 1 ? '' : 'md:mb-[16px] mb-[4px]'} flex justify-between`} key={index}>
                <div className="flex-1 md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[18px] text-left text-black-0-3 poppins">{item.key}</div>
                <div className="flex-1 md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[18px] md:text-left text-right text-black-0-9 poppins">{item.value}</div>
              </div>)}
              <div className="md:h-[40px] h-[5px]"></div>
            </> : <div className="h-[1px] bg-black-0-1 w-full md:mt-[40px] mt-[24px]"></div>
          }
          <div className="flex items-center justify-center">
            <div
              onClick={() => setShowMore(!showMore)}
              className="p-[17px] text-black-0-3 cursor-pointer hover:text-black flex items-center md:text-[16px] text-[12px] font-[400] md:leading-[20px] leading-[18px] poppins">
              {showMore ? 'See less' : 'See more'}
              <svg
                className={`ml-[4px] md:w-[21px] md:h-[20px] w-[10px] h-[10px] ${!showMore ? 'rotate-180' : ''}`}
                viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 12.5L10.5 7.5L15.5 12.5"
                  stroke='currentColor'
                  strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className='trade_page_2'>
        <img src="/trade/2.png" alt="trade_page_image" className="w-full" />
        <div className="md:text-[60px] text-[30px] font-[400] md:mt-[120px] mt-[60px] md:mb-[60px] mb-[30px] md:leading-[80px] leading-[40px] text-black-0-9 VictorSherif">How it <span className="font-[500] VictorSherif italic">works？</span></div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-[40px]">
          <div className="md:block hidden"></div>
          {
            [
              {
                icon: <svg className="md:w-[64px] md:h-[64px] w-[45px] h-[45px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50.058 31.4114C50.4501 29.7483 51.9698 28.6342 51.9698 25.6241C51.9698 21.174 47.6038 22.4539 51.4009 14.1482C53.2416 10.1228 50.2531 8.12586 50.2531 8.12586C47.3458 5.37442 44.8997 9.17666 42.2098 9.17666C39.5199 9.17666 36.1372 7.0395 32.5676 7C28.9635 7 25.5158 9.12728 22.8259 9.12728C20.136 9.12728 17.6899 5.32504 14.7846 8.07648C14.7846 8.07648 11.7961 10.0754 13.6368 14.0988C17.4339 22.4045 13.0679 21.1266 13.0679 25.5747C13.0679 29.132 15.1889 30.0406 15.067 32.3358C14.7399 34.0996 13.1065 35.1761 13.0923 38.2949C13.072 42.745 17.4441 41.4828 13.6103 49.7727C11.7514 53.7903 14.7318 55.801 14.7318 55.801C17.6269 58.5643 20.0913 54.7719 22.7792 54.7838C25.4426 54.7956 28.8436 56.9446 32.4112 56.9999C36.0153 57.0138 39.4732 54.9003 42.161 54.9122C44.8489 54.924 47.2808 58.7361 50.1982 55.9965C50.1982 55.9965 53.1949 54.0115 51.3725 49.9781C47.6119 41.6586 51.9718 42.9544 51.9922 38.5062C52.0084 34.787 49.6964 33.9534 50.058 31.4133V31.4114Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M45 14H20V50H45V14Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>,
                title: 'We onboard the artwork',
                desc: 'We partner with renowned appraisers to verify the artwork\'s authenticity, condition, and provenance, and with custodians and insurance companies to ensure secure storage.'
              },
              {
                icon: <svg className="md:w-[64px] md:h-[64px] w-[45px] h-[45px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M54 20.7501V43.25C54 43.7775 53.7113 44.2634 53.2457 44.5197L32.7123 55.8172C32.2694 56.0609 31.7306 56.0609 31.2877 55.8172L10.7544 44.5197C10.2888 44.2634 10 43.7775 10 43.25L10 20.7501C10 20.2226 10.2888 19.7366 10.7544 19.4804L31.2877 8.18278C31.7306 7.93907 32.2694 7.93907 32.7123 8.18278L53.2457 19.4804C53.7111 19.7366 54 20.2226 54 20.7501Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M53 44L32.7199 32.1955C32.2723 31.9348 31.7277 31.9348 31.2801 32.1955L11 44" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 20.0409L31.2437 31.8045C31.6921 32.0652 32.2375 32.0652 32.6859 31.8045L53 20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 54V10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>,
                title: 'You participate in Initial Art Offerings (IAO)',
                desc: 'You subscribe to shares of the artwork tokens through our Arttoo trading platform.'
              },
              {
                icon: <svg className="md:w-[64px] md:h-[64px] w-[45px] h-[45px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="24" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M36.803 29.7573C37.6372 30.8328 38.1361 32.193 38.1361 33.6726C38.1361 35.1522 37.6221 36.554 36.766 37.6355L36.6918 37.729L36.6724 37.6105C36.6556 37.5101 36.6362 37.408 36.6134 37.3059C36.1845 35.3711 34.7874 33.7124 32.4879 32.3687C30.9349 31.4636 30.0459 30.3751 29.8125 29.1369C29.6617 28.3365 29.7738 27.5327 29.9903 26.8439C30.2069 26.1561 30.5288 25.5789 30.8026 25.232L31.6975 24.1088C31.8542 23.9116 32.1483 23.9116 32.305 24.1088L36.8039 29.7573H36.803ZM38.2178 28.635L32.2216 21.1072C32.107 20.9636 31.893 20.9636 31.7784 21.1072L25.783 28.6359L25.7636 28.661C24.6606 30.0662 24 31.853 24 33.7981C24 38.3278 27.5821 41.9999 32 41.9999C36.4179 41.9999 40 38.3278 40 33.7981C40 31.853 39.3394 30.0662 38.2364 28.661L38.217 28.6359L38.2178 28.635ZM27.218 29.7322L27.7539 29.0582L27.77 29.1828C27.7826 29.2814 27.7986 29.38 27.8171 29.4795C28.1643 31.3494 29.4038 32.9077 31.4759 34.1148C33.2774 35.1678 34.3265 36.3783 34.6282 37.7056C34.7546 38.2594 34.7765 38.8045 34.7217 39.2813L34.7183 39.3107L34.6922 39.3237C33.8791 39.7312 32.9648 39.9605 31.9992 39.9605C28.6109 39.9605 25.8639 37.1449 25.8639 33.6709C25.8639 32.1792 26.3703 30.8095 27.2163 29.7305L27.218 29.7322Z" fill="black" />
                  <circle cx="32" cy="13" r="1" fill="black" />
                  <circle cx="32" cy="51" r="1" fill="black" />
                  <circle cx="27.0822" cy="13.6474" r="1" transform="rotate(-15 27.0822 13.6474)" fill="black" />
                  <circle cx="36.9171" cy="50.3526" r="1" transform="rotate(-15 36.9171 50.3526)" fill="black" />
                  <circle cx="22.5008" cy="15.5457" r="1" transform="rotate(-30 22.5008 15.5457)" fill="black" />
                  <circle cx="41.5008" cy="48.4546" r="1" transform="rotate(-30 41.5008 48.4546)" fill="black" />
                  <circle cx="18.5656" cy="18.5652" r="1" transform="rotate(-45 18.5656 18.5652)" fill="black" />
                  <circle cx="45.4357" cy="45.4353" r="1" transform="rotate(-45 45.4357 45.4353)" fill="black" />
                  <circle cx="15.5467" cy="22.5004" r="1" transform="rotate(-60 15.5467 22.5004)" fill="black" />
                  <circle cx="48.4559" cy="41.5004" r="1" transform="rotate(-60 48.4559 41.5004)" fill="black" />
                  <circle cx="13.6486" cy="27.0826" r="1" transform="rotate(-75 13.6486 27.0826)" fill="black" />
                  <circle cx="50.3537" cy="36.9176" r="1" transform="rotate(-75 50.3537 36.9176)" fill="black" />
                  <circle cx="13.002" cy="32.0002" r="1" transform="rotate(-90 13.002 32.0002)" fill="black" />
                  <circle cx="51.002" cy="32.0002" r="1" transform="rotate(-90 51.002 32.0002)" fill="black" />
                  <circle cx="13.6495" cy="36.9173" r="1" transform="rotate(-105 13.6495 36.9173)" fill="black" />
                  <circle cx="50.3546" cy="27.0823" r="1" transform="rotate(-105 50.3546 27.0823)" fill="black" />
                  <circle cx="15.5467" cy="41.4991" r="1" transform="rotate(-120 15.5467 41.4991)" fill="black" />
                  <circle cx="48.4559" cy="22.4991" r="1" transform="rotate(-120 48.4559 22.4991)" fill="black" />
                  <circle cx="18.5664" cy="45.4339" r="1" transform="rotate(-135 18.5664 45.4339)" fill="black" />
                  <circle cx="45.4365" cy="18.5639" r="1" transform="rotate(-135 45.4365 18.5639)" fill="black" />
                  <circle cx="22.5012" cy="48.4537" r="1" transform="rotate(-150 22.5012 48.4537)" fill="black" />
                  <circle cx="41.5012" cy="15.5447" r="1" transform="rotate(-150 41.5012 15.5447)" fill="black" />
                  <circle cx="27.0839" cy="50.3512" r="1" transform="rotate(-165 27.0839 50.3512)" fill="black" />
                  <circle cx="36.9189" cy="13.646" r="1" transform="rotate(-165 36.9189 13.646)" fill="black" />
                </svg>,
                title: 'We tokenize the artwork',
                desc: 'We mint a limited number of tokens on the Sui network, each representing a fractional share of the artwork. After minting, the treasury cap will be revoked.'
              },
              {
                icon: <svg className="md:w-[64px] md:h-[64px] w-[45px] h-[45px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.333 42.6667V37.3334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 56V50.6666" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M50.667 34.6667V29.3334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.333 21.3333V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 34.6667V29.3334" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M50.667 13.3333V8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.6667 22.9334V35.7334C18.6667 36.6171 17.9503 37.3334 17.0667 37.3334H9.6C8.71635 37.3334 8 36.6171 8 35.7334V22.9334C8 22.0497 8.71635 21.3334 9.6 21.3334H17.0667C17.9503 21.3334 18.6667 22.0497 18.6667 22.9334Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M37.3337 36.2666V49.0666C37.3337 49.9504 36.6174 50.6666 35.7337 50.6666H28.267C27.3833 50.6666 26.667 49.9504 26.667 49.0666V36.2666C26.667 35.3829 27.3833 34.6666 28.267 34.6666H35.7337C36.6174 34.6666 37.3337 35.3829 37.3337 36.2666Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M55.9997 14.9334V27.7334C55.9997 28.6171 55.2834 29.3334 54.3997 29.3334H46.933C46.0493 29.3334 45.333 28.6171 45.333 27.7334V14.9334C45.333 14.0497 46.0493 13.3334 46.933 13.3334H54.3997C55.2834 13.3334 55.9997 14.0497 55.9997 14.9334Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>,
                title: 'You trade tokens and access DeFi features',
                desc: `You trade artwork tokens on Arttoo's AMM-based trading platform. Our platform offers a complete DeFi ecosystem where you can provide liquidity, stake tokens, access lending features, and explore more innovative financial opportunities powered by our DeFi partners – all in one place.`
              },
            ].map((item, index) => (
              <div key={index} className="md:block flex">
                {item.icon}
                <div className="block flex-1 md:mt-[24px] ml-[12px] md:ml-0">
                  <div className="md:text-[20px] text-[15px] font-[500] md:leading-[32px] leading-[24px] text-black-0-9 VictorSherif ">{item.title}</div>
                  <div className="md:text-[16px] text-[12px] font-[400] md:leading-[25.6px] leading-[19.2px] text-black-0-6 md:mt-[16px] mt-[8px] VictorSherif ">{item.desc}</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="h-[1px] bg-black-0-1 w-full md:my-[120px] my-[60px]"></div>
        <div className="flex flex-col md:flex-row md:mb-[60px] mb-[30px]">
          <div>
            <div className="md:text-[60px] text-[30px] font-[400] md:leading-[80px] leading-[40px] text-black-0-9 VictorSherif">Valuation <span className="VictorSherif font-[500] italic">analytics</span></div>
            <div className="md:text-[16px] text-[12px] font-[400] md:leading-[25.6px] leading-[19.2px] text-black-0-6 VictorSherif">Nature Morte avec des Fruits</div>
          </div>
          <div className="flex-1 flex md:justify-end md:items-end mt-[30px] md:mt-0 gap-[40px]">
            <div className="md:min-w-[260px] max-md:flex-1">
              <div className="text-black-0-9 font-[400] md:leading-[38.4px] leading-[24px] md:text-[32px] text-[20px]">$1,734,000</div>
              <div className="md:text-[16px] text-[12px] font-[500] md:leading-[25.6px] leading-[19.2px] text-black-0-6 md:mt-[8px] mt-[4px] VictorSherif">Initial Offering Price</div>
            </div>
            <div className="md:min-w-[260px] max-md:flex-1">
              <div className="text-[#12B76A] font-[400] md:leading-[38.4px] leading-[24px] md:text-[32px] text-[20px] flex items-center">
                <svg
                  className="mr-[8px] w-[12px] h-[9px]"
                  viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#12B76A" />
                </svg>
                16%
              </div>
              <div className="md:text-[16px] text-[12px] font-[500] md:leading-[25.6px] leading-[19.2px] text-black-0-6 md:mt-[8px] mt-[4px] VictorSherif">Annual Growth of Record Price</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row xl:gap-[120px] md:gap-[60px]">
          <div className="flex-1 h-full">
            <div className="md:text-[20px] text-[12px] font-[500] md:leading-[32px] leading-[18px] text-black-0-9 VictorSherif">Price vs Date Scatter Plot</div>
            <div className="w-full md:mt-[16px] mt-[8px]" ref={svgBoxRef3}>
              <svg ref={svgRef3}></svg>
            </div>
          </div>
          <div className="flex-1 h-full mt-[30px] md:mt-0">
            <div className="md:text-[20px] text-[12px] font-[500] md:leading-[32px] leading-[18px] text-black-0-9 VictorSherif">Record High Prices Over Time</div>
            <div className="w-full md:mt-[16px] mt-[8px]" ref={svgBoxRef4}>
              <svg ref={svgRef4}></svg>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-black-0-1 w-full md:my-[120px] my-[60px]"></div>
        <div className="flex flex-col md:flex-row md:mb-[60px] mb-[30px]">
          <div>
            <div className="md:text-[60px] text-[30px] font-[400] md:leading-[80px] leading-[40px] text-black-0-9 VictorSherif">Similar <span className="VictorSherif font-[500] italic">artworks</span></div>
            <div className="md:text-[16px] text-[12px] font-[400] md:leading-[25.6px] leading-[19.2px] text-black-0-6 VictorSherif">Henri Matisse</div>
          </div>
          <div className="flex-1 flex md:justify-end md:items-end max-md:grid max-md:grid-cols-2 max-md:gap-x-[20px] max-md:gap-y-[10px] max-md:mt-[10px]">
            {
              [
                { num: '168', desc: 'Lots Sold (Annual)' },
                { num: '82.7%', desc: 'Sell-through rate' },
                { num: '$235K', desc: 'Sale price' },
                { num: '36%', desc: 'Price over estimate' },
              ].map((item, index) => (
                <div key={index} className="md:min-w-[214px]">
                  <div className="text-black-0-9 font-[400] md:leading-[38.4px] leading-[24px] md:text-[32px] text-[20px]">{item.num}</div>
                  <div className="md:text-[16px] text-[12px] font-[500] md:leading-[25.6px] leading-[19.2px] text-black-0-6 md:mt-[8px] mt-[4px] VictorSherif">{item.desc}</div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-[20px]">
          {
            [
              {
                title: 'Mademoiselle Matisse en manteau écossais',
                desc: '1918 , Oil on canvas , 73.3 x 54.9 cm',
                price: 'US$9,035,000',
                lastSale: `Last sale at Christie's`,
                time: '2023/5/11',
                img: '/trade/image101.jpg'
              },
              {
                title: 'Mademoiselle Matisse en manteau écossais',
                desc: '1923 ,  Oil on canvas , 100.3 x 81.2 cm',
                price: 'US$9,035,000',
                lastSale: `Last sale at Sotheby's`,
                time: '2022/5/17',
                img: '/trade/image102.jpg'
              },
              {
                title: 'Mademoiselle Matisse en manteau écossais',
                desc: '1869-1954 , Oil on canvas , 60 x 50 cm',
                price: 'US$9,035,000',
                lastSale: `Last sale at Christie's`,
                time: '2023/5/11',
                img: '/trade/image103.jpg'
              },
            ].map((item, index) => <div className="flex gap-4" key={index}>
              <div className="max-md:flex">
                <img src={item.img} alt={item.title} className="md:h-[320px] h-[134px]" />
                <div className="max-md:flex-1 md:mt-[40px] max-md:ml-[20px]">
                  <div className="md:text-[20px] text-[15px] font-[500] md:leading-[32px] leading-[24px] text-black-0-9 VictorSherif">{item.title}</div>
                  <div className="md:text-[16px] text-[12px] font-[400] md:leading-[25.6px] leading-[19.2px] text-black-0-6 VictorSherif md:mt-[4px] mt-[2px]">{item.desc}</div>
                  <div className="md:text-[24px] text-[18px] font-[500] md:leading-[38.4px] leading-[28.8px] text-black-0-9 VictorSherif md:mt-[16px] mt-[8px]">{item.price}</div>
                  <div className="max-md:flex md:mt-[4px] mt-[8px]">
                    <div className="md:text-[16px] text-[12px] font-[400] md:leading-[25.6px] leading-[19.2px] text-black-0-6 VictorSherif">{item.lastSale}</div>
                    <div className="md:text-[16px] text-[12px] font-[400] md:leading-[25.6px] leading-[19.2px] text-black-0-6 VictorSherif md:mt-[4px] mt-[0px] md:ml-[0px] ml-[10px]">{item.time}</div>
                  </div>
                </div>
              </div>
            </div>)
          }
        </div>
        <div className="h-[1px] bg-black-0-1 w-full md:my-[120px] my-[60px]"></div>
        {/* about Henri Matisse PC */}
        <div className="md:flex hidden">
          <div className="flex-1 mr-[80px]">
            <div className="text-[60px] font-[400] leading-[80px] text-black-0-9 VictorSherif">About <span className="font-[500] VictorSherif italic">Henri Matisse</span></div>
            <div className="mt-[104px]">
              <div className="w-[409px] h-[222px] bg-[#D9D9D9]">
                <img src="/trade/trade_1.jpg" alt="Henri Matisse" className="w-full h-full object-cover" />
              </div>
              <div className="text-[32px] mt-[132px] text-right font-[500] leading-[38.4px] text-black-0-9 VictorSherif">The Lower East Side Gets a New Gallery.</div>
              <div className="text-[20px] ml-[100px] mt-[122px] font-[400] leading-[32px] text-black-0-9 VictorSherif">Matisse was no timid artist. He was a bold, brazen revolutionary who dared to defy the rules of art. With his Fauvist comrades, he unleashed a riot of color onto the canvas, shocking the art world with his audacious brushstrokes and disregard for traditional representation. But Matisse was no one-trick pony. He was a shape-shifter, constantly exploring new avenues of artistic expression. From the vibrant intensity of his early works to the serene, almost ethereal beauty of his later cut-outs, Matisse was a master of reinvention. </div>
            </div>
          </div>
          <div className="w-[560px] pt-[25px]">
            <div className="text-[48px] font-[400] leading-[60px] text-black-0-9 VictorSherif">Since</div>
            <div className="text-[48px] font-[500] italic leading-[60px] text-black-0-9 VictorSherif">1869-1954</div>
            <div className="text-[20px] mt-[80px] font-[400] leading-[32px] text-black-0-9 VictorSherif">Born into a world of law and order, Henri Matisse was destined for a life of contracts and courtrooms. But fate, in the form of a nasty bout of appendicitis, had other plans. Bedridden and bored, he picked up a paintbrush, and in that moment, a legal career was unceremoniously dumped for a life of color and chaos.</div>
            <div className="w-full h-[448px] bg-[#D9D9D9] mt-[195px]">
              <img src="/trade/trade_2.jpg" alt="Henri Matisse" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        {/* about Henri Matisse mobile */}
        <div className="md:hidden">
          <div className="text-[30px] font-[400] leading-[40px] text-black-0-9 VictorSherif">About <span className="font-[500] VictorSherif italic">Henri Matisse</span></div>
          <img src="/trade/trade_1.jpg" alt="Henri Matisse" className="w-full h-full object-cover mt-[30px]" />
          <div className="text-[20px] mt-[20px] font-[400] leading-[32px] text-black-0-9 VictorSherif">Since</div>
          <div className="text-[20px] font-[500] italic leading-[32px] text-black-0-9 VictorSherif">1869-1954</div>
          <div className="text-[15px] mt-[20px] font-[400] leading-[24px] text-black-0-9 VictorSherif">Born into a world of law and order, Henri Matisse was destined for a life of contracts and courtrooms. But fate, in the form of a nasty bout of appendicitis, had other plans. Bedridden and bored, he picked up a paintbrush, and in that moment, a legal career was unceremoniously dumped for a life of color and chaos.</div>
          <div className="text-[20px] mt-[20px] font-[500] leading-[38.4px] text-black-0-9 VictorSherif">The Lower East Side Gets a New Gallery.</div>
          <div className="text-[15px] mt-[20px] font-[400] leading-[24px] text-black-0-9 VictorSherif">Matisse was no timid artist. He was a bold, brazen revolutionary who dared to defy the rules of art. With his Fauvist comrades, he unleashed a riot of color onto the canvas, shocking the art world with his audacious brushstrokes and disregard for traditional representation. But Matisse was no one-trick pony. He was a shape-shifter, constantly exploring new avenues of artistic expression. From the vibrant intensity of his early works to the serene, almost ethereal beauty of his later cut-outs, Matisse was a master of reinvention. </div>
          <img src="/trade/trade_2.jpg" alt="Henri Matisse" className="w-full h-full mt-[20px] object-cover" />
          {/* <div className="flex-1 mr-[80px]">
            <div className="mt-[104px]">
              <div className="w-[409px] h-[222px] bg-[#D9D9D9]">
                <img src="/trade/trade_1.jpg" alt="Henri Matisse" className="w-full h-full object-cover" />
              </div>
              <div className="text-[32px] mt-[132px] text-right font-[400] leading-[38.4px] text-black-0-9 VictorSherif">The Lower East Side Gets a New Gallery.</div>
              <div className="text-[20px] ml-[100px] mt-[122px] font-[400] leading-[32px] text-black-0-9 VictorSherif">Matisse was no timid artist. He was a bold, brazen revolutionary who dared to defy the rules of art. With his Fauvist comrades, he unleashed a riot of color onto the canvas, shocking the art world with his audacious brushstrokes and disregard for traditional representation. But Matisse was no one-trick pony. He was a shape-shifter, constantly exploring new avenues of artistic expression. From the vibrant intensity of his early works to the serene, almost ethereal beauty of his later cut-outs, Matisse was a master of reinvention. </div>
            </div>
          </div>
          <div className="w-[560px] pt-[25px]">
            <div className="text-[48px] font-[400] leading-[60px] text-black-0-9 VictorSherif">Since</div>
            <div className="text-[48px] font-[500] italic leading-[60px] text-black-0-9 VictorSherif">1869-1954</div>
            <div className="text-[20px] mt-[80px] font-[400] leading-[32px] text-black-0-9 VictorSherif">Born into a world of law and order, Henri Matisse was destined for a life of contracts and courtrooms. But fate, in the form of a nasty bout of appendicitis, had other plans. Bedridden and bored, he picked up a paintbrush, and in that moment, a legal career was unceremoniously dumped for a life of color and chaos.</div>
            <div className="w-full h-[448px] bg-[#D9D9D9] mt-[195px]">
              <img src="/trade/trade_2.jpg" alt="Henri Matisse" className="w-full h-full object-cover" />
            </div>
          </div> */}
        </div>
        {/* artist career  */}
        {/* <div className="h-[1px] bg-black-0-1 w-full md:my-[120px] my-[60px] max-md:hidden"></div>
        <div className="md:block hidden text-[60px] font-[400] mb-[60px] leading-[80px] text-black-0-9 VictorSherif">Artist Career <span className="font-[500] VictorSherif italic">Path</span></div> */}
        {/*  */}
        {/* <div className="md:block hidden">
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Other -
            </div>
            <div className="flex-1 flex items-center">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index === 50 ? 'bg-green-0-1' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Textiles -
            </div>
            <div className="flex-1 flex items-center">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index === 20 ? 'bg-green-0-5' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Ceramics -
            </div>
            <div className="flex-1 flex items-center">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index > 10 && index < 20 ? 'bg-green-0-7' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Sculpture -
            </div>
            <div className="flex-1 flex items-center flex-shrink-0">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index > 30 && index < 80 ? 'bg-green-0-2' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Photographs -
            </div>
            <div className="flex-1 flex items-center flex-shrink-0">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index > 30 && index < 80 ? 'bg-green-0-2' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Prints & Multiples -
            </div>
            <div className="flex-1 flex items-center flex-shrink-0">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index > 30 && index < 80 ? 'bg-green-0-2' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Works on Paper -
            </div>
            <div className="flex-1 flex items-center flex-shrink-0">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index > 30 && index < 80 ? 'bg-green-0-2' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[120px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
              Paintings -
            </div>
            <div className="flex-1 flex items-center flex-shrink-0">
              {Array.from({ length: 64 }).map((_, index) => <div key={index} className={`${index === 9 ? 'bg-green-0-2' : 'bg-black-0-02'}`} style={{
                width: `${blockWidth}px`,
                height: `${blockWidth}px`,
                marginLeft: `${index === 0 ? 0 : 2}px`
              }}></div>)}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[112px] mr-[20px] text-right text-black-0-6 VictorSherif text-[14px] font-[400] flex items-center justify-end">
            </div>
            <div className="flex-1 flex items-center flex-shrink-0">
              <div
                className="text-[14px] font-[400] leading-[25.6px] text-black-0-6 VictorSherif"
                style={{ width: `${blockWidth * 10 + 2 * 9}px`, marginLeft: `${2}px` }}>
                1889
              </div>
              <div
                className="text-[14px] font-[400] leading-[25.6px] text-black-0-6 VictorSherif"
                style={{ width: `${blockWidth * 10 + 2 * 9}px`, marginLeft: `${2}px` }}>
                1900
              </div>
              <div
                className="text-[14px] font-[400] leading-[25.6px] text-black-0-6 VictorSherif"
                style={{ width: `${blockWidth * 10 + 2 * 9}px`, marginLeft: `${2}px` }}>
                1910
              </div>
              <div
                className="text-[14px] font-[400] leading-[25.6px] text-black-0-6 VictorSherif"
                style={{ width: `${blockWidth * 10 + 2 * 9}px`, marginLeft: `${2}px` }}>
                1920
              </div>
              <div
                className="text-[14px] font-[400] leading-[25.6px] text-black-0-6 VictorSherif"
                style={{ width: `${blockWidth * 10 + 2 * 9}px`, marginLeft: `${2}px` }}>
                1930
              </div>
              <div
                className="text-[14px] font-[400] leading-[25.6px] text-black-0-6 VictorSherif"
                style={{ width: `${blockWidth * 10 + 2 * 9}px`, marginLeft: `${2}px` }}>
                1940
              </div>
              <div
                className="text-[14px] font-[400] leading-[25.6px] text-black-0-6 VictorSherif">
                1950
              </div>
            </div>
          </div>
        </div> */}
        <div className="h-[1px] bg-black-0-1 w-full md:my-[120px] my-[60px]"></div>
        <div className="flex md:mb-[60px] mb-[30px] items-center">
          <div className="md:text-[60px] text-[30px] font-[400] md:leading-[80px] leading-[36px] text-black-0-9 VictorSherif">Relevant <span className="font-[500] VictorSherif italic">News</span></div>
          <div className="flex-1"></div>
          <div className="max-md:hidden w-[48px] h-[48px] flex items-center justify-center bg-black-0-05 rounded-full hover:bg-[#ccc] cursor-pointer mr-[32px]">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2352 17.1975L2.03772 9L10.2352 0.802451" stroke="black" strokeWidth="1.49999" />
              <path d="M21.9619 9.0332H2.10513" stroke="black" strokeWidth="1.49999" />
            </svg>
          </div>
          <div className="max-md:hidden w-[48px] h-[48px] flex items-center justify-center bg-black-0-05 rounded-full hover:bg-[#ccc] cursor-pointer rotate-180">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2352 17.1975L2.03772 9L10.2352 0.802451" stroke="black" strokeWidth="1.49999" />
              <path d="M21.9619 9.0332H2.10513" stroke="black" strokeWidth="1.49999" />
            </svg>
          </div>
        </div>
        <div className="md:gap-[80px] gap-[40px] grid md:grid-cols-2 grid-cols-1">
          {
            [
              {
                time: "November",
                time2: "26th, 2024",
                img: '/trade/news2.jpg',
                title: 'The Lower East Side Gets a New Gallery. But Don’t Expect a White Cube',
                desc: `You trade artwork tokens on Arttoo's AMM-based trading platform. Our platform offers a complete DeFi ecosystem where you can provide liquidity, stake tokens, access lending features, and explore more innovative financial opportunities powered by our DeFi partners – all in one place.`,
              },
              {
                time: "November",
                time2: "26th, 2024",
                img: '/trade/news1.jpg',
                title: 'The Lower East Side Gets a New Gallery. But Don’t Expect a White Cube',
                desc: `You trade artwork tokens on Arttoo's AMM-based trading platform. Our platform offers a complete DeFi ecosystem where you can provide liquidity, stake tokens, access lending features, and explore more innovative financial opportunities powered by our DeFi partners – all in one place.`,
              },
            ].map((item, index) => <div key={index} className="flex">
              <div className="md:mr-[20px] mr-[10px]">
                <div className="md:text-[20px] text-[12px] font-[500] md:leading-[32px] leading-[20px] italic text-black-0-9 VictorSherif">{item.time}</div>
                <div className="md:text-[20px] text-[12px] font-[500] md:leading-[32px] leading-[20px] italic text-black-0-9 VictorSherif">{item.time2}</div>
              </div>

              <div className="flex-1">
                <div className="w-full md:h-[220px] h-[110px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="md:text-[20px] text-[12px] font-[500] md:leading-[32px] leading-[20px] text-black-0-9 VictorSherif md:mt-[24px] mt-[12px]">{item.title}</div>
                <div className="md:text-[16px] text-[12px] font-[400] md:leading-[25.6px] leading-[16px] text-black-0-6 VictorSherif md:mt-[24px] mt-[12px]">{item.desc}</div>
                <div className="flex items-center md:text-[20px] text-[10px] font-[500] md:leading-[32px] leading-[16px] text-black-0-9 VictorSherif md:mt-[60px] mt-[30px] hover:underline cursor-pointer">
                  See More
                  <svg
                    className="mt-[2px] md:ml-[4px] ml-[2px] md:w-[10px] md:h-[10px] w-[6px] h-[6px]"
                    viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1V13H1" stroke="black" strokeLinejoin="round" />
                    <path d="M13 1V13L1 1" stroke="black" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>)
          }
        </div>
        <div className="h-[1px] bg-black-0-1 w-full mb-[240px] mt-[40px]"></div>
      </div>
      <div className="bg-black w-full relative">
        <div className="mx-auto py-16 md:px-[80px] px-[20px]">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            <div className="flex flex-col gap-8">
              <h3
                className="text-white VictorSherif text-[30px] sm:text-[44px] lg:text-[60px] leading-[39.3px] sm:leading-[51.23px] lg:leading-[78.6px] font-medium ">
                Ready to Own <span className="italic VictorSherif">Your Piece of History?</span></h3>
              <div className="flex gap-2 flex-col font-poppins">
                <form className='border border-white rounded-full p-1 max-w-[400px] w-full flex' onSubmit={handleSubmit}>
                  <input
                    type='text'
                    className='focus:outline-none bg-transparent px-4 py-2 w-full text-white VictorSherif'
                    placeholder='johndoe@gmail.com'
                    id='email'
                    value={email}
                    onChange={setEmail}
                    disabled={loading}
                  />
                  <button disabled={loading} className='bg-white px-4 py-2 rounded-full text-black'>
                    Submit
                  </button>
                </form>
                <p className="text-white text-[11.5px] lg:text-base leading-[19.2px] font-light VictorSherif">Join the Waitlist & Get Informed when New Artworks are Available!</p>
                {message && <p className='text-green-600 VictorSherif text-sm'>{message}</p>}
                {messageError && <p className='text-red-600 VictorSherif text-sm'>{messageError}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-4 min-w-48">
              <p className="text-2xl text-white leading-[19.2px] font-light VictorSherif">Follow us on</p>
              <div className="inline-flex gap-2"><a href="https://x.com/arttoo_official" target="_blank"><svg className="h6 w-6"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="#fff"
                  d="M5.92 6l14.662 21.375L6.23 44h3.18l12.576-14.578 10 14.578H44L28.682 21.67 42.199 6h-3.17L27.275 19.617 17.934 6H5.92zm3.797 2h7.164l23.322 34H33.04L9.717 8z">
                </path>
              </svg></a><a href="https://t.me/arttoonetwork" target="_blank"><svg className="h6 w-6"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <path fill="#fff"
                  d="M25.154 3.984a2.718 2.718 0 00-.894.217c-.25.1-1.204.51-2.707 1.154-1.505.646-3.497 1.5-5.621 2.415-4.25 1.827-9.028 3.884-11.475 4.937-.092.04-.413.142-.754.408-.34.266-.703.818-.703 1.432 0 .495.236.987.533 1.281.297.294.612.44.881.549l4.58 1.873c.202.617 1.298 3.973 1.553 4.795.168.543.327.883.535 1.152.104.135.225.253.371.346.059.037.123.066.188.092l.004.002c.014.006.027.016.043.021.028.01.047.011.085.02.153.049.307.08.444.08.585 0 .943-.322.943-.322l.022-.016 3.01-2.604 3.65 3.454c.051.072.53.73 1.588.73.627 0 1.125-.315 1.445-.65.32-.336.519-.688.604-1.131v-.002c.079-.419 3.443-17.69 3.443-17.69l-.006.024c.098-.45.124-.868.016-1.281a1.748 1.748 0 00-.75-1.022 1.798 1.798 0 00-1.028-.264zm-.187 2.09c-.005.03.003.015-.004.049l-.002.012-.002.011s-3.323 17.05-3.445 17.7c.009-.05-.032.048-.075.107-.06-.04-.181-.094-.181-.094l-.02-.021-4.986-4.717-3.525 3.047 1.048-4.2s6.557-6.786 6.952-7.18c.318-.317.384-.427.384-.536 0-.146-.076-.252-.246-.252-.153 0-.359.149-.469.219-1.433.913-7.724 4.58-10.544 6.22-.449-.183-3.562-1.458-4.618-1.888l.014-.006 11.473-4.938 5.62-2.414c1.48-.634 2.51-1.071 2.626-1.119z">
                </path>
              </svg></a></div>
            </div>
          </div>
        </div>
        <div className="trade-footer-fixed"></div>
      </div>
    </div>

    <div className="trade-footer">
      {
        renderFooter()
      }
    </div>
  </div >
}

export default Trade