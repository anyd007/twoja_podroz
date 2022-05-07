import React from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet"
import { Icon, marker } from "leaflet";
import axios from "axios";
import uniqid from "uniqid"
import ReactLoading from 'react-loading';
import "./mapsData.css"

const MapsData = props =>{
const [loading, setLoading] = React.useState(true)
const startTripIcon = new Icon({
    iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
})
const[trip, setTrip] = React.useState([])
React.useEffect(()=>{
 axios
    .get("api/trip_start")
    .then(res =>{
    const start_location = res.data[res.data.length - 1].start_address.label
    const start_latitude = res.data[res.data.length - 1].start_locationId.lat
    const start_longitude = res.data[res.data.length - 1].start_locationId.lng
    const end_location = res.data[res.data.length - 1].end_address.label
    const end_latitude = res.data[res.data.length - 1].end_locationId.lat
    const end_longitude = res.data[res.data.length - 1].end_locationId.lng
    const markers = [
        {
            location:start_location,
            lat: start_latitude,
            lng:start_longitude,
            id: uniqid()
        },
        {
            location:end_location,
            lat:end_latitude,
            lng:end_longitude,
            id: uniqid()
        }
    ]
    setTrip({
       markers:markers
    })
    setLoading(false)
    })
    
    .catch(err=>{
        console.log(err.message);
    })
      
},[setTrip])

const [getLabel, setGetLabel] = React.useState(null)

    return(
        <>
            {loading && <div>
         <ReactLoading type={"bars"} color={"tomato"} height={467} width={175} className="loading"/>
     <h4 className="loading" style={{color: "black", fontSize: "25px"}}>SPRAWDZAM</h4>
     </div>}
          { trip.markers && trip.markers.slice(0,1).map(el=>(<MapContainer center={[el.lat, el.lng]} zoom={7} scrollWheelZoom={false}>
            <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
            {trip.markers
            ? trip.markers.map(el => (
            <Marker key={el.id} position={[el.lat, el.lng]}
                 eventHandlers={{
                    mouseover: (e) => {
                        setGetLabel(el)
                    },
                    mouseout: (e) => {
                      setTimeout(() => {
                        setGetLabel(null)
                      }, 3000);
                    }
                  }}
                  icon={startTripIcon}
                  />)): setInterval(() => {
                     return null
                  }, 1000)}
             {getLabel && (<Popup 
                position={[getLabel.lat, getLabel.lng]}> 
                <div>
                    <h4>{getLabel.location}</h4>
                </div>
                </Popup>)}
            </MapContainer> ))}
        </>
    )
}

export default MapsData;