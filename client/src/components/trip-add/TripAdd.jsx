import React from "react";
import "./tripAdd.css"


const TripAdd = props =>{


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
                />
              </div>
              <div className="inpuntDiv">
                <label htmlFor="finishTrip">PODAJ PUNKT DOCELOWY</label><br />
                <input
                className="tripInputs"
                type="text"
                name="finishTrip"
                />
              </div>
                <div className="tripBtnDiv">
                    <button type="button" className="btn">WYZNACZ</button>
                </div>
            </section>
        </div>
    )
}

export default TripAdd;