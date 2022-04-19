import {useEffect, useState} from "react";

const Decision = ({setFilter,filter,setMinimum,setMaximum}) => {
    const [min,setMin] = useState(0)
    const [max,setMax] = useState(100);

    useEffect(() => {
        if (min === 0 && max === 100 || min === 100 && max === 0){
            setFilter(false);
        }else {
            setFilter(true);
        }
    }, [min,max])

    const Change = (event,set, setM) => {
        set(parseInt(event.target.value));
        const slider = event.currentTarget.parentElement.firstElementChild;

        setM(parseInt(event.target.value))


        if (min < max) {
            if (event.target.id === filter) {
                slider.style.background = `linear-gradient(to right, #1C1B1BE5 ${event.target.value / 100 * 100}%, #ffd595 ${event.target.value / 100 * 100}%, #ffd595 ${max / 100 * 100}%, #1C1B1BE5 ${max / 100 * 100}%)`
            } else {
                slider.style.background = `linear-gradient(to right, #1C1B1BE5 ${min / 100 * 100}%, #ffd595 ${min / 100 * 100}%, #ffd595 ${event.target.value / 100 * 100}%, #1C1B1BE5 ${event.target.value / 100 * 100}%)`
            }
        }else{
            if (event.target.id === filter) {
                slider.style.background = `linear-gradient(to right, #1C1B1BE5 ${max / 100 * 100}%, #ffd595 ${max / 100 * 100}%, #ffd595 ${event.target.value / 100 * 100}%, #1C1B1BE5 ${event.target.value / 100 * 100}%)`
            } else {
                slider.style.background = `linear-gradient(to right, #1C1B1BE5 ${event.target.value / 100 * 100}%, #ffd595 ${event.target.value / 100 * 100}%, #ffd595 ${min / 100 * 100}%, #1C1B1BE5 ${min / 100 * 100}%)`
            }
        }
    }

    const Clear = event => {
        event.preventDefault();
        const slider = event.currentTarget.previousElementSibling.previousElementSibling.firstElementChild;

        setMin(0);
        setMax(100);
        setFilter(false);

        slider.style.background = `linear-gradient(to right, #1C1B1BE5 0%, #ffd595 0%, #ffd595 100%, #1C1B1BE5 100%)`
    }

    return(
        <>
            <div className='wrapper'>
                <div className='slider'/>
                <input type="range" className="range" id={filter} min='0' max='100' value={min} step='10' onChange={e=>{Change(e,setMin,setMinimum)}}/>
                <input type="range" className="range" min="0" max='100' value={max} step='10' onChange={e=>{Change(e,setMax,setMaximum)}}/>
            </div>
            {min > max ? (
                <div className='sort_form_decision_choose_value'>{max}% - {min}%</div>
            ) : (
                <div className='sort_form_decision_choose_value'>{min}% - {max}%</div>
            )}
            <button className='sort_form_decision_choose_reset' onClick={e => {Clear(e)}}>x</button>
        </>
    )
}

export {Decision}