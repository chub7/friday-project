import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

import {InputBase} from "@mui/material";
import styles from './InputSearch.module.css'
import {useDebounce} from "../../common/hook/useDebounce";
import {setSearch} from "../../features/studies-page/pack-list/pack-slice";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {searchPackSelector} from "../../features/studies-page/studies-selectors";

/*
type InputSearchType={
    value:string
    onChange:(value:string)=>void

}
*/

export const InputSearch/*:FC<InputSearchType>*/ = (/*{value,onChange}*/) => {
    const search=useAppSelector(searchPackSelector)
    const [value, setValue] = useState(search)
    const debouncedValue = useDebounce<string>(value, 500)
    const dispatch = useAppDispatch()
    console.log(search)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    useEffect(() => {
        dispatch(setSearch({value: value}))
    }, [debouncedValue])

    return (
        <div>
            <h4 className={styles.label}>Search</h4>
            <div className={styles.inputContainer}>
                <SearchIcon className={styles.inputIcon}/>
                <InputBase
                    value={value}
                    onChange={handleChange}
                    placeholder="Provide your text"
                    className={styles.input}/>

            </div>
        </div>
    );
};

