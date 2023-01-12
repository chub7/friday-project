import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../../app/store';
import { GeneralButton} from '../../../../utils/StyleForMUI/StyleForMUI';
import styles from '../../login.module.css'
import emailImg from '../../../../assets/email-img.png'

export const CheckEmail = () => {
    const emailFromState = useAppSelector(state => state.passwordData.email)
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate("/login")
    }
    return (
        <div className={styles.wholeForm}>
            <div className={styles.form}>
                <h1 className={styles.formName}>Check Email</h1>
                <div className={styles.checkImg}>
                    <img src={emailImg} alt="email image"/>
                </div>
                <p className={styles.textForm} style={{textAlign: 'center'}}>
                    We’ve sent an Email with instructions to {emailFromState}
                </p>
                <GeneralButton value={'blue'} onClick={onClickHandler}>Back to login</GeneralButton>
            </div>

        </div>
    );
};

