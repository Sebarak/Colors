import {useEffect, useState} from "react";
import {ListElements} from "./ListElements";

const List = ({basicColors, quantity, isRedFiltered, isSatFiltered, isBlueFiltered, isGreenFiltered, maxG, maxR, maxB, maxS, minB, minR, minG, minS}) => {
    const [listOfColors, setListOfColors] = useState([]);
    const [shortcut,setShortcut] = useState([]);
    const [customList ,setCustomList] = useState([]);
    const [customShortcut,setCustomShortcut] = useState([]);
    const [restList, setRestList] = useState([]);
    const [restShortcut,setRestShortcut] = useState([]);

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
        })

        if (isGreenFiltered === false && isBlueFiltered === false && isSatFiltered === false && isRedFiltered === false) {

            sortedHex.map(color => {
                return ConvertRGBtoHex(...color);
            })

            const shortCut = sortedHex.map(color => {
                return ConvertRGBtoHex(...color);
            }).map(color => {
                if (color[1] === color[2] && color[3] === color[4] && color[5] === color[6]) {
                    return ('#' + color[1] + color[3] + color[5]).toUpperCase();
                } else {
                    return ''
                }
            });

            setShortcut(shortCut);
            setListOfColors(sortedHex.map(color => {
                return ConvertRGBtoHex(...color);
            }));
        }else{
            const custom = [];
            const rest = [];

            sortedHex.forEach(color => {
                if ((color[0] <= 255 * maxR/100 && color[0] >= 255 * minR/100) ||
                    (color[1] <= 255 * maxG/100 && color[1] >= 255 * minG/100) ||
                    (color[2] <= 255 * maxB/100 && color[2] >= 255 * minB/100)){
                    custom.push(color);
                }else{
                    rest.push(color);
                }
            })
            setCustomShortcut(custom.map(color => {
                return ConvertRGBtoHex(...color);
            }).map(color => {
                if (color[1] === color[2] && color[3] === color[4] && color[5] === color[6]) {
                    return ('#' + color[1] + color[3] + color[5]).toUpperCase();
                } else {
                    return ''
                }
            }));

            setRestShortcut(rest.map(color => {
                return ConvertRGBtoHex(...color);
            }).map(color => {
                if (color[1] === color[2] && color[3] === color[4] && color[5] === color[6]) {
                    return ('#' + color[1] + color[3] + color[5]).toUpperCase();
                } else {
                    return ''
                }
            }))

            setCustomList(custom.map(color => {
                return ConvertRGBtoHex(...color);
            }))
            setRestList(rest.map(color => {
                return ConvertRGBtoHex(...color);
            }))
        }
    },[quantity,listOfColors,minG,minB,minS,minR,maxB,maxG,maxS,maxR]);



    // useEffect(() => {
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


    return (
        <main className='list_holder'>
            {!isRedFiltered && !isSatFiltered && !isBlueFiltered && !isGreenFiltered ? (
                <>
                    <h1 className='list_title'>All Colors</h1>
                    <ListElements ListOfColors={listOfColors}
                                  basicColors={basicColors}
                                  setListOfColors={setListOfColors}
                                  shortcut={shortcut} />
                </>
                ) : (
                    <>
                        <h1 className='list_title'>Your Conditions</h1>
                        <ListElements basicColors={basicColors}
                                      ListOfColors={customList}
                                      setListOfColors={setCustomList}
                                      shortcut={customShortcut}/>
                        <h1 className='list_title'>Other Colors</h1>
                        <ListElements basicColors={basicColors}
                                      ListOfColors={restList}
                                      setListOfColors={setRestList}
                                      shortcut={restShortcut}/>
                    </>
            )}
        </main>
    )
}

export {List}