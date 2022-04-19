import './style/main.scss';
import {FirstForm} from "./FirstForm/FirstForm";
import {useEffect, useState} from "react";
import {SecondForm} from "./SecondForm/SecondForm";
import {List} from "./List/List";

const basicColors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFFFF'];

function App() {
    const [quantity,setQuantity] = useState(0);
    const [isRedFiltered,setFilteredRed] = useState(false);
    const [isGreenFiltered,setFilteredGreen] = useState(false);
    const [isBlueFiltered,setFilteredBlue] = useState(false);
    const [isSatFiltered,setFilteredSat] = useState(false);

    const [minR,setMinR] = useState(0);
    const [minG,setMinG] = useState(0);
    const [minB,setMinB] = useState(0);
    const [minS,setMinS] = useState(0);
    const [maxR,setMaxR] = useState(100);
    const [maxG,setMaxG] = useState(100);
    const [maxB,setMaxB] = useState(100);
    const [maxS,setMaxS] = useState(100);




    useEffect(()=>{
        if (localStorage.getItem('Colors') === null){

            setQuantity(basicColors.length);
            localStorage.setItem('Colors', JSON.stringify(basicColors));
        }
    },[])

  return (
    <div className='container'>
        <FirstForm quantity={setQuantity}/>
        <SecondForm  setFilteredRed={setFilteredRed}
                     setFilteredGreen={setFilteredGreen}
                     setFilteredBlue={setFilteredBlue}
                     setFilteredSat={setFilteredSat}
                     setMinR={setMinR} setMinB={setMinB} setMinG={setMinG} setMinS={setMinS}
                     setMaxR={setMaxR} setMaxB={setMaxB} setMaxG={setMaxG} setMaxS={setMaxS} />
        <List basicColors={basicColors}
              quantity={quantity}
              isRedFiltered={isRedFiltered}
              isGreenFiltered={isGreenFiltered}
              isBlueFiltered={isBlueFiltered}
              isSatFiltered={isSatFiltered}
              minR={minR} minB={minB} minG={minG} minS={minS}
              maxR={maxR} maxB={maxB} maxG={maxG} maxS={maxS}/>
    </div>
  )
}

export default App;
