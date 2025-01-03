/* eslint-disable react/no-unescaped-entities */
'use client';
import { Axa, Dietl, Gurrjohns, Momart } from '@/assets/images';
import { useEffect, useRef, useState } from "react"
import Script from 'next/script';
import Image from 'next/image';
import './index.css'
import { imgs } from '@/assets/images/action';
import { useEmailSubmit } from './components/Footer';
const LandingPage = () => {
  const { email, setEmail, loading, message, messageError, handleSubmit } = useEmailSubmit();
  // const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [step3, setStep3] = useState(-1)
  const [hover, setHover] = useState(false)
  // const [h, setH] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const step1BoxRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const isFirstTouch = useRef(true)
  const sec2TitleRef = useRef<HTMLHeadingElement>(null)
  const sec2DescRef = useRef<HTMLParagraphElement>(null)

  const sec4TitleRef = useRef<HTMLHeadingElement>(null)
  const sec4Box1Ref = useRef<HTMLDivElement>(null)
  const sec4Box2Ref = useRef<HTMLDivElement>(null)
  const sec4Box3Ref = useRef<HTMLDivElement>(null)
  const stepTextRef = useRef<HTMLDivElement>(null)
  const videoBoxRef = useRef<HTMLDivElement>(null)
  const sec2BoxRef = useRef<HTMLDivElement>(null)
  const windowHeightRef = useRef(0)
  // const videoElementRef = useRef<HTMLVideoElement>(null)
  const isInit = useRef(false)
  useEffect(() => {
    windowHeightRef.current = window.innerHeight
    if (isInit.current) return
    isInit.current = true
    if (isFirstTouch.current) {
      window.addEventListener('click', () => {
        isFirstTouch.current = false
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        if (isMobile) {
          videoRef.current?.play()
        }
        window.removeEventListener('click', () => { })
      })
    }
    init()
    setCanvasSize()
    initCanvas()
    //  window resize 重新设置 canvas
    window.addEventListener('resize', () => {
      const isMd = window.innerWidth > 768
      const fixH = windowHeightRef.current
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop >= fixH * 3 + sec2BoxRef.current!.clientHeight - (isMd ? 300 : 0)) {
        // 跟随滚动
        const y = - (scrollRef.current?.scrollTop - fixH * 3 - sec2BoxRef.current!.clientHeight + (isMd ? 300 : 0))
        // if (y > 0) y = 0
        // if (scale < 0.1 || scale < 0) scale = 0
        // console.log('scale ', scale)
        canvasRef.current!.style.transform = `translateY(${y}px)`
        canvasRef.current!.style.webkitTransform = `translateY(${y}px)`

        // stepTextRef
        stepTextRef.current!.style.transform = `translateY(${y}px)`
        stepTextRef.current!.style.webkitTransform = `translateY(${y}px)`
      }
    })
    // console.log(1)
  }, [])
  const init = async () => {
    scrollRef.current?.addEventListener('scroll', () => {
      // const windowHeight = windowHeightRef.current
      const windowHeight = window.innerHeight
      // 离开第一屏则 videoBoxRef 透明度设置成 0 
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop > windowHeight) {
        // 不可见
        videoBoxRef.current!.style.visibility = 'hidden'
      }
      else {
        videoBoxRef.current!.style.visibility = 'visible'
      }
      // section 2 标题和描述 从 0.6 * windowHeight 到 windowHeight  之间, 逐渐显示
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop >= 0.1 * windowHeight) {
        if (!sec2TitleRef.current?.classList.contains('move-up-and-fade-in')) {
          sec2TitleRef.current?.classList.remove('move-up-and-fade-out')
          sec2DescRef.current?.classList.remove('move-up-and-fade-out')
          sec2TitleRef.current?.classList.add('move-up-and-fade-in')
          sec2DescRef.current?.classList.add('move-up-and-fade-in')
        }
      }
      else {
        if (sec2TitleRef.current?.classList.contains('move-up-and-fade-in')) {
          sec2TitleRef.current?.classList.remove('move-up-and-fade-in')
          sec2DescRef.current?.classList.remove('move-up-and-fade-in')
          sec2TitleRef.current?.classList.add('move-up-and-fade-out')
          sec2DescRef.current?.classList.add('move-up-and-fade-out')
        }
      }
      // header,  大于 windowHeight - headerRef.current?.clientHeight
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop >= windowHeight) setStep(1)
      else setStep(0)
      // section 1, 背景逐渐变黑 rgba(0,0,0,0.0) ~ rgba(0,0,0,0.8)
      if (scrollRef.current?.scrollTop) {
        let step1BoxOpacity = scrollRef.current?.scrollTop / windowHeight
        if (step1BoxOpacity > 0.8) step1BoxOpacity = 0.8
        step1BoxRef.current!.style.backgroundColor = `rgba(0,0,0,${step1BoxOpacity})`
      }
      // section 1 的底部圆形按钮
      if (scrollRef.current?.scrollTop && (scrollRef.current?.scrollTop > 0 || scrollRef.current?.scrollTop < windowHeight)) {
        circleRef.current!.style.transform = `translateY(${scrollRef.current?.scrollTop}px)`
      }
      else {
        circleRef.current!.style.transform = `translateY(0)`
      }
      //  VIDEO1 
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop > windowHeight) {
        if (videoRef.current?.play) videoRef.current?.pause()
      }
      else {
        if (videoRef.current?.pause) videoRef.current?.play()
      }
      //  VIDEO2
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop > windowHeight * 0.6) {
        if (video2Ref.current?.pause) video2Ref.current?.play()
      }
      else {
        if (video2Ref.current?.play) video2Ref.current?.pause()
      }

      // step3
      if (scrollRef.current?.scrollTop && (scrollRef.current?.scrollTop > 0.6 * windowHeight + sec2BoxRef.current!.clientHeight && scrollRef.current?.scrollTop < windowHeight * 1.5 + sec2BoxRef.current!.clientHeight)) {
        setStep3(0)
      }
      // 3 ~ 4
      else if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop > windowHeight * 1.5 + sec2BoxRef.current!.clientHeight && scrollRef.current?.scrollTop < windowHeight * 2.5 + sec2BoxRef.current!.clientHeight) {
        setStep3(1)
      }
      // 4 
      else if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop >= windowHeight * 2.5 + sec2BoxRef.current!.clientHeight) {
        setStep3(2)
      }
      else {
        setStep3(-1)
      }

      // 4 ~ 4.5 之间 ，把 canvas 的 缩小到 0
      const isMd = window.innerWidth > 768
      // const fixH = windowHeightRef.current
      const fixH = windowHeight
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop >= fixH * 3 + sec2BoxRef.current!.clientHeight - (isMd ? 300 : 0)) {
        // 跟随滚动
        const y = - (scrollRef.current?.scrollTop - fixH * 3 - sec2BoxRef.current!.clientHeight + (isMd ? 300 : 0))
        // if (y > 0) y = 0
        // if (scale < 0.1 || scale < 0) scale = 0
        // console.log('scale ', scale)
        canvasRef.current!.style.transform = `translateY(${y}px)`
        canvasRef.current!.style.webkitTransform = `translateY(${y}px)`

        // stepTextRef
        stepTextRef.current!.style.transform = `translateY(${y}px)`
        stepTextRef.current!.style.webkitTransform = `translateY(${y}px)`
      }
      else {
        canvasRef.current!.style.transform = `translateY(0)`
        canvasRef.current!.style.webkitTransform = `translateY(0)`
        stepTextRef.current!.style.transform = `translateY(0)`
        stepTextRef.current!.style.webkitTransform = `translateY(0)`
      }
      // 5 之后
      if (scrollRef.current?.scrollTop && scrollRef.current?.scrollTop >= fixH * 3 + sec2BoxRef.current!.clientHeight - (isMd ? 300 : 0)) {
        sec4TitleRef.current?.classList.add('move-up-and-fade-in')
        sec4Box1Ref.current?.classList.add('move-up-and-fade-in')
        sec4Box2Ref.current?.classList.add('move-up-and-fade-in')
        sec4Box3Ref.current?.classList.add('move-up-and-fade-in')
        // remove move-up-and-fade-out
        sec4TitleRef.current?.classList.remove('move-up-and-fade-out')
        sec4Box1Ref.current?.classList.remove('move-up-and-fade-out')
        sec4Box2Ref.current?.classList.remove('move-up-and-fade-out')
        sec4Box3Ref.current?.classList.remove('move-up-and-fade-out')
      }
      else {
        sec4TitleRef.current?.classList.add('move-up-and-fade-out')
        sec4Box1Ref.current?.classList.add('move-up-and-fade-out')
        sec4Box2Ref.current?.classList.add('move-up-and-fade-out')
        sec4Box3Ref.current?.classList.add('move-up-and-fade-out')
        // remove move-up-and-fade-in
        sec4TitleRef.current?.classList.remove('move-up-and-fade-in')
        sec4Box1Ref.current?.classList.remove('move-up-and-fade-in')
        sec4Box2Ref.current?.classList.remove('move-up-and-fade-in')
        sec4Box3Ref.current?.classList.remove('move-up-and-fade-in')
      }

    })
  }
  const initCanvas = () => {
    const THREE = window.THREE
    const scene = new THREE.Scene();
    const container = canvasRef.current!;
    const scrollContainer = scrollRef.current!
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, container?.clientWidth / container?.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    // renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container?.clientWidth, container?.clientHeight);
    container?.appendChild(renderer.domElement);
    // 创建平面几何体，并添加到场景
    const geometry = new THREE.PlaneGeometry(5, 5); // 16:9 比例的平面
    const texture = new THREE.TextureLoader().load(imgs[0].src); // 加载第一帧图片
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true, // 支持透明
      opacity: 1, // 完全不透明
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 5;
    // 准备 240 张图片路径
    const totalFrames = imgs.length;
    // 将所有帧图片路径存储在一个数组中
    const images: string[] = imgs.map((img) => img.src);
    // 预加载所有图片
    const loadedTextures: any[] = [];
    const loader = new THREE.TextureLoader();
    images.forEach((imagePath, index) => {
      loader.load(imagePath, (texture: any) => {
        loadedTextures[index] = texture;
      });
    });

    // 更新帧函数，根据当前帧数切换纹理
    function updateTexture(frame: number) {
      if (loadedTextures[frame]) {
        material.map!.dispose();
        material.map = loadedTextures[frame];
        material.needsUpdate = true;
      }
    }
    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    // 根据滚动条位置计算当前帧数
    // 1.5 ~ 4 倍 windowHeight 之间, 其中 0.5 在 ScrollRef 中,  0.5 ~4 在 ScrollContainer 中
    // 1 倍 windowHeight + sec2BoxRef.current?.clientHeight ~ 3 倍 windowHeight + sec2BoxRef.current?.clientHeight
    function onScroll() {
      const maxScroll = 2.5 * window.innerHeight
      const scrollTop = scrollContainer?.scrollTop
      // 计算当前帧数 (0 ~ 240)，免去 1.5 倍 windowHeight
      //  如果是 md 屏幕，则减去 300px
      const isMd = window.innerWidth > 768
      const scrollProgress = (scrollTop + (isMd ? 300 : 0) - (0.5 * window.innerHeight + sec2BoxRef.current!.clientHeight)) / (maxScroll);
      let currentFrame = Math.min(totalFrames - 1, Math.floor(scrollProgress * totalFrames));
      // 小于 0 设置为 0
      if (currentFrame < 0) {
        currentFrame = 0
      }
      updateTexture(currentFrame); // 更新动画帧
    }

    scrollContainer?.addEventListener('scroll', onScroll);
    animate();
  }
  const setCanvasSize = () => {
    const canvas = canvasRef.current
    // 正方形
    // 768px 以下 100% 宽度
    // 768px 以上 50% 宽度
    // 
    const width = window.innerWidth > 768 ? window.innerWidth * 0.5 : window.innerWidth * 1.4

    canvas!.style.width = `${width}px`
    canvas!.style.height = `${width}px`
    if (window.innerWidth > 768) {
      
      canvas!.style.position = 'fixed'
      canvas!.style.top = window.innerHeight / 2 - width / 2 + 'px'
      canvas!.style.pointerEvents = 'none'
    }
    else {
      // 如果 width > 412 ，则
      // if (width > 412) {
      //   width = 412
      //   canvas!.style.left = (window.innerWidth - width) / 2 + 'px'
      // }
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${width}px`

      canvas!.style.position = 'fixed'
      canvas!.style.pointerEvents = 'none'
      // 
      canvas!.style.bottom = 0 + 'px'
      // canvas!.style.top = window.innerHeight - width + 'px'
      canvas!.style.zIndex = '1'
      canvas!.style.left = window.innerWidth * -0.2 + 'px'

      window.addEventListener('resize', () => {
        // canvas!.style.top = window.innerHeight - width + 'px'
      })
    }

  }
  return <div className='w-full h-full'>
    <div className={`flex md:px-[80px] md:py-[30px] px-[20px] py-[20px] relative z-[13] absolute top-0 left-0 w-full ${step === 1 ? 'frosted-glass' : ''}`} ref={headerRef}>
      <img src={'/arttoo-logo.png'} alt="logo" className='md:h-[35px] h-[30px]' style={{ filter: false || step === 1 ? 'invert(1)' : 'invert(0)' }} />
      <div className={`hidden md:flex items-center flex-1 justify-end ${false || step === 1 ? 'text-black' : 'text-white'}`}>
        {/* <div className='nav-item'>Artworks</div>
        <div className='nav-item'>Learn</div>
        <div className='nav-item'>About</div>
        <div className='nav-item'>Contact us</div> */}
      </div>
      {/* <div className={`md:hidden w-[70px] h-[70px] absolute right-0 top-0 flex items-center justify-center cursor-pointer ${isOpen || step === 1 ? 'text-black' : 'text-white'}`} onClick={() => {
        setIsOpen(!isOpen)
      }}>
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
      </div> */}
    </div>
    {false ? <div className='absolute top-0 left-0 w-full h-full bg-white z-[10] bg-white move-up-and-fade-in2'>
      <div className='h-[70px]'></div>
      <div className='text-black nav-item'>Artworks</div>
      <div className='text-black nav-item'>Learn</div>
      <div className='text-black nav-item'>About</div>
      <div className='text-black nav-item'>Contact us</div>
    </div> : null}
    <div className='w-full h-full overflow-y-auto bg-white fixed top-0 left-0' ref={scrollRef}>
      <div>
        {/* section 1 */}
        <section className='h-svh w-full fixed top-0 left-0 bg-white' >
          <div className="w-full h-full" ref={videoBoxRef}>
            <video playsInline={true} autoPlay={true} muted={true} loop={true}
              id='video1'
              // ref={videoElementRef}
              className="h-full w-full object-cover"
              poster='/hero.jpg'
              ref={videoRef}>
              <source src='/hero.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            <div className='section_hover_btn absolute md:bottom-[30px] left-1/2 md:ml-[-32px] md:w-[64px] md:h-[64px] w-[50px] h-[50px] bottom-[25px] ml-[-25px] animate-bounce bg-white rounded-full flex items-center justify-center' >
              <svg className={`absolute h-[20px] w-[20px] transition-all duration-300 ease-in-out ${hover ? 'text-white' : 'text-black '}`} xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24">
                <path d="M4.97 13.22a.75.75 0 011.06 0L11 18.19V3.75a.75.75 0 011.5 0v14.44l4.97-4.97a.749.749 0 011.275.326.749.749 0 01-.215.734l-6.25 6.25a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06z"></path>
              </svg>
              <div className={`section_hover_circle ${hover ? 'section_hover_circleHover' : ''}`}></div>
            </div>
          </div>
        </section>
        {/* section 1：mask  */}
        <div className="relative h-svh w-full bg-transparent relative inset-0" ref={step1BoxRef}>
          <div ref={circleRef} className='absolute md:bottom-[35px] left-1/2 md:w-[70px] md:h-[70px] w-[60px] h-[60px] bottom-[25px] md:ml-[-35px] ml-[-30px] bg-transparent cursor-pointer rounded-full'
            onMouseEnter={() => {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
              if (isMobile) return
              setHover(true)
            }}
            onMouseLeave={() => {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
              if (isMobile) return
              setHover(false)
            }}
            onClick={() => {
              setStep(1)
              const windowHeight = window.innerHeight
              scrollRef.current?.scrollTo({ top: windowHeight, behavior: 'smooth' })
            }}>
          </div>
        </div>
        {/* main content */}
        <div className='w-full bg-white h-auto'>
          {/* section 2 */}
          <div className="relative w-screen bg-white relative overflow-hidden" ref={sec2BoxRef}>
            <div className='flex relative z-[1] section_2'>
              <h1 ref={sec2TitleRef} className='text-black move-up-and-fade-out'>Art Is The Visual <span className="italic font-medium">Proof Of History</span> For Humanity</h1>
              <p ref={sec2DescRef} className='text-black move-up-and-fade-out'>
                Arttoo is about unlocking a world of possibilities. Become part of a vibrant art community, connect with a timeless piece of culture, and watch your investment grow alongside your passion, with a hassle-free mindset for provenance tracking. All transactions are secure, transparent, and regulated through the beauty of blockchain technologies.
              </p>
            </div>
            <video
              playsInline={true}
              muted={true} loop={true}
              id='video2'
              poster='/sec_2II.png'
              ref={video2Ref}
              className='w-full object-cover'
            >
              <source src='/section2-highres.webm' type="video/webm; codecs='vp8, vorbis'" />
              <source src='/section2-highres.mp4' type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* section 3 */}
          <div className="relative bg-white md:bg-transparent w-full h-svh flex md:flex-row flex-col justify-center items-center md:mt-[-300px]">
            <div className="flex-1 md:block hidden"></div>
            <div className="flex-1 stepBox md:block hidden">
              <div className='stepIndex'>01</div>
              <div className='stepTitle'>Explore</div>
              <div className='stepDesc'>Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's.</div>
            </div>
          </div>
          <div className="relative w-full bg-white h-svh flex md:flex-row flex-col justify-center items-center">
            <div className="flex-1 md:block hidden"></div>
            <div className="flex-1 stepBox md:block hidden">
              <div className='stepIndex'>02</div>
              <div className='stepTitle'>Invest</div>
              <div className='stepDesc'>Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.</div>
            </div>
          </div>
          <div className="relative w-full bg-white h-svh flex md:flex-row flex-col justify-center items-center">
            <div className="flex-1 md:block hidden"></div>
            <div className="flex-1 stepBox md:block hidden">
              <div className='stepIndex'>03</div>
              <div className='stepTitle'>Earn</div>
              <div className='stepDesc'>Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more.</div>
            </div>
          </div>
          {/* section 4 */}
          <div className="relative w-full bg-white md:px-[80px] px-[20px] pb-[100px] fixDrak">
            <div ref={sec4TitleRef} className='section_title4'>
              Your investments<br />are <span className='font-medium italic'>secured</span> with us
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-8 lg:gap-16 md:mt-[150px] mt-[40px]">
              <div ref={sec4Box1Ref} className="w-fit" style={{ opacity: 1, willChange: 'transform', transform: 'none' }}>
                <div id="about-content" className="flex flex-col gap-8">
                  <Image src={Gurrjohns} alt='Gurrjohns' className='w-[160px]' />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[20px] md:text-[24px] font-semibold leading-[31.44px]">Expert Authentication</h3>
                    <p className="text-[16px] md:text-[20px] md:mt-[24px] mt-[16px] leading-[20.4px] md:leading-[26.2px] text-black/60">We collaborates with
                      renowned appraisers from GurrJohns (or other established appraisal firms) to meticulously verify artwork
                      authenticity, condition, and provenance, with its proof of appraisal embedded directly within each token.</p>
                  </div>
                </div>
              </div>
              <div ref={sec4Box2Ref} className="w-fit" style={{ opacity: 1, willChange: 'transform', transform: 'none' }}>
                <div id="about-content" className="flex flex-col gap-8">
                  <Image src={Axa} alt='Axa' className=' w-[40px]' />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[20px] md:text-[24px] font-semibold leading-[31.44px]">Comprehensive Insurance</h3>
                    <p className="text-[16px] md:text-[20px] md:mt-[24px] mt-[16px] leading-[20.4px] md:leading-[26.2px] text-black/60">We partner with a
                      leading art insurance company to provide tailored coverage against theft, damage, and loss during
                      transportation, storage, and loans.</p>
                  </div>
                </div>
              </div>
              <div ref={sec4Box3Ref} className="w-fit" style={{ opacity: 1, willChange: 'transform', transform: 'none' }}>
                <div id="about-content" className="flex flex-col gap-8">
                  <div className='flex gap-8'>
                    <Image src={Momart} alt='Momart' className='w-[40px]' />
                    <Image src={Dietl} alt='Dietl' className='w-[40px]' />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[20px] md:text-[24px] font-semibold leading-[31.44px]">Secure Transportation and Storage</h3>
                    <p className="text-[16px] md:text-[20px] md:mt-[24px] mt-[16px] leading-[20.4px] md:leading-[26.2px] text-black/60">We partner with trusted
                      companies like Momart and DIETL International, to ensure secure transportation of the artwork from your
                      location to our state-of-the-art storage facility equipped with advanced security systems and climate control
                      to guarantee its preservation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="bg-black w-full relative">
            <div className="mx-auto py-16 md:px-[80px] px-[20px]">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                <div className="flex flex-col gap-8">
                  <h3
                    className="text-white  text-[30px] sm:text-[44px] lg:text-[60px] leading-[39.3px] sm:leading-[51.23px] lg:leading-[78.6px] font-medium ">
                    Ready to Own <span className="italic">Your Piece of History?</span></h3>
                  <div className="flex gap-2 flex-col font-poppins">
                    <form className='border border-white rounded-full p-1 max-w-[400px] w-full flex' onSubmit={handleSubmit}>
                      <input
                        type='text'
                        className='focus:outline-none bg-transparent px-4 py-2 w-full text-white'
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
                    <p className="text-white text-[11.5px] lg:text-base leading-[19.2px] font-light">Join the Waitlist & Get Informed when New Artworks are Available!</p>
                    {message && <p className='text-green-600 text-sm'>{message}</p>}
                    {messageError && <p className='text-red-600 text-sm'>{messageError}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-4 min-w-48">
                  <p className="text-2xl text-white leading-[19.2px] font-light">Follow us on</p>
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
          </div>
        </div>
      </div>
    </div>
    {/* floating  content  from mobile */}
    <div ref={stepTextRef} className="fixed bottom-[0px] left-[20px] h-svh pr-[20px] z-[1] pt-[85px] pointer-events-none md:hidden">
      {
        step3 === -1 ? null : <>
          {
            step3 === 0 ? <div className='stepBox2 fade-in'>
              <div className='stepIndex'>01</div>
              <div className='stepTitle'>Explore</div>
              <div className='stepDesc'>Browse a collection of iconic masterpieces carefully handpicked by our expert curators from Sotheby's and Christie's.</div>
            </div> : null
          }
          {
            step3 === 1 ? <div className='stepBox2 fade-in'>
              <div className='stepIndex'>02</div>
              <div className='stepTitle'>Invest</div>
              <div className='stepDesc'>Start investing in fractional shares of legacy masterpieces with no auction house markups, no gallery markups, no hidden true-up fees.</div>
            </div> : null
          }
          {
            step3 === 2 ? <div className='stepBox2 fade-in'>
              <div className='stepIndex'>03</div>
              <div className='stepTitle'>Earn</div>
              <div className='stepDesc'>Watch your investment grow in value through auction exits, rents from exhibitions in museums and galleries, loyalty from NFT recreations and consumer merchandise and many more.</div>
            </div> : null
          }
        </>
      }
    </div>
    {/* floating canvas */}
    <div id="canvas" ref={canvasRef} className='z-[2] bg-transparent pointer-events-none'></div>
    {/* <div className='fixed left-0 w-full h-[30px] bg-red-500'>
      <p>{h}</p>
    </div> */}
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
  </div>
}
export default LandingPage;