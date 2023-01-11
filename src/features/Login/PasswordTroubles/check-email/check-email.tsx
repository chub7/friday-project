import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../app/store';
import { CssButton } from '../../../../components/CustomComponent/CssComponent';
import style from './check-email.module.css'
import emailImg from './email-img.png'

export const CheckEmail = () => {
    const emailFromState = useAppSelector(state => state.passwordData.email )
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate("/login")
    }
    return (
        <div className={style.checkContainer}>
            <h1 className={style.checkTitle}>Check Email</h1>
            <div className={style.checkImg}>
                <img src={emailImg} alt="email image" />
            </div>
            <p className={style.checkHelperText}>We’ve sent an Email with instructions to {emailFromState}</p>
            <CssButton value={'blue'} onClick={onClickHandler}>Back to login</CssButton>
        </div>
    );
};

