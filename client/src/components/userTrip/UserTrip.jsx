import React from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import "./userTrip.css"


const UserTrip = (props) =>{
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    //przekazywanie danych z inputów
    const [valueInputs, setValueInpunts] = React.useState({
        trip_start: '',
        trip_end: ''
    })
   const handleValueInputs = e =>{
    const {name,value} = e.target
        setValueInpunts(prev=>({
            ...prev,
            [name]:value
        }))
    }
     //funkcja onclick sprawdzająca inputy i wysyłająca funkcję do wysłania na serwer
     const history = useNavigate();
     const handleSendBtn = () =>{
        setLoading(true)
        api()
        endapi()
        sendTripDataToBackEnd(data.start_address, data.start_locationId, data.end_address, data.end_locationId)
        if(loading === false || error===false){
            history('/mapsData')
        }
        setValueInpunts(prev=>({
            trip_start: '',
            trip_end: ''
        }))
       }
        
    
    //obieranie api
    const [data, setData] = React.useState({
        start_address: '',
        start_locationId: '',
        end_address:'',
        end_locationId:''
    })
   
    let params = {
        "languages":"pl-PL",
        'maxresults': 1,
        "q": valueInputs.trip_start,
        "apiKey":'vj6ZeiqEI0oPKSuH26h8Upr-yVU2Vxg3dI18VeicHlw'
         }
    const api = async() =>{
        try{
         await axios
         .get('https://geocode.search.hereapi.com/v1/geocode',
        {'params': params})
         .then(response =>{
        const address = response.data.items[0].address
        const id = response.data.items[0].position
         setData(prev=>({
            ...prev,
            start_address: address,
            start_locationId: id
        }))
        setLoading(false)
    })
}
    catch(err){
        if(err.message === "Network Error"){
            setError("WYSTĄPIŁ PROBLEM Z POŁĄCZENIEM SPRÓBUJ PONOWNIE PÓŹNIEJ...") }
        if(error.response){
            console.log(error.response);
        }else if(error.request){
            console.log(error.request);
        }else if(error.message){
            console.log(error.message);}
        setLoading(false)
    }
    }
    let params2 = {
        "languages":"pl-PL",
        'maxresults': 1,
        "q": valueInputs.trip_end,
        "apiKey":'xVjRPNO79Kf3aUZrm2CLHL4B6Xd8DYfe5bbYdphuPfY'
    }
    const endapi = async() =>{
        try{
        await axios
        .get('https://geocode.search.hereapi.com/v1/geocode',
        {'params': params2})
        .then(response=>{
        const endAddress = response.data.items[0].address
        const endId = response.data.items[0].position
        setData(prev=>({
            ...prev,
            end_address: endAddress,
            end_locationId: endId
        }))
        setLoading(false)
        })
         }
        catch(error){
            if(error.message === "Network Error"){
                setError("WYSTĄPIŁ PROBLEM Z POŁĄCZENIEM SPRÓBUJ PONOWNIE PÓŹNIEJ...")
                console.log(error.message);
            }
            if(error.response){
                 console.log(error.message);
             }else if(error.request){
                 console.log(error.message);
             }else if(error.message){
                 console.log(error.message);}
            setLoading(false)
        }
    }
    React.useEffect(()=>{
    if(valueInputs.trip_start === '' || valueInputs.trip_end === ''){
        setError("WSZYSKIE POLA SĄ OBOWIĄZKOWE")
    }else{
        api()
        endapi()
        setError(false)
    }
    },[valueInputs])
   
    //funkcja przekazująca dane na backend
const sendTripDataToBackEnd = (start_address, start_locationId, end_address, end_locationId) =>{
    fetch("api/trip_start",{
        method: "POST",
        body: JSON.stringify({
            start_address: start_address,
            start_locationId: start_locationId,
            end_address: end_address,
            end_locationId: end_locationId
        }),
        headers: { "Content-type": "application/json" }
    })
}
   
return(
    <div className="tripAddContainer">
    {loading && <div>
         <ReactLoading type={"bars"} color={"tomato"} height={467} width={175} className="loading"/>
     <h4 className="loading" style={{color: "black", fontSize: "25px"}}>SPRAWDZAM</h4>
     </div>}
        {error && <div className="errorPanel">{error}</div>}
    <div className="background"></div>
    <section className="titleContener">
        <h2>WYZNACZ SWOJĄ TRASĘ</h2>
    </section>
    <section className="mainContener">
      <div >
        <label htmlFor="startTrip">PODAJ START TRASY</label><br />
        <input 
        id="startTrip"
        className="tripInputsGroup"
        type="text" 
        name="trip_start"
        value={valueInputs.trip_start}
        onChange={handleValueInputs}
        />
      </div>
      <div>
        <label htmlFor="endTrip">PODAJ PUNKT DOCELOWY</label><br />
        <input
        className="tripInputsGroup"
        type="text"
        name="trip_end"
        value={valueInputs.trip_end}
        onChange={handleValueInputs}
        />
      </div>
        <div className="tripBtnDiv">
            <button disabled={!valueInputs.trip_start || !valueInputs.trip_end}
            onClick={()=>handleSendBtn()} type="button" className="btn">WYZNACZ</button>
        </div>
    </section>
</div>

)
}
export default UserTrip;