import { useState } from 'react';
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import './App.css'; 


function App() {

  const [responseMessage, setResponseMessage] = useState('');
  const [tiles, setTiles] = useState([
  ]);
  const [bines, setBines] = useState([
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

    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while fetching data.');
    }
  };

  const sendRequestTiles = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8000/tile', {
        method: 'GET', //
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      const data = await response.json();

      setTiles(
        data.map(obj => [... obj.location, obj.type])
      )

    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while fetching data.');
    }
  };
  const update_req = () => {
    sendRequestTiles()
    sendRequestBins()
  }

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
        <button onClick={update_req}>Update</button>
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
