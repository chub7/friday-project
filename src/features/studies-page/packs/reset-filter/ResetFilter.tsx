import React from 'react';
import IconButton from "@mui/material/IconButton";
import styles from "../../studies-page.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useAppDispatch} from "../../../../app/store";
import {
    setCountCard,
    setIsMyPack,
    setPageCountPack,
    setPagePack, setSearchPack,
    setSortPack
} from "../packs-slice";

export const ResetFilter = () => {
    const dispatch=useAppDispatch()

    const handlerResetFilter=()=>{
        dispatch(setSearchPack({value:''}))
        dispatch(setIsMyPack({myPack:''}))
        dispatch(setPagePack({page:1}))
        dispatch(setPageCountPack({count:10}))
        dispatch(setSortPack({sort:''}))
        dispatch(setCountCard({value:[]}))

    }
    return (
        <div>
            <IconButton className={styles.filter} onClick={handlerResetFilter}>
                <FilterAltOffIcon/>
            </IconButton>
        </div>
    );
};

