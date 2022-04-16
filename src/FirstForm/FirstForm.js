import {Component} from "react";

class FirstForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            hash: ''
        }
    }

    handleChange(event) {
        let valueValid = /[^a-fA-F0-9]/;
        let replacer = '';
        this.setState({value: event.target.value.replace(valueValid, replacer), hash: '#'})
    }

    backspace(event) {
        if (event.key === 'Backspace') {
            if (this.state.value === '') {
                this.setState({hash: ''});
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
            <form onSubmit={this.handleAdd.bind(this)} className='add_form'>
                <h2 className='add_form_title'>Add Your Color</h2>
                <div className='add_form_hash'>{this.state.hash}</div>
                <input type="text" className='add_form_input'
                       value={this.state.value}
                       onKeyDown={this.backspace.bind(this)}
                       onChange={this.handleChange.bind(this)}
                       maxLength='6' placeholder='Enter...'/>
                <button className='add_form_submit'>+</button>
            </form>
        )
    }
}

export {FirstForm}