import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Experience } from './Experience/Experience'
import { generateRandomPositions } from './Utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setDataArray } from './store/dataSlice'
import { closestPairOfPointsDNC } from './Utils/DivideNConquer'
// import './App.css'
let experienceObj = null
function App() {
  
  const canvasRef = useRef(null)
  const dispatch = useDispatch()

  const dataArray = useSelector(state => state.dataArray)

  

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      experienceObj = new Experience(canvas)
    }
  }, [dispatch])

  const handleGenerateSpheres = () => {
    let listOfCoords = generateRandomPositions()
    dispatch(setDataArray(listOfCoords))
    experienceObj.addSpheres(listOfCoords)
  };

  const handleDynamicProgramming = () => {
    
  }

  const handleDivideAndConquer = () => {
    let a =closestPairOfPointsDNC(dataArray.dataArray, dataArray.dataArray.length)
    alert(`The closest pair of points has a distance of ${a}`)
  }



  return (
    <div className="relative h-full w-full">
      <div className="center absolute"/>
      <div className="absolute top-0 left-0 flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-row items-center justify-evenly h-3/4 w-full ">

          <div className="glass flex flex-col items-start justify-start h-full w-2/5 rounded-lg">

            <div className="Header flex flex-row items-start justify-start w-full m-5">
              <h1 className="text-2xl font-bold font-mainFont">Closest pair of points</h1>

            </div>
              <button className="glass-button" onClick={handleGenerateSpheres}>Generate points</button>

            <div className="TableContainer w-full h-3/5 flex flex-col justify-center items-center">
              <div className="Table w-3/4 h-3/4 flex flex-col justify-start items-start overflow-scroll">
                <table className="table-auto w-full bg-darkOpacityGray">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">No.</th>
                      <th className="px-4 py-2">X</th>
                      <th className="px-4 py-2">Y</th>
                      <th className="px-4 py-2">Z</th>
                    </tr>
                  </thead>
                  <tbody>
                      { dataArray.dataArray.map((sphere, index) => {
                        return (
                          <tr >
                          <td className="border px-4 py-2">{index}</td>
                          <td className="border px-4 py-2">{sphere.x}</td>
                          <td className="border px-4 py-2">{sphere.y}</td>
                          <td className="border px-4 py-2">{sphere.z}</td>
                        </tr>
                        )
                      }
                      )}
                  </tbody>
                </table>
              </div>

            </div>
            <div className="Footer w-full h-1/5 flex flex-row justify-evenly items-center">
            <button className="glass-button" onClick={handleDynamicProgramming}>Dynamic programming</button>
            <button className="glass-button" onClick={handleDivideAndConquer}>Divide and Conquer</button>
            
            </div>
  
          </div>
          <canvas ref={canvasRef} id="canvas" className="flex flex-col items-center justify-center h-full w-1/2   border-2 rounded-lg" />

        </div>
        
      </div>

    </div>
  )
}

export default App
