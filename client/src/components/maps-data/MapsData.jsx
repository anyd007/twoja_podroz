import React from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet"
import { Icon } from "leaflet";
import axios from "axios";
import "./mapsData.css"

const MapsData = props =>{
const startTripIcon = new Icon({
    iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
})
const[startTrip, setStartTrip] = React.useState({
    startTripName:'',
    startTripLatitude:'',
    startTripLongitude:''
})

const handleStartCoordinate = () =>{
    axios
    .get("api/trip_start")
    .then(res =>{
        console.log(res.data);
    const start_location = res.data[res.data.length - 1].start_address.label
    const start_latitude = res.data[res.data.length - 1].start_locationId.lat
    const start_longitude = res.data[res.data.length - 1].start_locationId.lng
    setStartTrip({
        startTripName: start_location,
        startTripLatitude: start_latitude,
        startTripLongitude: start_longitude
    })
    })
    .catch(err=>{
        console.log(err.message);
    })
}
React.useEffect(()=>{
    handleStartCoordinate()
},[])
const position = [startTrip.startTripLatitude, startTrip.startTripLongitude]
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

const [getLabel, setGetLabel] = React.useState(null)
console.log(startTrip);

    return(
           <MapContainer center={position} zoom={13} scrollWheelZoom={false}> 
           <ChangeView center={position} zoom={13} />
            <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
            {startTrip && (<Marker position={[startTrip.startTripLatitude, startTrip.startTripLongitude]}
                 eventHandlers={{
                    click: (e) => {
                        setGetLabel(startTrip)
                    },
                    mouseout: (e) => {
                      setTimeout(() => {
                        setGetLabel(null)
                      }, 3000);
                    }
                  }}
                  icon={startTripIcon}
                  />)}
             {getLabel && (<Popup 
                position={[getLabel.startTripLatitude, getLabel.startTripLongitude]}> 
                <div>
                    <h4>{getLabel.startTripName}</h4>
                </div>
                </Popup>)}
            </MapContainer> 

    )
}

export default MapsData;