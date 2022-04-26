import React from "react";
import axios from "axios"
import "./tripAdd.css"


const TripAdd = props =>{
//pobieranie danych z inputów
const [getInputsValue, setGetInpuntsValue] = React.useState({
    startTrip: ' ',
    finishTrip: ''
})
const handleTripInputs = e =>{
    const {name, value} = e.target
    setGetInpuntsValue(prev=>({
        ...prev,
        [name]:value
    }))
}
const handleGeoApi = () =>{
    sendIncomeDataToBackEnd(getInputsValue.startTrip, getInputsValue.finishTrip)
    setGetInpuntsValue(prev=>({
        ...prev,
        startTrip: ' ',
        finishTrip: ''
    }))
}
//pobieranie danych z POSITIONSTACK api
// const [getApiData, setGetApiData] = React.useState()
// console.log(getApiData);
// const params = {
//     access_key: '9121fc1448f36ce5a023918742d5e885',
//     query: getInputsValue.startTrip
//   }
// const handleGeoApi = async() =>{
//     try{
//         await axios
//         .get("http://api.positionstack.com/v1/forward", {params})
//         .then(res=>res.data)
//         .then(data => setGetApiData(data))
//         }       
//         catch(err){
//             throw err
//         }
//     }

//wysyłanie danych na serwer
const sendIncomeDataToBackEnd = (trip_start, trip_end) =>{
    fetch("api/trip_history",{
        method: "POST",
        body: JSON.stringify({
            trip_start: trip_start,
            trip_end: trip_end
        }),
        headers: { "Content-type": "application/json" }
    })
}
    return(
        <div className="tripAddContainer">
            <div className="background"></div>
            <section className="titleContener">
                <h2>WYZNACZ SWOJĄ TRASĘ</h2>
            </section>
            <section className="mainContener">
              <div className="inpuntDiv">
                <label htmlFor="startTrip">PODAJ START TRASY</label><br />
                <input 
                className="tripInputs"
                type="text" 
                name="startTrip"
                value={getInputsValue.startTrip}
                onChange={handleTripInputs}
                />
              </div>
              <div className="inpuntDiv">
                <label htmlFor="finishTrip">PODAJ PUNKT DOCELOWY</label><br />
                <input
                className="tripInputs"
                type="text"
                name="finishTrip"
                value={getInputsValue.finishTrip}
                onChange={handleTripInputs}
                />
              </div>
                <div className="tripBtnDiv">
                    <button onClick={()=>handleGeoApi()} type="button" className="btn">WYZNACZ</button>
                </div>
            </section>
        </div>
    )
}

export default TripAdd;