import {useEffect, useState} from "react";
import {ListElements} from "./ListElements";

const List = ({basicColors, quantity, isRedFiltered, isSatFiltered, isBlueFiltered, isGreenFiltered, maxG, maxR, maxB, maxS, minB, minR, minG, minS}) => {
    const [listOfColors, setListOfColors] = useState([]);
    const [shortcut,setShortcut] = useState([]);
    const [customList ,setCustomList] = useState([]);
    const [customShortcut,setCustomShortcut] = useState([]);
    const [restList, setRestList] = useState([]);
    const [restShortcut,setRestShortcut] = useState([]);
    const [sort, setSort] = useState([])

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
        });

        setSort(hexToRGB.sort((a, b) => {
            if (a[0] === b[0]) {
                if (a[1] === b[1]) {
                    return (a[2] > b[2]) ? -1 : 1;
                } else {
                    return (a[1] > b[1]) ? -1 : 1;
                }
            } else {
                return (a[0] > b[0]) ? -1 : 1;
            }
        }));


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
            const hsl = [];

            const rgbToHsl = array => {array.forEach(color => {

                color[0] /= 255;
                color[1] /= 255;
                color[2] /= 255;

                let min = Math.min(color[0],color[1],color[2]),
                    max = Math.max(color[0],color[1],color[2]),
                    delta = max - min,
                    h = 0,
                    s = 0,
                    l = 0;

                if (delta === 0) {
                    h = 0;

                }else if(max === color[0]) {
                    h = ((color[1] - color[2]) / delta) % 6;

                }else if (max === color[1]) {
                    h = (color[2] - color[0]) / delta + 2;

                }else {
                    h = (color[0] - color[1]) / delta + 4;

                }

                h = Math.round(h * 60);

                if (h < 0) {
                    h += 360;
                }

                l = (max + min) / 2;

                s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

                s = +(s * 100).toFixed(1);
                l = +(l * 100).toFixed(1);

                hsl.push([h,s,l]);
            })};

            const hslToRgb = (array) => {
                array[1] /= 100;
                array[2] /= 100;

                let c = (1 - Math.abs(2 * array[2] - 1)) * array[1],
                    x = c * (1 - Math.abs((array[0] / 60) % 2 - 1)),
                    m = array[2] - c/2,
                    r = 0,
                    g = 0,
                    b = 0;

                if (0 <= array[0] && array[0] < 60) {
                    r = c; g = x; b = 0;
                } else if (60 <= array[0] && array[0] < 120) {
                    r = x; g = c; b = 0;
                } else if (120 <= array[0] && array[0] < 180) {
                    r = 0; g = c; b = x;
                } else if (180 <= array[0] && array[0] < 240) {
                    r = 0; g = x; b = c;
                } else if (240 <= array[0] && array[0] < 300) {
                    r = x; g = 0; b = c;
                } else if (300 <= array[0] && array[0] < 360) {
                    r = c; g = 0; b = x;
                }
                r = Math.round((r + m) * 255);
                g = Math.round((g + m) * 255);
                b = Math.round((b + m) * 255);

                return [r,g,b];
            }

            if (isRedFiltered && !isGreenFiltered && !isBlueFiltered && !isSatFiltered) {
                sortedHex.forEach(color => {
                    if (color[0] > 127) {
                        custom.push(color);
                    } else {
                        rest.push(color);
                    }
                })
            }else if (!isRedFiltered && isGreenFiltered && !isBlueFiltered && !isSatFiltered){
                sortedHex.forEach(color => {
                    if (color[1] > 127) {
                        custom.push(color);
                    } else {
                        rest.push(color);
                    }
                })
            }else if (!isRedFiltered && !isGreenFiltered && isBlueFiltered && !isSatFiltered){
                sortedHex.forEach(color => {
                    if (color[2] > 127) {
                        custom.push(color);
                    } else {
                        rest.push(color);
                    }
                })
            }else if (!isRedFiltered && !isGreenFiltered && !isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach(color => {
                    if (color[1] > 50) {
                        custom.push(hslToRgb(color));
                    } else {
                        rest.push(hslToRgb(color));
                    }
                })
            }else if (isRedFiltered && isGreenFiltered && !isBlueFiltered && !isSatFiltered){
                sortedHex.forEach(color => {
                    if (color[0] > 127 && color[1] > 127) {
                        custom.push(color);
                    } else {
                        rest.push(color);
                    }
                })
            }else if (isRedFiltered && !isGreenFiltered && isBlueFiltered && !isSatFiltered){
                sortedHex.forEach(color => {
                    if (color[0] > 127 && color[2] > 127) {
                        custom.push(color);
                    } else {
                        rest.push(color);
                    }
                })
            }else if (isRedFiltered && !isGreenFiltered && !isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach((color,index) => {
                    if (color[1] > 50 && sort[index][0] > 127){
                        custom.push(hslToRgb(color))
                    }else{
                        rest.push(hslToRgb(color))
                    }
                })
            }else if (!isRedFiltered && isGreenFiltered && isBlueFiltered && !isSatFiltered){
                sortedHex.forEach(color => {
                    if (color[1] > 127 && color[2] > 127) {
                        custom.push(color);
                    } else {
                        rest.push(color);
                    }
                })
            }else if (!isRedFiltered && isGreenFiltered && !isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach((color,index) => {
                    if (color[1] > 50 && sort[index][1] > 127){
                        custom.push(hslToRgb(color))
                    }else{
                        rest.push(hslToRgb(color))
                    }
                })
            }else if (!isRedFiltered && !isGreenFiltered && isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach((color,index) => {
                    if (color[1] > 50 && sort[index][2] > 127){
                        custom.push(hslToRgb(color))
                    }else{
                        rest.push(hslToRgb(color))
                    }
                })
            }else if (isRedFiltered && isGreenFiltered && isBlueFiltered && !isSatFiltered){
                sortedHex.forEach(color => {
                    if (color[0] > 127 && color[1] > 127 && color[2] > 127) {
                        custom.push(color);
                    } else {
                        rest.push(color);
                    }
                })
            }else if (isRedFiltered && isGreenFiltered && !isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach((color,index) => {
                    if (color[1] > 50 && sort[index][0] > 127 && sort[index][1] > 127){
                        custom.push(hslToRgb(color))
                    }else{
                        rest.push(hslToRgb(color))
                    }
                })
            }else if (isRedFiltered && !isGreenFiltered && isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach((color,index) => {
                    if (color[1] > 50 && sort[index][0] > 127 && sort[index][2] > 127){
                        custom.push(hslToRgb(color))
                    }else{
                        rest.push(hslToRgb(color))
                    }
                })
            }else if (!isRedFiltered && isGreenFiltered && isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach((color,index) => {
                    if (color[1] > 50 && sort[index][1] > 127 && sort[index][2] > 127){
                        custom.push(hslToRgb(color))
                    }else{
                        rest.push(hslToRgb(color))
                    }
                })
            }else if (isRedFiltered && isGreenFiltered && isBlueFiltered && isSatFiltered){
                rgbToHsl(sortedHex);
                hsl.forEach((color,index) => {
                    if (color[1] > 50 && sort[index][0] > 127 && sort[index][1] > 127 && sort[index][2] > 127){
                        custom.push(hslToRgb(color))
                    }else{
                        rest.push(hslToRgb(color))
                    }
                })
            }


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

    },[quantity,listOfColors,isBlueFiltered,isGreenFiltered,isSatFiltered,isRedFiltered]);



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
                        {customList.length !== 0 ? (
                        <ListElements basicColors={basicColors}
                                      ListOfColors={customList}
                                      setListOfColors={setCustomList}
                                      shortcut={customShortcut}/>
                            ) : <h3>No matches...</h3>}
                        <h1 className='list_title'>Other Colors</h1>
                        {restList.length !== 0 ? (
                        <ListElements basicColors={basicColors}
                                      ListOfColors={restList}
                                      setListOfColors={setRestList}
                                      shortcut={restShortcut}/>
                            ) : <h3>No matches...</h3>}
                    </>
            )}
        </main>
    )
}

export {List}