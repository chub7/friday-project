import {Button, styled} from "@mui/material";


const colorsArray: any = {
    blue: {default: '#366EFF', hover: '#2250c8', shadow: '#acbaf6', color: 'white'},
    white: {default: 'white', hover: '#e3e3e3', shadow: '#eae9e9', color: 'black'},
    red: {default: '#FF3636', hover: '#ab2828', shadow: '#f6a0a0', color: 'white'},

}

export const CssButton = styled(Button)(({value = 'blue'}) => ({

    background: colorsArray[`${value}`].default,
    borderRadius: 20,
    color: colorsArray[`${value}`].color,
    fontFamily: 'Montserrat',
    boxShadow: `0px 4px 18px ${colorsArray[`${value}`].shadow}`,
    ':hover': {
        background: colorsArray[`${value}`].hover,
    },
    ':disabled': {
        background: 'rgba(145, 158, 171, 0.08)'

    }


}))