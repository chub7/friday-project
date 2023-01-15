import React, {FC, useEffect} from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import styles from './MainTable.module.css'

export type TypeCardForTable = {
    name?: string,
    cardsCount?: number,
    lastUpdated?: any,
    createdBy?: string,
    myProfile?: any,
    questions?: string,
    answer?: string,
    grade?: string

}


type TableType = {
    model: {
        tableFieldName: string[],
        rows: TypeCardForTable[],
        key: string[]
    }
}
export const MainTable: FC<TableType> = ({model}) => {

    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table aria-label="simple table">
                <TableHead className={styles.header}>
                    <TableRow>
                        {model.tableFieldName.map((name, index) =>
                            <TableCell key={index}><p className={styles.row}>{name}</p></TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {model.rows.map((row: TypeCardForTable, index) => (
                        <TableRow
                            key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                            {model.key.map((property, index) =>
                                <TableCell key={index}>
                                    <p className={styles.row}>
                                        {row[property as keyof TypeCardForTable]}
                                    </p>
                                </TableCell>
                            )}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
/*property != 'myProfile' ?
                                        row[property as keyof TypeCardForTable] :
                                        row[property as keyof TypeCardForTable] ?
                                            <div>
                                                <SchoolIcon/>
                                                <EditIcon/>
                                                <DeleteIcon/>
                                            </div> :
                                            <div>
                                                <SchoolIcon/>
                                            </div>*/