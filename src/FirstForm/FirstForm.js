import {Component} from "react";

class FirstForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newColor: ''
        };
    }

    // handleChange(event){
    //     const hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    //     const color = [...event.target.value];
    //
    //     color.forEach(el=>{
    //         hex.forEach(str=>{
    //             if (el===str){
    //                 this.setState(()=>({
    //                     newColor: event.target.value
    //                 }))
    //             }
    //         })
    //     })
    // }

    handleKeyDown(event){
        if (event.key === 'a'){
            console.log('siu');
        }
    }

    handleAdd(event){
        event.preventDefault();

    }

    render() {
        return(
            <form onSubmit={this.handleAdd}>
                <h2>Add Your Color</h2>
                <input type="text" value={this.state.newColor} onKeyDown={this.handleKeyDown}/>
                <button>+</button>
            </form>
        )
    }
}

export {FirstForm}