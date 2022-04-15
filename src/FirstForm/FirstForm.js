import {useState} from "react";

const FirstForm = () =>{
    const [value,setValue] = useState('');
    const [hash,setHash] = useState('');

    const handleChange = (event) => {
        let valueValid = /[^a-fA-F0-9]/;
        let replacer = '';
        setHash('#');
        setValue(event.target.value.replace(valueValid, replacer));
    }

    const backspace = (event) =>{
            if (event.key === 'Backspace'){
                if (value === ''){
                    setHash('');
                }
        }
    }

    const handleAdd = (event) => {
        event.preventDefault();
        const storageColors = JSON.parse(localStorage.getItem('Colors'));
        const newColor = ['#'];
        let duplicate = false;

        const addColor = color => {
            storageColors.forEach(colors => {
                if (colors === color){
                    duplicate = true;
                }
            });

            if (duplicate === true){
                localStorage.setItem('Colors',JSON.stringify(storageColors));
            }else{
                storageColors.push(color);
                localStorage.setItem('Colors',JSON.stringify(storageColors));
                setValue('');
                setHash('');
            }
        }

        if (value.length === 3){
            [...value].forEach(letter=>{
                newColor.push(letter,letter);
            })

            addColor(newColor.join(''));

        }else if(value.length === 6){
            newColor.push(value);

            addColor(newColor.join(''));
        }
    }

        return(
            <form onSubmit={handleAdd}>
                <h2>Add Your Color</h2>
                <div className='hash'>{hash}</div>
                <input type="text" value={value} onKeyDown={e=>{backspace(e)}} onChange={e=>{handleChange(e)}} maxLength='6' placeholder='Enter...'/>
                <button>+</button>
            </form>
        )
}

export {FirstForm}