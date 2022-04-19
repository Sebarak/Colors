import {Decision} from "./Decision";

const SecondForm = ({setFilteredRed,setFilteredSat,setFilteredBlue,setFilteredGreen,setMinR,setMinG,setMinB,setMinS,setMaxR,setMaxG,setMaxB,setMaxS}) =>{

    return(
        <section className='sort'>
            <form className='sort_form'>
                <h2 className='sort_form_title'>Filter Colors</h2>
                <div className='sort_form_decision'>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Red</h2>
                        <Decision setFilter={setFilteredRed} setMaximum={setMaxR} setMinimum={setMinR} filter='red'/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Green</h2>
                        <Decision setFilter={setFilteredGreen} setMaximum={setMaxG} setMinimum={setMinG} filter='green'/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Blue</h2>
                        <Decision setFilter={setFilteredBlue} setMaximum={setMaxB} setMinimum={setMinB} filter='blue'/>
                    </div>
                    <div className='sort_form_decision_choose'>
                        <h2 className='sort_form_decision_choose_title'>Saturation</h2>
                        <Decision setFilter={setFilteredSat} setMaximum={setMaxS} setMinimum={setMinS} filter='sat'/>
                    </div>
                </div>
            </form>
        </section>
    )
}

export {SecondForm}