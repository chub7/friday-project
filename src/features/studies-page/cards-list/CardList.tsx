import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../app/store";
import {MainTable} from "../../../components/table/MainTable";
import {setCards} from "./cards-slice";
import {CardModel} from "./CardModel";
import styles from '../studies-page.module.css'
import {BackToPackLink} from "../../../components/BackLink/BackToPackLink";
import {GeneralButton} from '../../../utils/StyleForMUI/StyleForMUI';
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {useParams} from "react-router-dom";


export const CardList = () => {
    const dispatch = useAppDispatch();
    const params = useParams()

    const model = CardModel()
    console.log(model)

    useEffect(() => {
        dispatch(setCards(params.id))
    }, [])

    return (
        model.rows.length!=0?

        <div className={styles.wholeForm}>
            <BackToPackLink/>
            <div className={styles.headerContainer}>
                <h3>My pack</h3>
                <GeneralButton>Add new Card</GeneralButton>
            </div>
            <div className={styles.inputContainer}>
                <InputSearch/>
            </div>

            <MainTable
                model={model}
            />
        </div>
            :<div className={styles.wholeForm}>
                <BackToPackLink/>
          ПУУУУСССССТОООООО
            </div>

    );
};

