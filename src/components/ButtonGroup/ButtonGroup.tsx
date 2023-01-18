import ButtonGroup from '@mui/material/ButtonGroup';
import styles from './ButtonGroup.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getMyIdSelector} from "../../features/Profile/profile-selectors";
import {setIsMyPack} from "../../features/studies-page/pack-list/pack-slice";
import {ButtonForGroup} from '../../utils/StyleForMUI/StyleForMUI';
import {isMyPackSelector} from "../../features/studies-page/pack-list/pack-selectors";


export const BasicButtonGroup = () => {

    const currentButton = useAppSelector(isMyPackSelector)
    const myId = useAppSelector(getMyIdSelector)

    const dispatch = useAppDispatch()

    const handleChange = (current: 'All' | 'My') => {
        current === 'All' ?
            dispatch(setIsMyPack({myPack: ''}))
            : dispatch(setIsMyPack({myPack: myId}))
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