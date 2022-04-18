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



    useEffect(()=>{
        if (localStorage.getItem('Colors') === null){

            setQuantity(basicColors.length);
            localStorage.setItem('Colors', JSON.stringify(basicColors));
        }
    },[])

  return (
    <div className='container'>
        <FirstForm quantity={setQuantity}/>
        <SecondForm  setFilteredRed={setFilteredRed} setFilteredGreen={setFilteredGreen} setFilteredBlue={setFilteredBlue} setFilteredSat={setFilteredSat}/>
        <List basicColors={basicColors} quantity={quantity}/>
    </div>
  )
}

export default App;
