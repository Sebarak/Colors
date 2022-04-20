import {Component} from "react";

class FirstForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            hash: '',
            placeholder: 'Type here...',
            snipped: false,
            bgColor: '',
            isModal: false
        }
    }

    handleChange(event) {
        let valueValid = /[^a-fA-F0-9]/;
        let replacer = '';

        this.setState({value: event.target.value.replace(valueValid, replacer)});
        if (event.target.value.replace(valueValid, replacer) !== ''|| event.target.value === '#'){
            this.setState({hash: '#', placeholder: ''});
        }
        if (event.target.value.replace(valueValid,replacer).length === 3 || event.target.value.replace(valueValid,replacer).length === 6){
            this.setState({snipped: true, bgColor: `#${event.target.value}`});
        }else{
            this.setState({snipped: false, bgColor: ''});
        }
    }

    backspace(event) {
        if (event.key === 'Backspace') {
            if (this.state.value === '') {
                this.setState({hash: '', placeholder: 'Type here...'});
            }
        }
    }

    handleAdd(event) {
        event.preventDefault();
        const storageColors = JSON.parse(localStorage.getItem('Colors'));
        const newColor = ['#'];
        let duplicate = false;

        const addColor = color => {
            storageColors.forEach(colors => {
                if (colors === color.toUpperCase()) {
                    duplicate = true;
                }
            });

            if (duplicate === true) {
                localStorage.setItem('Colors', JSON.stringify(storageColors));
            } else {
                storageColors.push(color.toUpperCase());
                localStorage.setItem('Colors', JSON.stringify(storageColors));
                this.setState({value: '', hash: '',placeholder: 'Type here...'})
                this.props.quantity(storageColors.length);
                this.setState({snipped: false})
            }
        }

        if (this.state.value.length === 3) {
            [...this.state.value].forEach(letter => {
                newColor.push(letter, letter);
            })

            addColor(newColor.join(''));

        } else if (this.state.value.length === 6) {
            newColor.push(this.state.value);

            addColor(newColor.join(''));
        }
    }

    mouseEnter(){
        this.setState({isModal: true})
    }

    mouseLeave(){
        this.setState({isModal: false});
    }

    mouseClick(){
        this.setState({isModal: prev => !prev});
    }

    render() {
        return (
            <section className='add'>
                <form onSubmit={this.handleAdd.bind(this)} className='add_form'>
                    <h2 className='add_form_title'>Add Your Color</h2>
                    <div className='add_form_decision'>
                        <div className='add_form_decision_info' onClick={this.mouseClick.bind(this)} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>?</div>
                        {this.state.isModal && <div className='add_form_decision_info_modal'>A hexadecimal color is specified with: #RRGGBB.
                            RR (red), GG (green) and BB (blue) are hexadecimal integers between 00 and FF specifying the intensity of the color. Shortcuts are created when the number in each color pair is the same (00, 77, ee, etc).</div>}
                        {this.state.snipped && <div className='add_form_decision_snipped' style={{backgroundColor: this.state.bgColor}}/>}
                        <span className='add_form_decision_hash'>{this.state.hash}</span>
                        <input type="text" className='add_form_decision_input'
                               value={this.state.value}
                               onKeyDown={this.backspace.bind(this)}
                               onChange={this.handleChange.bind(this)}
                               maxLength='6' placeholder={this.state.placeholder}/>
                        <button className='add_form_decision_submit'>+</button>
                    </div>
                </form>
            </section>
        )
    }
}

export {FirstForm}