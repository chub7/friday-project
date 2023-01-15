import React, {useEffect} from 'react';
import {MainTable} from '../../../components/table/MainTable';
import {useAppDispatch} from "../../../app/store";
import {setPacksCards} from "./pack-slice";
import {PackModel} from "./PackModel";
import {packListApi} from "./pack-list-api";
import styles from '../studies-page.module.css'
import {GeneralButton} from "../../../utils/StyleForMUI/StyleForMUI";
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderOfCountCards} from "../../../components/Slider/SliderOfCountCards";


export const PackList = () => {
    const dispatch = useAppDispatch();
    const model = PackModel()

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

            <MainTable
                model={model}
            />
        </div>


    )
        ;
};



