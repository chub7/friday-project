import React from 'react';
import {NavLink} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import styles from './back-link.module.css'

export const BackToPackLink = () => {
    return (
        <div className={styles.linkContainer}>
            <NavLink to={'/packs'} className={styles.link}><ArrowBack/> Back to pack </NavLink>
        </div>
    );
};
