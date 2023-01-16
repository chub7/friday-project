import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import styles from './Pagination.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {pageCountSelector, totalCountPackSelector} from "../../features/studies-page/studies-selectors";
import {setPageCount, setPagePack} from "../../features/studies-page/pack-list/pack-slice";
import FormControl from '@mui/material/FormControl/FormControl';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export const PaginationRounded = () => {
    const count=useAppSelector(pageCountSelector)
    const totalCount = useAppSelector(totalCountPackSelector)

    const dispatch = useAppDispatch()

    const handleChangePagePack = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setPagePack({page}))}


    const handleChangePackCount = (event: SelectChangeEvent) => {
        dispatch(setPageCount({count:+event.target.value}))}


    return (
        <div className={styles.pagination}>
            <Pagination count={Math.round(totalCount / count)} onChange={handleChangePagePack} variant="outlined"
                        shape="rounded"/>
            <div className={styles.selectContainer}>
                Show
                <FormControl >
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