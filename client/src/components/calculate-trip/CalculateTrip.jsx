import React, {useEffect, useState} from "react";
import ReactLoading from "react-loading";

export default function CalculateTrip({selectedMode}){
const [loading, setLoading] = useState(true) //panel wczytywania
const [table, setTable] = useState(false)   //panel wyświetlania tabeli

useEffect(()=>{
  if(selectedMode.length === 0){
    console.log("czekam na dane");
    const clear = setTimeout(() => {
      window.location.reload();
    }, 3000);
    return () => {
      clearTimeout(clear);
    }}
    else{
        setLoading(false)
        setTable(true)
    }
})

    return(
    <div className="Popup">
        {loading && (
        <div>
          <ReactLoading type={"bars"} color={"tomato"} height={467} width={175} className="loading" />
          <h4 className="loading" style={{ color: "black", fontSize: "25px" }}>SPRAWDZAM...</h4>
        </div>
      )}
    {table && <table>
           <thead>
               <tr>
                   <td>POCZĄTEK TRASY</td>
                   <td>KONIEC TRASY</td>
               </tr>
           </thead>
           <tbody>
               <tr>
                  <td>{selectedMode.markers[0].location}</td>
                  <td>{selectedMode.markers[1].location}</td>
               </tr>
           </tbody>
       </table>}
   </div>
    )
}
