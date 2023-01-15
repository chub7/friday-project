import React, {useEffect} from 'react';
import {MainTable} from '../../../components/table/MainTable';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setPacksCards} from "./pack-slice";
import {PackModel} from "./PackModel";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderOfCountCards} from "../../../components/Slider/SliderOfCountCards";
import {CircularProgress} from "@mui/material";
import {packListIsLoadingSelector} from "../studies-selectors";


export const PackList = () => {
    const dispatch = useAppDispatch();
    const model = PackModel()
    const isLoading = useAppSelector(packListIsLoadingSelector)
    useEffect(() => {
        dispatch(setPacksCards())
    }, [])

    return (
        <div className={styles.wholeForm}>
            <div className={styles.headerContainer}>
                <h3>Pack List</h3>
                <GeneralButton>Add new pack</GeneralButton>
            </div>
            <div className={styles.tool}>
                <InputSearch/>
                <SliderOfCountCards/>
            </div>
            {isLoading? <CircularProgress/> : <MainTable model={model}/>}
        </div>
    )
};



