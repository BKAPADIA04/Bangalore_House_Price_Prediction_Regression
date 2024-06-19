import React,{useState} from 'react';
import '../css/home.css';
import Slider from './Slider';
import SliderStep from './SliderStep';
import LocationSelector from './LocationSelector';
function Home() {

  const [sqftValue, setSqftValue] = useState(300);
  console.log(sqftValue);

  const [bhkValue,setBHKValue] = useState(1);
  console.log(bhkValue);

  const [bathValue,setBathValue] = useState(1);
  console.log(bathValue);

  const [selectedLocation, setSelectedLocation] = useState('');
  console.log(selectedLocation);

  const [price,setPrice] = useState(0);
  console.log(price);

  const [show,setShow] = useState(false);

  const host = "http://localhost:8080/";
  // const host = "https://bangalore-house-price-prediction-wyvt.onrender.com/"
  const handleSubmitAPI = async(event) => {
    event.preventDefault();
    const url = `${host}api/prediction`;
    const response = await fetch(url,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location:selectedLocation,
        sqft:sqftValue,
        bhk:bhkValue,
        bath:bathValue
      })
    });
    const data = await response.json(); // parses JSON response into native JavaScript objects
    console.log(data);
    if(data.prediction <= 0) {
      setShow(false);
      setPrice(`Unavailable`);
    }
    else {
      setShow(true);
      setPrice(data.prediction.toFixed(2) + " Lacs");
    }
  }

  return (
    <div className="square-container container my-2 p-3 border rounded shadow-lg d-flex flex-column align-items-center justify-content-center">
        <div className="flex-container d-flex flex-wrap justify-content-center">
            <div className="sub-container p-3 rounded mb-3">
                <div className="container mt-2 mb-3">
                    <h5 className="text-center custom-text">Get Ahead In The Property Market With Our Smart Forecasting Solution!</h5>
                </div>
                <Slider name = {"SQFT"} min = {300} max = {2000} sliderValue = {sqftValue} setSliderValue = {setSqftValue}/>
                <SliderStep name = {"BHK"} min = {1} max = {10} step = {1} sliderValue = {bhkValue} setSliderValue = {setBHKValue}/>
                <SliderStep name = {"BATH"} min = {1} max = {10} step = {1} sliderValue = {bathValue} setSliderValue = {setBathValue}/>
                <LocationSelector selectedLocation = {selectedLocation} setSelectedLocation = {setSelectedLocation}/>
            </div>
            <div className="sub-container p-3 rounded mb-3 right-container">
              <div className="upper-container-right p-3 m-3">
                <div className="upper-inner-container prediction-text p-5">
                  <h1 style={{'text-align': 'center'}}>House Price Prediction :</h1>
                </div>
                <div class="lower-inner-container price-text">
                  { {show} && (<div class="currency p-2" style={{'text-align': 'center','font-weight': 800}}>Rs.</div>) }
                  <div class="value" style={{'text-align': 'center'}}>{price}</div>
                </div>
              </div>
              <div className="lower-container-right p-3 m-3">
                <button className='button' type = 'submit' onClick={handleSubmitAPI} disabled={selectedLocation === ""}>PREDICT!</button>
              </div>
            </div>
        </div>

      {/*<h1 className="text-center">Bangalore House Price Prediction Model</h1>*/}
    </div>
  )
}

export default Home
