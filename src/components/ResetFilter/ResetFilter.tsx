import React from 'react';
import IconButton from "@mui/material/IconButton";
import styles from "../../features/studies-page/studies-page.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useAppDispatch} from "../../app/store";
import {setSearch} from "../../features/studies-page/pack-list/pack-slice";

export const ResetFilter = () => {
    const dispatch=useAppDispatch()

    const handlerResetFilter=()=>{
        dispatch(setSearch({value:''}))

    }
    return (
        <div>
            <IconButton className={styles.filter} onClick={handlerResetFilter}>
                <FilterAltOffIcon/>
            </IconButton>
        </div>
    );
};

