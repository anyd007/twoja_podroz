import React from "react";
import axios from "axios"
import "./tripAdd.css"


const TripAdd = props =>{
    const [isPending, setIsPending] = React.useState(false) //ustawienie napisu ładowania
    const [error, setError] = React.useState(null) //ustawienie stanu na błąd
    const tripInputs = document.querySelectorAll(".tripInputs")
    let startTripLabel;
    let startTripLongitude;
    let startTripLatitude;
    let finishTripLabel;
    let finishTripLongitude;
    let finishTripLatitude;
    

//pobieranie danych z inputów
const [getInputsValue, setGetInpuntsValue] = React.useState({
    startTrip:'',
    finishTrip:''
})
const handleTripInputs = e =>{
    const {name, value} = e.target
    setGetInpuntsValue(prev=>({
        ...prev,
        [name]:value
    }))
}
//mapowanie po wynikach api (początek trasy)
const [getApiData, setGetApiData] = React.useState()
if(getApiData){
    startTripLatitude = Number(getApiData.map(el=>el.latitude))
    startTripLongitude = Number(getApiData.map(el=>el.longitude))
    startTripLabel = getApiData.map(el=>el.label).toString()
    console.log("początek:",startTripLatitude, startTripLongitude, startTripLabel)
}else{
    console.log('non');
}
//mapowanie po wynikach api (koniec trasy)
const [getFinishData, setGetFinishData] = React.useState()
if(getFinishData){
    finishTripLatitude = Number(getFinishData.map(el=>el.latitude))
    finishTripLongitude = Number(getFinishData.map(el=>el.longitude))
    finishTripLabel = getFinishData.map(el=>el.label).toString()
    console.log('koniec:', finishTripLatitude, finishTripLongitude, finishTripLabel);
}else{
    console.log('non2');
}

//pobieranie danych o współżędnych na podsawie danych z inputów (początek trasy)
const params = {
    access_key: '9121fc1448f36ce5a023918742d5e885',
    query:getInputsValue.startTrip,
    country:"PL"
  }
 const handleStartData = () =>{
    axios
    .get("http://api.positionstack.com/v1/forward", {params})
    .then(res=>res.data)
    .then(data => {
        setGetApiData(data.data)
        setIsPending(false)
    })
    .catch(err=>{
        setError(err.message);
         })
        }
         React.useEffect(()=>{
            handleStartData()
        },[getInputsValue]) 

//pobieranie danych o współżędnych na podsawie danych z inputów (koniec trasy)
const handleFinishtData = () =>{
    axios
    .get(`http://api.positionstack.com/v1/forward?access_key=424502c53ce51f1a27b82d7c39b7e343&country=PL&query=${getInputsValue.finishTrip}`)
    .then(res=>res.data)
    .then(data =>{
        setGetFinishData(data.data)
        setIsPending(false)
    })
    .catch(err=>{
        setError(err.message)
    })
}
    React.useEffect(()=>{
        handleFinishtData()
},[getInputsValue])

 //funkcja wysyłanie danych na serwer
 const sendIncomeDataToBackEnd = (startTripLabel, startTripLatitude, startTripLongitude) =>{
    fetch("api/trip_start",{
        method: "POST",
        body: JSON.stringify({
            start_label: startTripLabel,
            start_latitude: startTripLatitude,
            start_longitude: startTripLongitude
        }),
        headers: { "Content-type": "application/json" }
    })
}
//funkcja onclick sprawdzająca poprawność danych i przkazyjących dane do wysłania na serwer
const handleCheckValidBtn = () =>{
    if(startTripLabel == '' || finishTripLabel == ''){
        setError("PODANA LOKALIZACJA NIE ISTNIEJE...PODAJ INNĄ")
    }else if(getApiData.length > 1){
        setGetMenyLoc(true)
    }else if(getFinishData.length >1){
        setGetManyFinishLoc(true)
    }
    else{
    sendIncomeDataToBackEnd(startTripLabel, startTripLatitude, startTripLongitude)
    setGetManyFinishLoc(false)
    setGetMenyLoc(false)
    setGetInpuntsValue(prev=>({
        ...prev,
    startTrip:'',
    finishTrip:''
    }))
    }
}
//czyszczenie inputów przy błędzie
tripInputs.forEach(el=>{
    el.onclick = () =>{
        el.value = ''
        setError(null)
    }
})
//wybór jeżeli lokalizacji startowych jest więcej 
const [getManyLoc, setGetMenyLoc]  = React.useState(false) //ustawienie wybowu lokalizacji
const hendleNewStartLocation= (e) =>{
    setGetInpuntsValue(prev=>({
        ...prev,
        startTrip: e.target.value
    }))
    setGetMenyLoc(false)
}

//wybór jeżeli lokalizacji końcowych jest więcej
const [getManyFinishLoc, setGetManyFinishLoc] = React.useState(false)
const hendleNewFinishLocation = e =>{
    setGetInpuntsValue(prev=>({
        ...prev,
        finishTrip: e.target.value
    }))
    setGetManyFinishLoc(false)
}

    return(
        <div className="tripAddContainer">
            <div className="background"></div>
            <section className="titleContener">
                <h2>WYZNACZ SWOJĄ TRASĘ</h2>
            </section>
            <section className="mainContener">
            {isPending && <div>Sprawdzam....</div>}
            {error && <h3 className="warrH3">WSZYSTKIE POLA SĄ OBIWĄZKOWE</h3>}
            {getManyLoc && <div className="startManyLoc">
                            <label htmlFor="chooseStartLoc">ZNALEZIONO WIĘCEJ NIŻ JEDNĄ STARTOWĄ LOKALIZACJĘ, WIBIERZZ LISTY LUB WPISZ PONOWNIE</label><br />
                            <select 
                                onChange={(e)=>hendleNewStartLocation(e)}
                                name="chooseStartLoc"
                                value={getInputsValue.startTrip.value}>
                                   {getApiData.map(el=>(<option>{el.label}</option>))}
                                </select>
                          </div>}
              <div className="inpuntDiv">
                <label htmlFor="startTrip">PODAJ START TRASY</label><br />
                <input 
                id="startTrip"
                className="tripInputs"
                type="text" 
                name="startTrip"
                value={getInputsValue.startTrip}
                onChange={handleTripInputs}
                onClick={()=>setError(null)}
                placeholder="ulica nr domu miasto"
                />
              </div>
              {getManyFinishLoc && <div className="FinishManyLoc">
                            <label htmlFor="chooseFinishLoc">ZNALEZIONO WIĘCEJ NIŻ JEDNĄ KOŃCOWĄ LOKALIZACJĘ, WIBIERZ Z LISTY LUB WPISZ PONOWNIE</label><br />
                            <select 
                                onChange={(e)=>hendleNewFinishLocation(e)}
                                name="chooseFinishtLoc"
                                >
                                   {getFinishData.map(el=>(<option>{el.label}</option>))}
                                </select>
                          </div>}
              <div className="inpuntDiv">
                <label htmlFor="finishTrip">PODAJ PUNKT DOCELOWY</label><br />
                <input
                className="tripInputs"
                type="text"
                name="finishTrip"
                value={getInputsValue.finishTrip}
                onChange={handleTripInputs}
                onClick={()=>setError(null)}
                placeholder="ulica nr domu miasto"
                />
              </div>
                <div className="tripBtnDiv">
                    <button disabled={!getInputsValue.startTrip || !getInputsValue.finishTrip}
                     onClick={()=> handleCheckValidBtn()} type="button" className="btn">WYZNACZ</button>
                </div>
            </section>
        </div>
    )
}

export default TripAdd;