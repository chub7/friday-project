import {Button, styled} from "@mui/material";

type ColorsArrayType = {
    [key: string]: {
        default: string
        hover: string
        shadow: string
        color: string
    }
}
const colorsArray: ColorsArrayType = {
    blue: {default: '#366EFF', hover: '#2250c8', shadow: '#acbaf6', color: 'white'},
    white: {default: 'white', hover: '#e3e3e3', shadow: '#eae9e9', color: 'black'},
    red: {default: '#FF3636', hover: '#ab2828', shadow: '#f6a0a0', color: 'white'},
}

export const GeneralButton = styled(Button)(({value = 'blue'}) => ({
    textTransform: 'none',
    background: colorsArray[`${value}`].default,
    borderRadius: 20,
    color: colorsArray[`${value}`].color,
    fontFamily: 'Montserrat',
    paddingLeft:30,
    paddingRight: 30,
    boxShadow: `0px 4px 18px ${colorsArray[`${value}`].shadow}`,
    ':hover': {
        background: colorsArray[`${value}`].hover,
    },
    ':disabled': {
        background: 'rgba(145, 158, 171, 0.08)'
    }

}))

export const ButtonForGroup = styled(Button)(() => ({
    fontFamily: 'Montserrat',
    width: '100px',
    border: '1px solid #D9D9D9',
}))

export const styleForTableRow={
    padding:'4px',
    paddingLeft:'12px',
}