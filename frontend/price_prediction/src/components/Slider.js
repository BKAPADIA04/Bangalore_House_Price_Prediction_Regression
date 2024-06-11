import React from 'react';
import ReactSlider from "react-slider";
import '../css/slider.css';

function Slider(props) {
    // const [sliderValue, setSliderValue] = useState(200);
    
  return (
    <div className='container p-2'>
        <div className="upper-container mb-2 p-2">
            <h4 style={{ fontFamily: 'Arial', color: 'rgb(239, 220, 180)', textAlign: 'left', fontWeight: 'bold' }}>{props.name} - {props.sliderValue}</h4>
        </div>  
        <div className="lower-container">
            {/*<h4 style={{fontFamily: 'Arial',textAlign: 'center'}}>{sliderValue}</h4>*/}
            <ReactSlider
            className="horizontal-slider slider-text"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            value={props.sliderValue}
            onChange={(value) => props.setSliderValue(value)}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            min = {props.min}
            max = {props.max}
        />
        </div>
    </div>
  )
}

export default Slider
