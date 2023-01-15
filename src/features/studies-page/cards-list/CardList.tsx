import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {MainTable} from "../../../components/table/MainTable";
import {setCards} from "./cards-slice";
import {CardModel} from "./CardModel";
import styles from '../studies-page.module.css'
import {BackToPackLink} from "../../../components/BackLink/BackToPackLink";
import {GeneralButton} from '../../../utils/StyleForMUI/StyleForMUI';
import {InputSearch} from "../../../components/InputSearch/InputSearch";
import {useParams} from "react-router-dom";
import {packListApi} from "../pack-list/pack-list-api";
import {cardListApi} from "./cards-list-api";
import {getProfileSelector} from "../../Profile/profile-selectors";


export const CardList = () => {
    const dispatch = useAppDispatch();
    const params = useParams()
    const model = CardModel()


    useEffect(() => {
        dispatch(setCards(params.id))
    }, [])

    const sendRequest = () => {
        cardListApi.createCard().then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        model.rows.length!=0?
        <div className={styles.wholeForm}>
            <BackToPackLink/>
            <div className={styles.headerContainer}>

                <h3>{model.myPack?'My pack':'Friends Pack'}</h3>
                <GeneralButton onClick={sendRequest}>Add new Card</GeneralButton>
            </div>
            <div className={styles.inputContainerCard}>
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

