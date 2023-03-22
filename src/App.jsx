import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Experience } from './Experience/Experience'
// import './App.css'
function App() {
  
  const canvasRef = useRef(null)
  let experienceObj = null

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      experienceObj = new Experience(canvas)

    }
  }, [])


  return (
    <div className="relative h-full w-full">
      <div className="center absolute"/>
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-row items-center justify-evenly h-3/4 w-full ">

          <div className="glass flex flex-col items-center justify-center h-full w-2/5 rounded-lg">
            <button className="glass-button" onClick={() => {
              experienceObj.addSpheres();
            }}>Generar</button>

          </div>
          <canvas ref={canvasRef} id="canvas" className="flex flex-col items-center justify-center h-full w-1/2 border-dotted  border-2 rounded-lg" />

        </div>
        
      </div>

    </div>
  )
}

export default App
