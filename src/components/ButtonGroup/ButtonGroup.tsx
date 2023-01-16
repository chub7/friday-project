import ButtonGroup from '@mui/material/ButtonGroup';
import styles from './ButtonGroup.module.css'
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getProfileSelector} from "../../features/Profile/profile-selectors";
import {setIsMyPack} from "../../features/studies-page/pack-list/pack-slice";
import { ButtonForGroup } from '../../utils/StyleForMUI/StyleForMUI';


export const BasicButtonGroup = () => {
    const [currentButton, setCurrentButton] = useState('All')
    const {_id} = useAppSelector(getProfileSelector)
    const dispatch = useAppDispatch()

    const handleChange = (current: 'All' | 'My') => {
        setCurrentButton(current)
        current === 'All' ?
            dispatch(setIsMyPack({myPack: ''}))
            : dispatch(setIsMyPack({myPack: _id}))
    }
    return (
        <div>
            <h4 className={styles.header}>Show packs cards</h4>
            <ButtonGroup>
                <ButtonForGroup sx={{
                    background: currentButton === 'My' ? '#366EFF' : 'white',
                    color: currentButton === 'My' ? 'white' : '#366EFF',
                }} onClick={() => handleChange('My')}>My</ButtonForGroup>

                <ButtonForGroup sx={{
                    background: currentButton === 'All' ? '#366EFF' : 'white',
                    color: currentButton === 'All' ? 'white' : '#366EFF',
                }} onClick={() => handleChange('All')}>All</ButtonForGroup>

            </ButtonGroup>
        </div>

    );
}