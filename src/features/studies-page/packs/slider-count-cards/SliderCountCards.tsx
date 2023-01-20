import * as React from 'react';
import Slider from '@mui/material/Slider';
import {useEffect, useState} from 'react';
import styles from './slider-count-cards.module.css'
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {setCountCard} from '../packs-slice';
import {cardsCountSelector, maxCountCards, minCountCards} from '../packs-selectors';


export const SliderCountCards = React.memo(() => {
    const min = useAppSelector(minCountCards)
    const max = useAppSelector(maxCountCards)
    const cardsCount = useAppSelector(cardsCountSelector)

    const dispatch = useAppDispatch()
    const [value, setValue] = useState<number[]>([min, max]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    const handleSpendRequest = () => {
        dispatch(setCountCard({value}))
    }
    useEffect(() => {//чтобы после очистки фильтра затиралось
        cardsCount.length === 0 && setValue([min,max]);
    }, [cardsCount,min,max])

    return (
        <div>
            <h4 className={styles.label}>Number of cards</h4>
            <div className={styles.sliderContainer}>
                <p className={styles.value}>{value[0]}</p>
                <Slider
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleSpendRequest}/>
                <p className={styles.value}>{value[1]}</p>
            </div>

        </div>
    )
})