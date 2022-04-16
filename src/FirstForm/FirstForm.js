import {Component} from "react";

class FirstForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            hash: '',
            placeholder: 'Type here...'
        }
    }

    handleChange(event) {
        let valueValid = /[^a-fA-F0-9]/;
        let replacer = '';
        this.setState({value: event.target.value.replace(valueValid, replacer)});
        if (event.target.value.replace(valueValid, replacer) !== ''|| event.target.value === '#'){
            this.setState({hash: '#', placeholder: ''});
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
                if (colors === color) {
                    duplicate = true;
                }
            });

            if (duplicate === true) {
                localStorage.setItem('Colors', JSON.stringify(storageColors));
            } else {
                storageColors.push(color);
                localStorage.setItem('Colors', JSON.stringify(storageColors));
                this.setState({value: '', hash: ''})
                this.props.quantity(storageColors.length);
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

    render() {
        return (
            <section className='add'>
                <form onSubmit={this.handleAdd.bind(this)} className='add_form'>
                    <h2 className='add_form_title'>Add Your Color</h2>
                    <div className='add_form_decision'>
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