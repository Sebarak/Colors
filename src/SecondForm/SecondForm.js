import {Decision} from "./Decision";

const SecondForm = ({setFilteredRed,setFilteredSat,setFilteredBlue,setFilteredGreen}) =>{

    return(
        <section className='sort'>
            <form className='sort_form'>
                <h2 className='sort_form_title'>Filter Colors</h2>
                <div className='sort_form_decision'>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Red</h2>
                        <Decision setFilter={setFilteredRed} filter='red'/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Green</h2>
                        <Decision setFilter={setFilteredGreen} filter='green'/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Blue</h2>
                        <Decision setFilter={setFilteredBlue} filter='blue'/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Saturation</h2>
                        <Decision setFilter={setFilteredSat} filter='sat'/>
                    </div>
                </div>
            </form>
        </section>
    )
}

export {SecondForm}