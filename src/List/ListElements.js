const ListElements = ({ListOfColors, basicColors, shortcut, setListOfColors}) => {

    const handleDelete = (event) => {
        const newArrayOfColors = ListOfColors.filter(color => {
            return color !== event.target.dataset.color;
        })

        localStorage.setItem('Colors', JSON.stringify(newArrayOfColors));

        setListOfColors(newArrayOfColors);

    }

    return(
    <ul className='list'>
        {ListOfColors.map((color, index) => {

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

            const inlineStyle = {backgroundColor: `${color}`, borderColor: `${invertColor}`}

            if (basicColors.indexOf(color) < 0) {
                return (
                    <li key={color} className='list_item'>
                        <div className={`list_item_picker picker_${index}`} style={inlineStyle}/>
                        <div className="decorate">
                            <div className="right_arrow" style={inlineStyle}/>
                            <div className="left_arrow" style={inlineStyle}/>
                        </div>
                        <div className='list_item_' >
                            <span className='list_item__index'>{index + 1}.</span>
                            <h4 className='list_item__color'>{color}</h4>
                            <p className='list_item__shortcut'>{shortcut[index]}</p>
                            <div className='list_item__delete' data-color={color} onClick={e => {handleDelete(e)}}>x</div>
                        </div>
                    </li>
                )
            } else {
                return (
                    <li key={color} className='list_item'>
                        <div className={`list_item_picker picker_${index}`} style={inlineStyle}/>
                        <div className="decorate">
                            <div className="right_arrow" style={inlineStyle}/>
                            <div className="left_arrow" style={inlineStyle}/>
                        </div>
                        <div className='list_item_'>
                            <span className='list_item__index'>{index + 1}.</span>
                            <h4 className='list_item__color'>{color}</h4>
                            <p className='list_item__shortcut'>{shortcut[index]}</p>
                            <div className='list_item__cover' />
                        </div>
                    </li>
                )
            }
        })}
    </ul>
    )
}

export {ListElements}