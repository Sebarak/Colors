import {useEffect, useState} from "react";

const List = ({basicColors, quantity}) => {
    const [listOfColors, setListOfColors] = useState([]);
    const [shortcut,setShortcut] = useState([]);

    useEffect(()=>{
        const storageColors = JSON.parse(localStorage.getItem('Colors'));

        const hexToRGB = storageColors.map(a => (
            a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                , (m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)
                .map(x => parseInt(x, 16))));

        const ColorToHex = (color) => {
            let hexadecimal = color.toString(16);
            return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
        }

        const ConvertRGBtoHex = (red, green, blue) => {
            return ("#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue)).toUpperCase();
        }

        const sortedHex = hexToRGB.sort((a, b) => {
            if (a[0] === b[0]) {
                if (a[1] === b[1]) {
                    return (a[2] > b[2]) ? -1 : 1;
                } else {
                    return (a[1] > b[1]) ? -1 : 1;
                }
            } else {
                return (a[0] > b[0]) ? -1 : 1;
            }
        }).map(color => {
            return ConvertRGBtoHex(...color);
        })

        const shortCut = sortedHex.map(color=>{
            if (color[1] === color[2] && color[3] === color[4] && color[5] === color[6]){
                return ('#' + color[1] + color[3] + color[5]).toUpperCase();
            }else{
                return ''
            }
        })
        setShortcut(shortCut);
        setListOfColors(sortedHex);

    },[quantity,listOfColors]);



    // useEffect(() => {
    //     if (listOfColors.length !== 0) {
    //         const sortColors = listOfColors;
    //         const sorting = [];
    //         const sortedHEX = []
    //
    //         sortColors.forEach(a => {
    //             const rgb = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    //                 , (m, r, g, b) => '#' + r + r + g + g + b + b)
    //                 .substring(1).match(/.{2}/g)
    //                 .map(x => parseInt(x, 16));
    //
    //             sorting.push(rgb);
    //         });
    //
    //         const rgbToHex = (r, g, b) => '#' + [r, g, b]
    //             .map(x => x.toString(16).padStart(2, '0')).join('')
    //
    //         sorting.sort().reverse().forEach(rgbColor => {
    //
    //             sortedHEX.push(rgbToHex(...rgbColor).toUpperCase());
    //         })
    //
    //         setListOfColors(sortedHEX);
    //     }
        // const styleSheet = document.styleSheets[0];
        // for (let i = 0; i < styleSheet.cssRules.length; i++) {
        //     if (styleSheet.cssRules[i].cssText.indexOf('.picker_') === 0) {
        //         styleSheet.deleteRule(i);
        //     }
        // }
        // listOfColors.forEach((color, index) => {
        //     const padZero = (str, len = 2) => {
        //         let zeros = new Array(len).join('0');
        //         return (zeros + str).slice(-len);
        //     }
        //     let invertColor = color;
        //     if (invertColor.indexOf('#') === 0) {
        //         invertColor = invertColor.slice(1);
        //     }
        //     let red = (255 - parseInt(invertColor.slice(0, 2), 16)).toString(16);
        //     let green = (255 - parseInt(invertColor.slice(2, 4), 16)).toString(16);
        //     let blue = (255 - parseInt(invertColor.slice(4, 6), 16)).toString(16);
        //
        //     invertColor = '#' + padZero(red) + padZero(green) + padZero(blue);
        //
        //     const styleSheet = document.styleSheets[0];
        //     styleSheet.insertRule(
        //         `.picker_${index}{
        //                 background-color: ${color};
        //                 border: 1px solid ${invertColor}
        //                 }`, 0);
        //     styleSheet.insertRule(
        //         `.picker_${index}::before{
        //                 border-right: 1px solid ${invertColor};
        //                 border-top: 1px solid ${invertColor}
        //                 }`, 0);
        //     styleSheet.insertRule(
        //         `.picker_${index}::after{
        //                 background-color: ${color};
        //                 border-right: 1px solid ${invertColor}
        //                 }`, 0);
        // });
    // }, [listOfColors])

    const handleDelete = (event) => {
        const newArrayOfColors = listOfColors.filter(color => {
            return color !== event.target.dataset.color;
        })

        localStorage.setItem('Colors', JSON.stringify(newArrayOfColors));

        setListOfColors(newArrayOfColors);

    }

    return (
        <main className='list_holder'>
            <ul className='list'>
                {listOfColors.map((color, index) => {

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
        </main>
    )
}

export {List}