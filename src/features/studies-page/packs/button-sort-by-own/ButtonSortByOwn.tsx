import ButtonGroup from '@mui/material/ButtonGroup';
import styles from './button-sort-by-own.module.css'
import {useAppDispatch, useAppSelector} from "../../../../app/store";

import {setIsMyPack} from "../packs-slice";
import {ButtonForGroup} from '../../../../common/utils/style-for-mui/style-for-mui';
import {isMyPackSelector} from "../packs-selectors";
import {useEffect} from "react";
import {getMyIdSelector} from "../../../profile/profile-selectors";
import { useSearchParams } from 'react-router-dom';


export const BasicButtonGroup = () => {

    const currentButton = useAppSelector(isMyPackSelector)
    const myId = useAppSelector(getMyIdSelector)
    let [searchParams, setSearchParams] = useSearchParams();
    const params = searchParams.get('myPack')

    const dispatch = useAppDispatch()

    useEffect(() => {
        params != null &&
        params === 'My'
            ? dispatch(setIsMyPack({myPack: myId}))
            : dispatch(setIsMyPack({myPack: ''}))

    }, [])
    const handleChange = (current: 'All' | 'My') => {
        if (current === 'All') {
            dispatch(setIsMyPack({myPack: ''}))
            setSearchParams('myPack=All')
        } else {
            dispatch(setIsMyPack({myPack: myId}))
            setSearchParams('myPack=My')
        }

    }
    return (
        <div>
            <h4 className={styles.header}>Show packs cards</h4>
            <ButtonGroup>
                <ButtonForGroup sx={{
                    background: currentButton === myId ? '#366EFF' : 'white',
                    color: currentButton === myId ? 'white' : '#366EFF',
                }} onClick={() => handleChange('My')}>My</ButtonForGroup>

                <ButtonForGroup sx={{
                    background: currentButton === '' ? '#366EFF' : 'white',
                    color: currentButton === '' ? 'white' : '#366EFF',
                }} onClick={() => handleChange('All')}>All</ButtonForGroup>

            </ButtonGroup>
        </div>

    );
}