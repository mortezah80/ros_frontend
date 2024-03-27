<div className="app">
<h1>Tile Positions</h1>

<div>
<button onClick={binFunc}>Update</button>
<button onClick={() => updateTilePosition(0, 2, 2)}>Move Tile 0 to (2, 2)</button>
<button onClick={requ}>Send Request</button>
{/* <button onClick={deviceFunc}>device</button> */}
</div>
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