"use client"
import { motion, useScroll,useMotionValueEvent } from "framer-motion"
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const canvasRef=useRef()
  const scrollRef=useRef()
  const contextRef=useRef()
  const [loading,setLoading]=useState(false)
  const imagesRef=useRef()
  const totalFrames=148
  
  const { scrollYProgress } = useScroll();

  const preloadImages = () => {
    setLoading(true)
    const imageLoadedPromises = [];
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image();
      const imgLoadPromise = new Promise((resolve, reject) => {
        img.onload = () => {resolve(img)
        // console.log(i,"Succ")
        };
        img.onerror =()=>{ reject("Something is wrong...");
        // console.log(i,"Error")
      }
      });
      imageLoadedPromises.push(imgLoadPromise);
      img.src = getImageName(i);
    }
    return Promise.all(imageLoadedPromises);
  };

  
  const getImageName = (index) =>
  "assets/"+index.toString().padStart(4, "0")+".jpg";


  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    contextRef.current=canvasRef?.current?.getContext("2d")
    scrollRef.current=latest*148-latest*148%1+1
    const img= new Image()

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
    
    updateImage(scrollRef.current)

  })

  useEffect(()=>{
    const images=preloadImages()
    images.then((val)=>{
      imagesRef.current=val 
      setLoading(false)},setLoading(false))
  },[])

  return (
    <>

    <h1 className='text-8xl'> Its Parkour time</h1>
{loading?"Please wait":  <div className="canvasContainer sticky top-0 h-screen">
    <canvas ref={canvasRef} className="relative w-full h-screen  bg-teal-300 z-10"></canvas>

    </div>}
    <div className="h-screen bg-orange-300"></div>
    <div className="h-screen bg-orange-300"></div>
    <div className="h-screen bg-orange-300"></div>
    </>
  )
}
