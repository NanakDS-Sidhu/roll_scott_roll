"use client"
import { motion, useScroll,useMotionValueEvent } from "framer-motion"
import { useRef } from "react";


export default function Home() {
  const canvasRef=useRef()
  const scrollRef=useRef()
  const contextRef=useRef()
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    contextRef.current=canvasRef?.current?.getContext("2d")
    scrollRef.current=latest*149-latest*149%1
    const img= new Image()
    img.src="/assets/"+scrollRef.current.toString().padStart(4,"0")+".jpg"

    img.onload=()=>{
      canvasRef.current.width=innerWidth
      canvasRef.current.height=outerHeight
      contextRef.current.drawImage(img,0,0)
    }


  })
  return (
    <>

    <h1 className='text-8xl'> HII</h1>
    <div className="canvasContainer sticky top-0 h-screen">
    <canvas ref={canvasRef} className="relative w-full h-screen bg-teal-300 z-10"></canvas>
    {scrollRef.current<=133?<div classname="z-20 absolute flex justify-center items-center backdrop-blur-lg bg-black/30">
      <h1 className="text-8xl text-white">Parkour </h1>
    </div>:""}
    </div>
    <div className="h-screen bg-orange-300"></div>
    <div className="h-screen bg-orange-300"></div>
    <div className="h-screen bg-orange-300"></div>
    </>
  )
}
