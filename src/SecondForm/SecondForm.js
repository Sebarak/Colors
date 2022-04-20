import {Decision} from "./Decision";

const SecondForm = ({setFilteredRed,setFilteredSat,setFilteredBlue,setFilteredGreen}) =>{

    return(
        <section className='sort'>
            <form className='sort_form'>
                <h2 className='sort_form_title'>Sort Colors</h2>
                <div className='sort_form_decision'>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Red</h2>
                        <Decision filter='red' setFilter={setFilteredRed}/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Green</h2>
                        <Decision filter='green' setFilter={setFilteredGreen}/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Blue</h2>
                        <Decision filter='blue' setFilter={setFilteredBlue}/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Saturation</h2>
                        <Decision filter='sat' setFilter={setFilteredSat}/>
                    </div>
                </div>
            </form>
        </section>
    )
}

export {SecondForm}