import React from 'react';
import { GeneralButton } from "../../../../utils/StyleForMUI/StyleForMUI";
import style from "./empty-pack.module.css"
import { useAppDispatch } from "../../../../app/store";
import { useParams } from 'react-router-dom';
import { addNewCard } from '../cards-slice';
import { CardModel } from '../CardModel';

export const EmptyPack = () => {
    const dispatch = useAppDispatch()
    const params = useParams()
    const model = CardModel()

    const onClickHandler = () => {
        dispatch(addNewCard(params.id))
    }
    return (
    <>
            {model.myPack ?
                <div className={style.form}>
                    <p className={style.greyLabel}>This pack is empty. Click add new card to fill this pack</p>
                    <GeneralButton value={'blue'} sx={{ width: '170px' }} onClick={onClickHandler} >Add new card</GeneralButton>
                </div>
                :  <div className={style.form}>
                    <p className={style.greyLabel}>This pack is empty.</p>
                </div>
            }

    </>
    );
};

