import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import styles from './pagination.module.css'
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../app/store";
import FormControl from '@mui/material/FormControl/FormControl';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {FC} from "react";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type PaginationType = {
    pageSelector: (state: AppRootStateType) => number
    setPage: ActionCreatorWithPayload<{ page: number }>
    totalCountSelector: (state: AppRootStateType) => number,
    pageCountSelector: (state: AppRootStateType) => number
    setCountPage: ActionCreatorWithPayload<{ count: number }>
}
export const PaginationRounded: FC<PaginationType> = ({
                                                          pageSelector,
                                                          setPage,
                                                          totalCountSelector,
                                                          pageCountSelector,
                                                          setCountPage
                                                      }) => {
    const count = useAppSelector(pageCountSelector)
    const totalCount = useAppSelector(totalCountSelector)
    const page = useAppSelector(pageSelector)

    const dispatch = useAppDispatch()

    const handleChangePagePack = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setPage({page}))
    }
    const handleChangePackCount = (event: SelectChangeEvent) => {
        dispatch(setCountPage({count: +event.target.value}))
    }

    return (
        <div className={styles.pagination}>
            <Pagination
                page={page}
                count={Math.round(totalCount / count)} onChange={handleChangePagePack} variant="outlined"
                shape="rounded"/>
            <div className={styles.selectContainer}>
                Show
                <FormControl>
                    <Select
                        className={styles.select}
                        value={String(count)}
                        onChange={handleChangePackCount}>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
                Cards of page
            </div>
        </div>
    )
}