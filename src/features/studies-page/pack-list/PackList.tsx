import React from 'react';
import styles from '../studies-page.module.css'
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {SliderOfCountCards} from "../../../components/Slider/SliderOfCountCards";


export const PackList = () => {
    return (
        <div className={styles.wholeForm}>
            <InputSearch/>
            <SliderOfCountCards/>

        </div>
    );
};

