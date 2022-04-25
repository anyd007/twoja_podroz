import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from "./components/home/Home"
import MapsData from "./components/maps-data/MapsData"
import TripAdd from "./components/trip-add/TripAdd"
import "./App.css"

class App extends Component {
    constructor(props){
        super(props)
        this.state={}

    }


    render(){
        return(
        <Router>
            <div className="App">
                <div className="linkSection">
                    <Link className="links" to="/">STRONA DOMOWA</Link>
                    <Link className="links" to="/tripAdd">WYZNACZANIE TRASY</Link>
                    <Link className="links" to="/mapsData">MAPY</Link>
                </div>
                <div className="contenet">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/tripAdd" element={<TripAdd />}/>
                        <Route path="/mapsData" element={<MapsData />}/>
                    </Routes>
                </div>
            </div>
        </Router>
        )
    }
}

export default App;