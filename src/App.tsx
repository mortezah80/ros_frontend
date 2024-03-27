import React, { useState } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import './App.css'; 

type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */


function App() {
  const [tiles, setTiles] = useState([
    // [-1, 1, "yellow"],
    // [0, 0, "red"],
    // // Add more tiles as needed
  ]);

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
      setBines(
        data.map(obj => [...obj.location, obj.id])
      )
      console.log(data)
      console.log(bines)
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

      // console.log("imp!")
      // console.log(data)
      setTiles(
        data.map(obj => [... obj.location, obj.type])
      )
      // console.log(tiles)
      // setResponseMessage(data);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while fetching data.');
    }
  };
  const update_req = () => {
    sendRequestToDjango()
    sendRequestBins()
  }
  const updateTilePosition = (index, newX, newY) => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles];
      newTiles[index] = [newX, newY];
      return newTiles;
    });
  };

  const checkBin = (position:number[]) => {
    let flag = 0
    bines.map(bin => {
      bin[0]===position[0] && bin[1]===position[1] ?
      flag=1
      :
      <>
      </>
    })
    return flag
  }




  return (
    <div className='app-container'>
      <div>


        <div>
        {/* <button onClick={binFunc}>Update</button> */}
        <button onClick={update_req}>Update</button>
        {/* <button onClick={deviceFunc}>device</button> */}
        </div>
      </div>
    <div className='test'>
    <TransformWrapper>
      <TransformComponent>
      <div className="app">
       
        <div className="tiles-container">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className="tile"
              style={{ gridColumn: tile[0] + 5, gridRow: -(tile[1] + 5), backgroundColor: tile[3]==="."? "#ffffff" : tile[3]==="x"?"#ffffe0" : tile[3]==="A"? "#f0f8ff" : tile[3]==="O"? "#add8e6" : tile[3]==="I"? "#cae1ff": "white" }}
            >
              {
                ((((tile[0]===0) || (tile[1]===0)))  && !checkBin(tile) )?
                <p className='text_tile'>({tile[0]}, {tile[1]}, 0)</p>
                :
                <>
                </>
              }
              
              {
                bines.map(bin => {
                  return(
                    bin[0]===tile[0] && bin[1]===tile[1] ?
                    <div className='bin'>
                      <p>{bin[3]}</p>
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


        <p>{responseMessage}</p>
        </div>
      </TransformComponent>
    </TransformWrapper>
    </div>
    </div>);
}

export default App;
