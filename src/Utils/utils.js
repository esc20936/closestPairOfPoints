const generateRandomPositions = () =>{
    let listOfCoords = []
    for (let i = 0; i < 250; i++) {
      let x = (Math.random() - 0.5) * 10
      let y = (Math.random() - 0.5) * 10
      let z = (Math.random() - 0.5) * 10

    //   set 3 decimal places
        x = Math.round(x * 1000) / 1000
        y = Math.round(y * 1000) / 1000
        z = Math.round(z * 1000) / 1000

      listOfCoords.push({x, y, z})
    }
    return listOfCoords

}

export { generateRandomPositions };