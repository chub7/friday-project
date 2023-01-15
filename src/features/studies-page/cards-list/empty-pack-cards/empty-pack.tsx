import React from 'react';
import {GeneralButton} from "../../../../utils/StyleForMUI/StyleForMUI";
import style from "./empty-pack.module.css"
import {useAppDispatch} from "../../../../app/store";

export const EmptyPack = () => {
    const dispatch = useAppDispatch()

    const onClickHandler = () =>{
        //dispatch() диспатч добавления карты
    }
    return (
        <div className={style.form}>
            <p className={style.greyLabel}>This pack is empty. Click add new card to fill this pack</p>
            <GeneralButton value={'blue'} sx={{width:'170px'}} onClick={onClickHandler} >Add new card</GeneralButton>
        </div>
    );
};

