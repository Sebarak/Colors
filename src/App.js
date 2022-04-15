import {FirstForm} from "./FirstForm/FirstForm";
import {useEffect} from "react";
// import {SecondForm} from "./SecondForm/SecondForm";
// import {List} from "./List/List";

function App() {
    useEffect(()=>{
        if (localStorage.getItem('Colors') === null){
            localStorage.setItem('Colors', JSON.stringify([]));
        }
    },[])
  return (
    <div className='container'>
        <FirstForm />
        {/*<SecondForm />*/}
        {/*<List />*/}
    </div>
  )
}

export default App;
