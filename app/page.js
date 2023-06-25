"use client"
import { motion, useScroll,useMotionValueEvent } from "framer-motion"
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const canvasRef=useRef()
  const scrollRef=useRef()
  const contextRef=useRef()
  const [loading,setLoading]=useState(false)

  const getImageName = (index) =>
  `./src/assets/${index.toString().padStart(4, "0")}.jpg`;

const preloadImages = () => {
  const imageLoadedPromises = [];
  for (let i = 1; i < totalFrames; i++) {
    const img = new Image();
    const imgLoadPromise = new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = reject("Something is wrong...");
    });
    imageLoadedPromises.push(imgLoadPromise);
    img.src = getImageName(i);
  }
  return Promise.all(imageLoadedPromises);
};

const updateImage = (index) => {
  img.src = getImageName(index);
  contextRef.current.drawImage(
    img,
    0,
    0,
    canvasRef.current.width,
    canvasRef.current.height
  );
};

  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    contextRef.current=canvasRef?.current?.getContext("2d")
    scrollRef.current=latest*149-latest*149%1
    updateImage(scrollRef.current)
  })

  
  useEffect(()=>{
    setLoading(true)
    preloadImages()
    setLoading(false)
  },[])


  return (
    <>

    <h1 className='text-8xl'> HII</h1>
{loading?"Loading Please Wait":    <div className="canvasContainer sticky top-0 h-screen">
    <canvas ref={canvasRef} className="relative w-full h-screen bg-teal-300 z-10"></canvas>
    {scrollRef.current<=133?<div classname="z-20 absolute flex justify-center items-center backdrop-blur-lg bg-black/30">
      <h1 className="text-8xl text-white">Parkour </h1>
    </div>:""}
    </div>}
    <div className="h-screen bg-orange-300"></div>
    <div className="h-screen bg-orange-300"></div>
    <div className="h-screen bg-orange-300"></div>
    </>
  )
}
