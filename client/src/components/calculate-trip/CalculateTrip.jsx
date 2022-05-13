import React, {useEffect, useState, useRef, useMemo} from "react";
import ReactLoading from "react-loading";
import axios from "axios";

export default function CalculateTrip({selectedMode}){
const [loading, setLoading] = useState(true) //panel wczytywania
const [table, setTable] = useState(false)   //panel wyświetlania tabeli
const [coordinate, setCoordinate] = useState([])
const isMounted = useRef(false);
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
      setCoordinate({
        start: [selectedMode.markers[0].lat, selectedMode.markers[0].lng].toString(),
        finish:[selectedMode.markers[1].lat, selectedMode.markers[1].lng].toString()
      })
        setLoading(false)
        setTable(true)
    }
},[])

// console.log(coordinate);
 

//pobieranie danych z HERE ROUTE API
const [calculate, setCalculate] = React.useState({
    tripHelper:[],
   herePolyline:'',
   summary:'',
   transport:'',
   startTripTime:'',
   finishTripTime:''
 })
console.log(calculate.tripHelper)
 let params = {
   "lang":"pl-PL",
   "transportMode": "car",
   "origin": coordinate.start,
   "destination":coordinate.finish,
   "return": "summary,polyline,actions,instructions",
   "apikey": "S8EEbwPOg895VRAWM5B0dySTjVDHQgOb60_miRqD5ik",
 };
 const handleCalculate = async () => {
   try{
   await axios
     .get("https://router.hereapi.com/v8/routes", { params: params })
     .then((res) => res.data)
     .then((data) => {
       const tripHelper = data.routes[0].sections[0].actions;
       const herePolyline = data.routes[0].sections[0].polyline;
       const summary = data.routes[0].sections[0].summary;
       const transport = data.routes[0].sections[0].transport;
       const startTripTime = data.routes[0].sections[0].departure;
       const finishTripTime = data.routes[0].sections[0].arrival;

     setCalculate({
       tripHelper:tripHelper,
       herePolyline:herePolyline,
       summary:summary,
       transport:transport,
       startTripTime:startTripTime,
       finishTripTime:finishTripTime
     })})
    }
     catch(error){
    return  console.log(error.message);
     }
 };
 useEffect(()=>{
  if(isMounted.current || coordinate.length !== 0){
    handleCalculate()
    }else{
    isMounted.current = true;
  }
  },[coordinate])
    return(
    <div className="Popup">
        {loading && (
        <div>
          <ReactLoading type={"bars"} color={"tomato"} height={467} width={175} className="loading" />
          <h4 className="loading" style={{ color: "black", fontSize: "25px" }}>PRZELICZAM...</h4>
        </div>
      )}
    {table && <table className="calculateTable">
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
               <thead>
               <tr>
                   <td>CZAS PODRÓŻY</td>
                   <td>DŁUGOŚĆ TRASY</td>
               </tr>
               </thead>
               <tbody>
               <tr>
                  <td>test</td>
                  <td>test</td>
               </tr>
           </tbody>
           <thead>
             <tr>
               <td>SZECZGÓŁY TRASY</td>
             </tr>
           </thead>
           <tbody>
           {calculate && calculate.tripHelper.map(el=>( <tr className="calculateTR">
              <td>{el.instruction}</td>
             </tr>))}
           </tbody>
       </table>}
   </div>
    )
}
