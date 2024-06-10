import React from 'react';
import '../css/home.css';
import Slider from './Slider';
import SliderStep from './SliderStep';
import LocationSelector from './LocationSelector';
function Home() {
  return (
    <div className="square-container container my-2 p-3 border rounded shadow-lg d-flex flex-column align-items-center justify-content-center">
        <div className="flex-container d-flex flex-wrap justify-content-center">
            <div className="sub-container p-3 border rounded mb-3">
                <div className="container mt-2 mb-3">
                    <h5 className="text-center custom-text">Get Ahead In The Property Market With Our Smart Forecasting Solution!</h5>
                </div>
                <Slider name = {"SQFT"} min = {200} max = {2000}/>
                <SliderStep name = {"BHK"} min = {1} max = {10} step = {1}/>
                <SliderStep name = {"BATH"} min = {1} max = {10} step = {1}/>
                <LocationSelector/>
            </div>
            <div className="sub-container p-3 border rounded mb-3">
            </div>
        </div>
      {/*<h1 className="text-center">Bangalore House Price Prediction Model</h1>*/}
    </div>
  )
}

export default Home
