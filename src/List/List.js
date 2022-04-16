import {useEffect, useState} from "react";

const List = ({basicColors, quantity}) => {
    const [listOfColors, setListOfColors] = useState([]);

    useEffect(()  => {
        const storageColors = JSON.parse(localStorage.getItem('Colors'));

        setListOfColors(storageColors);

        listOfColors.forEach((color, index) => {
            const padZero = (str, len = 2) => {
                let zeros = new Array(len).join('0');
                return (zeros + str).slice(-len);
            }
            let invertColor = color;
            if (invertColor.indexOf('#') === 0) {
                invertColor = invertColor.slice(1);
            }
            let red = (255 - parseInt(invertColor.slice(0, 2), 16)).toString(16);
            let green = (255 - parseInt(invertColor.slice(2, 4), 16)).toString(16);
            let blue = (255 - parseInt(invertColor.slice(4, 6), 16)).toString(16);

            invertColor = '#' + padZero(red) + padZero(green) + padZero(blue);

            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(
                `.picker_${index}{
                        background-color: ${color};
                        border: 1px solid ${invertColor}
                        }`, 0);
            styleSheet.insertRule(
                `.picker_${index}::before{
                        border-right: 1px solid ${invertColor};
                        border-top: 1px solid ${invertColor}
                        }`, 0);
            styleSheet.insertRule(
                `.picker_${index}::after{
                        background-color: ${color};
                        border-right: 1px solid ${invertColor}
                        }`, 0);
        });
    }, [quantity, listOfColors]);

    const handleDelete = (event) => {
        const newArrayOfColors = listOfColors.filter(color => {
            return color !== event.target.parentElement.dataset.color;
        })

        localStorage.setItem('Colors', JSON.stringify(newArrayOfColors));
        const styleSheet = document.styleSheets[0];
        console.log(styleSheet.cssRules)

        setListOfColors(newArrayOfColors);

    }

    return (
        <main className='list_holder'>
            <ul className='list'>
                {listOfColors.map((color, index) => {
                    if (basicColors.indexOf(color) < 0) {
                        return (
                            <li key={color} className='list_item'>
                                <div className={`list_item_picker picker_${index}`} />
                                <div className='list_item_' data-color={color}>
                                    <span className='list_item__index'>{index + 1}.</span>
                                    <h4 className='list_item__color'>{color}</h4>
                                    <p className='list_item__shortcut'>shortcut</p>
                                    <div className='list_item__delete' onClick={e => {handleDelete(e)}}>x</div>
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