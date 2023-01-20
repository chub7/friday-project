import React, {FC} from 'react';
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../app/store";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

type ButtonSortType = {
    header: string
    sortSelector:(state:AppRootStateType)=>string
    setSort:ActionCreatorWithPayload<{ sort: string }>
}
export const ButtonSort: FC<ButtonSortType> = ({header,sortSelector,setSort}) => {
    const sort = useAppSelector(sortSelector)
    const dispatch = useAppDispatch()
    const handleChange = (sort: string) => {
        dispatch(setSort({sort}))

    }
    //0 убывание с 2023 по 2020
    //1 возр с 2020 по 2023
    return (
        <div>
            {header}

            {sort === '0updated'||sort==='' ?
                <IconButton onClick={() => handleChange('1updated')}>
                    <ArrowDropDownIcon/>
                </IconButton>
                : <IconButton onClick={() => handleChange('0updated')}>
                    <ArrowDropUpIcon/>
                </IconButton>}


        </div>
    );
};

