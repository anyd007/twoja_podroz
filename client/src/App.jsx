import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./components/home/Home"
import MapsData from "./components/maps-data/MapsData"
import UserTrip from "./components/userTrip/UserTrip";
import CalculateTrip from "./components/calculate-trip/CalculateTrip";
import "./App.css"

function App () {
       
    const [selectedMode, setSelectedMode] = React.useState([])
        return(
        <Router>
            <div className="App">
                <div className="linkSection">
                    <Link className="links" to="/">STRONA DOMOWA</Link>
                    <Link className="links" to="/userTrip">WYZNACZ TRASĘ KOLEGO</Link>
                    <Link className="links" to="/mapsData">MAPY</Link>
                    <Link className="links" to="/calculateTrip">calculate</Link>
                </div>
                <div className="contenet">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/mapsData" element={<MapsData setSelectedMode={setSelectedMode}/>}/>
                        <Route path="/userTrip" element={<UserTrip/>}/>
                        <Route path="/calculateTrip" element={<CalculateTrip selectedMode={selectedMode}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
        )
}

export default App;