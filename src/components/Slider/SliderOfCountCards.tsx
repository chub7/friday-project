import * as React from 'react';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import styles from './SliderOfCountCards.module.css'


export const SliderOfCountCards=()=> {
    const [value, setValue] = useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const  handleSpendRequest=()=>{
        console.log('spend')

    }

    return (
        <div>
            <h4>Number of cards</h4>
            <div className={styles.sliderContainer}>
                <p className={styles.value}>{value[0]}</p>
                <Slider
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleSpendRequest}/>
                <p className={styles.value}>{value[1]}</p>
            </div>

        </div>
    );
}