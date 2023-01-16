import * as React from 'react';
import Slider from '@mui/material/Slider';
import {useState} from 'react';
import styles from './SliderOfCountCards.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {maxCountCards, minCountCards} from "../../features/studies-page/studies-selectors";
import {setCountCard} from '../../features/studies-page/pack-list/pack-slice';


export const SliderOfCountCards = () => {
    const min = useAppSelector(minCountCards)
    const max = useAppSelector(maxCountCards)
    const dispatch = useAppDispatch()

    const [value, setValue] = useState<number[]>([min, max]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const handleSpendRequest = () => {
        dispatch(setCountCard({min: value[0], max: value[1]}))
    }

    return (
        <div>
            <h4 className={styles.label}>Number of cards</h4>
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