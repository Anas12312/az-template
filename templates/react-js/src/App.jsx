import { useRef, useState } from 'react'

function App() {
  const containerRef = useRef(null)
  const cleanRef = useRef(null)
  const cleanUp = () => {
    containerRef.current.innerHTML = ""
    cleanRef.current.classList.add('hidden')
  }
  const appendDiv = () => {
    cleanRef.current.classList.remove('hidden')
    const logoEle = document.createElement("img")
    logoEle.src = "../logo-small.png"
    logoEle.classList.add('absolute')
    logoEle.style.width = (Math.floor(Math.random() * 32) + 32) + 'px';
    let left = (Math.floor(Math.random() * 100) + 0)
    let top = (Math.floor(Math.random() * 100) + 0)
    do {
      left = (Math.floor(Math.random() * 100) + 0)
      top = (Math.floor(Math.random() * 100) + 0)
    } while (left > 23 && left < 70 && top > 18 && top < 80)
    logoEle.style.left = left + '%'
    logoEle.style.top = top + '%'
    logoEle.style.rotate = (Math.floor(Math.random() * 360) + 0) + 'deg'
    containerRef.current.appendChild(logoEle)
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center select-none'>
      <div ref={containerRef} className='absolute w-full h-full pointer-events-none overflow-hidden'></div>
      <img className='w-96' src="../logo.png" alt="" />
      <div className='mt-10 text-xl'>This <span className='text-2xl font-bold'>AZ</span> Template For JavaScript React Application + TailwindCSS</div>
      <div className='flex mt-10'>
        <div onClick={appendDiv} className='mx-5 bg-gray-200 py-5 px-10 rounded-lg font-semibold border border-black cursor-pointer hover:bg-gray-400'>Click Me</div>
        <div ref={cleanRef} onClick={cleanUp} className='hidden mx-5 bg-gray-200 py-5 px-10 rounded-lg font-semibold border border-black cursor-pointer hover:bg-gray-400'>Clean Up</div>
      </div>
    </div>
  )
}

export default App
