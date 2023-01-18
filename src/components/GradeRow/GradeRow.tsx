import React, {FC} from 'react';
import GradeIcon from '@mui/icons-material/Grade';

export const GradeRow: FC<{ grade: number }> = ({grade}) => {

    return (
        <div>
            {new Array(5).fill(null).map((el, index) =>
                <GradeIcon key={index} sx={{color: (grade > index ? '#FFC700' : '#DADADA')}}
                />)}
        </div>
    );
};

