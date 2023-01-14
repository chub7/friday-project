import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

import {InputBase} from "@mui/material";
import  styles from './InputSearch.module.css'
export const InputSearch = () => {
    return (
        <div>
            <h4 className={styles.label}>Search</h4>
            <div className={styles.inputContainer}>
                <SearchIcon/>
                <InputBase
                    placeholder="Provide your text"
                    className={styles.input}/>


            </div>
        </div>
    );
};

