import React, { useState } from 'react';
// import {
//   TransformWrapper,
//   TransformComponent,
//   useControls,
// } from "react-zoom-pan-pinch";
import './App.css'; 

function App() {
  const [tiles, setTiles] = useState([
    // [-1, 1, "yellow"],
    // [0, 0, "red"],
    // [0, 2, "yellow"],
    // [1, 0, "red"],
    // [3,2, "blue"],
    // [3,3, "red"]
    // // Add more tiles as needed
  ]);

  const [bines, setBines] = useState([
    // [0, 1, "green"],
    // [0, 0, "orange"],
    // // Add more tiles as needed
  ]);
  const [device, setDevices] = useState([
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

  const sendRequestDevice = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8000/device', {
        method: 'GET', //
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      const data = await response.json();

      console.log("imp!")
      console.log(data)
      setDevices(
        data.map(obj => obj.location)
      )
      // console.log(tiles)
      // setResponseMessage(data);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while fetching data.');
    }
  };






  const [responseMessage, setResponseMessage] = useState('');
  const sendRequestToDjango = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8000/tile', {
        method: 'GET', //
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      const data = await response.json();

      console.log("imp!")
      console.log(data)
      setTiles(
        data.map(obj => obj.location)
      )
      console.log(tiles)
      // setResponseMessage(data);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while fetching data.');
    }
  };
  const requ = () => {
    console.log("hi")
    sendRequestToDjango()
    console.log(responseMessage)
    console.log("hi")
  }
  const binFunc = () => {
    sendRequestBins()
    console.log("hi")
  }
  const deviceFunc = () => {
    sendRequestDevice()
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
    <div>
    <h1>Tile Positions</h1>

    <div>
    <button onClick={binFunc}>Update</button>
    <button onClick={() => updateTilePosition(0, 2, 2)}>Move Tile 0 to (2, 2)</button>
    <button onClick={requ}>Send Request</button>
    {/* <button onClick={deviceFunc}>device</button> */}
    </div>
      <div className="app">
       
        <div className="tiles-container">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className="tile"
              style={{ gridColumn: tile[0] + 5, gridRow: -(tile[1] + 5), backgroundColor: tile[2] }}
            >
              [{tile[0]}, {tile[1]}, 0]
              {
                bines.map(bin => {
                  return(
                    bin[0]===tile[0] && bin[1]===tile[1] ?
                    <div className='bin'>
                      bin
                    </div>
                    :
                    <>

                    </>
                  )
                })
              }
            </div>
          ))}
        </div>
        <button onClick={() => updateTilePosition(0, 2, 2)}>Move Tile 0 to (2, 2)</button>

        <p>{responseMessage}</p>
        </div>
        
    </div>);
}

export default App;
