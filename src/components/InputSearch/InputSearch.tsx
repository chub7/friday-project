import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {InputBase} from "@mui/material";
import styles from './InputSearch.module.css'
import {useDebounce} from "../../common/hook/useDebounce";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../app/store";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

type InputSearchType = {
       searchSelector:(state: AppRootStateType) => string
       setSearch:ActionCreatorWithPayload<{ value: string }>
}

export const InputSearch: FC<InputSearchType> = React.memo(({searchSelector,setSearch}) => {

    const search = useAppSelector(searchSelector)

    const [value, setValue] = useState(search)

    const debouncedValue = useDebounce<string>(value, 500)
    const dispatch = useAppDispatch()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    useEffect(() => {
        dispatch(setSearch({value: value}))
    }, [debouncedValue])

    useEffect(() => {//чтобы после очистки фильтра затиралось
        search === '' && setValue(search)
    }, [search])

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
})

