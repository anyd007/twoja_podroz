import React from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet"
import { Icon } from "leaflet";
import "./mapsData.css"
const position = [51.2181945, 22.5546776]
const MapsData = props =>{

    return(
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />
             <Marker position={position}>
                 <Popup>Testowy popup</Popup>
             </Marker>
            </MapContainer>
        
    )
}

export default MapsData;