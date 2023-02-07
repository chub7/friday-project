import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {FC, useEffect, useState} from "react";
import styles from './Select.module.css'

type SelectFormatType = {
    format: string
    setFormat: (format: string) => void
}
export const SelectFormat: FC<SelectFormatType> = ({format, setFormat}) => {

    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value as string);
    };




    return (
        <div>
            <p className={styles.header}> Choose a question format</p>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={format}
                    onChange={handleChange}
                    MenuProps={{disableScrollLock: true}}

                >
                    <MenuItem value={'text'}>Text</MenuItem>
                    <MenuItem value={'image'}>Image</MenuItem>

                </Select>
            </FormControl>

        </div>


    );
}