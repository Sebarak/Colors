import {useEffect, useState} from "react";

const List = ({basicColors, quantity}) => {
    const [listOfColors, setListOfColors] = useState([]);

    useEffect(()  => {
        const storageColors = JSON.parse(localStorage.getItem('Colors'));

        setListOfColors(storageColors);

    }, [quantity]);

    useEffect(()=>{


    },[listOfColors])

    return (
        <main className='list_holder'>
            <ul className='list'>
                {listOfColors.map((color, index) => {
                    const styleSheet = document.styleSheets[0];
                    styleSheet.insertRule(
                        `.picker_${index},
                        .picker_${index}::before,
                        .picker_${index}::after{
                        background-color: ${color};
                        border: 1px solid ${color}
                        }`
                        ,0);

                    if (basicColors.indexOf(color) < 0) {
                        return (
                            <li key={color} className='list_item'>
                                <div className={`list_item_picker picker_${index}`} />
                                <div className='list_item_'>
                                    <span className='list_item__index'>{index + 1}.</span>
                                    <h4 className='list_item__color'>{color}</h4>
                                    <p className='list_item__shortcut'>shortcut</p>
                                    <div className='list_item__delete'>x</div>
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <li key={color} className='list_item'>
                                <div className={`list_item_picker picker_${index}`} />
                                <div className='list_item_'>
                                    <span className='list_item__index'>{index + 1}.</span>
                                    <h4 className='list_item__color'>{color}</h4>
                                    <p className='list_item__shortcut'>shortcut</p>
                                    <div className='list_item__cover' />
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
        </main>
    )
}

export {List}