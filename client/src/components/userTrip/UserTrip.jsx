import React from "react";
import axios from "axios";


const UserTrip = () =>{
    const [loading, setLoading] = React.useState(false)

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
    
    //obieranie api
    const [data, setData] = React.useState({
       'start_address': '',
      'start_locationId': ''
    })
    console.log(data);
    let params = {
        "languages":"pl-PL",
        'maxresults': 1,
        "q": valueInputs.trip_start,
        "apiKey":'vj6ZeiqEI0oPKSuH26h8Upr-yVU2Vxg3dI18VeicHlw'
         }
    const api = () =>{
        setLoading(true)
    axios.get('https://geocode.search.hereapi.com/v1/geocode',
    {'params': params})
    .then(response =>{
        const address = response.data.items[0].address
        const id = response.data.items[0].position
        setData({
            "start_address": address,
            "start_locationId": id
        })
        setLoading(false)
    })
    
    .catch(err=>{
        console.log(err.message);
        setLoading(false)
    })
    }
    //funkcja onclick sprawdzająca inputy i wysyłająca funkcję do wysłania na serwer
    const handleSendBtn = () =>{
        api()
    }

return(
    <div className="tripAddContainer">
        {loading && <div><h4>SPRAWDZAM...</h4></div>}
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
            <button onClick={()=>handleSendBtn()} type="button" className="btn">WYZNACZ</button>
        </div>
    </section>
</div>

)
}
export default UserTrip;