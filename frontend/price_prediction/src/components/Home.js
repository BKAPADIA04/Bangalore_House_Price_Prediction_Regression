import React,{useState} from 'react';
import '../css/home.css';
import Slider from './Slider';
import SliderStep from './SliderStep';
import LocationSelector from './LocationSelector';
function Home() {

  const [sqftValue, setSqftValue] = useState(200);
  console.log(sqftValue);

  const [bhkValue,setBHKValue] = useState(1);
  console.log(bhkValue);

  const [bathValue,setBathValue] = useState(1);
  console.log(bathValue);

  const [selectedLocation, setSelectedLocation] = useState('');
  console.log(selectedLocation);



  return (
    <div className="square-container container my-2 p-3 border rounded shadow-lg d-flex flex-column align-items-center justify-content-center">
        <div className="flex-container d-flex flex-wrap justify-content-center">
            <div className="sub-container p-3 border rounded mb-3">
                <div className="container mt-2 mb-3">
                    <h5 className="text-center custom-text">Get Ahead In The Property Market With Our Smart Forecasting Solution!</h5>
                </div>
                <Slider name = {"SQFT"} min = {200} max = {2000} sliderValue = {sqftValue} setSliderValue = {setSqftValue}/>
                <SliderStep name = {"BHK"} min = {1} max = {10} step = {1} sliderValue = {bhkValue} setSliderValue = {setBHKValue}/>
                <SliderStep name = {"BATH"} min = {1} max = {10} step = {1} sliderValue = {bathValue} setSliderValue = {setBathValue}/>
                <LocationSelector selectedLocation = {selectedLocation} setSelectedLocation = {setSelectedLocation}/>
            </div>
            <div className="sub-container p-3 border rounded mb-3 right-container">
              <div className="upper-container-right p-3 m-3">
                <div className="upper-inner-container prediction-text p-5">
                  <h1 style={{'text-align': 'center'}}>House Price Prediction :</h1>
                </div>
                <div class="lower-inner-container price-text">
                  <div class="currency p-2" style={{'text-align': 'center','font-weight': 800}}>Rs.</div>
                  <div class="value" style={{'text-align': 'center'}}>2,70,00,000</div>
                </div>
              </div>
              <div className="lower-container-right p-3 m-3">
                <button className='button'>PREDICT!</button>
              </div>
            </div>
        </div>

      {/*<h1 className="text-center">Bangalore House Price Prediction Model</h1>*/}
    </div>
  )
}

export default Home
