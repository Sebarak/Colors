import './style/main.scss';
import {FirstForm} from "./FirstForm/FirstForm";
import {useEffect, useState} from "react";
// import {SecondForm} from "./SecondForm/SecondForm";
import {List} from "./List/List";

const basicColors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFFFF'];

function App() {
    const [quantity,setQuantity] = useState(0);



    useEffect(()=>{
        if (localStorage.getItem('Colors') === null){

            setQuantity(basicColors.length);
            localStorage.setItem('Colors', JSON.stringify(basicColors));
        }
    },[])

  return (
    <div className='container'>
        <FirstForm quantity={setQuantity}/>
        {/*<SecondForm />*/}
        <List basicColors={basicColors} quantity={quantity}/>
    </div>
  )
}

export default App;
