import React, {useEffect} from 'react';
import {MainTable} from '../../../components/table/MainTable';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {addNewPacksCards, setError, setPacksCards} from "./pack-slice";
import {PackModel} from "./PackModel";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderOfCountCards} from "../../../components/Slider/SliderOfCountCards";
import {CircularProgress} from "@mui/material";
import { packErrorSelector, packListIsLoadingSelector} from "../studies-selectors";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import IconButton from "@mui/material/IconButton";
import { ErrorSnackbar } from '../../../components/ErrorSnackBar/ErrorSnackbar';


export const PackList = () => {
    const dispatch = useAppDispatch();
    const model = PackModel()
    const isLoading = useAppSelector(packListIsLoadingSelector)
    const packError = useAppSelector(packErrorSelector)
    useEffect(() => {
        dispatch(setPacksCards())

    }, [])


console.log(packError);

    return (
        <div className={styles.wholeForm}>
            <div className={styles.headerContainer}>
                <h3>Pack List</h3>
                <GeneralButton onClick={()=>{dispatch(addNewPacksCards())}}>Add new pack</GeneralButton>
            </div>
            <div className={styles.tool}>
                <div className={styles.inputContainerPack}>
                    <InputSearch/>
                </div>
                <SliderOfCountCards/>
                <div>
                    <IconButton className={styles.filter}>
                        <FilterAltOffIcon/>
                    </IconButton>
                </div>

            </div>
            {isLoading? <CircularProgress/> : <MainTable model={model}/>}
            {packError != null && <ErrorSnackbar error={packError} changeError={setError}/>}
        </div>
    )
};



