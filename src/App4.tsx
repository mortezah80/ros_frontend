import React, { useState } from 'react';
import './App.css'

function App() {
  const [tiles, setTiles] = useState([
    [0, 1],
    [0, 0],
    [2, 0],
    [1, 0],
    [3,0],
    [0,4],
    [2,2],
    [10,1]
    // Add more tiles as needed
  ]);

  const [responseMessage, setResponseMessage] = useState('');

  const [bines, setBines] = useState([
    // [0, 1, "green"],
    // [0, 0, "orange"],
    // // Add more tiles as needed
  ]);

  const sendRequestBins = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8000/bin', {
        method: 'GET', //
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      const data = await response.json();

      console.log("imp!")
      console.log(data)
      setBines(
        data.map(obj => obj.location)
      )
      // console.log(tiles)
      // setResponseMessage(data);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while fetching data.');
    }
  };


  const requ = () => {
    console.log("hi")
    sendRequestBins()
    console.log(responseMessage)
    console.log("hi")
  }

  const updateTilePosition = (index, newX, newY) => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles];
      newTiles[index] = [newX, newY];
      return newTiles;
    });
  };

  return (
    <div className="">
      <h1>Tile Positions</h1>
      <button onClick={requ}>Send Request</button>
      <div className="tiles-container">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="tile"
            style={{ top: `${tile[1] * 50}px`, left: `${tile[0] * 50}px` }}
          >

            {index}
          </div>
        ))}
      </div>
      <button onClick={() => updateTilePosition(0, 2, 2)}>Move Tile 0 to (2, 2)</button>
    </div>
  );
}

export default App;
