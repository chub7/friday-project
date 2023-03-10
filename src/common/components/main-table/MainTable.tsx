import React, {FC, ReactNode} from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import styles from './main-table.module.css'
import { PaginationRounded, PaginationType } from "../pagination/Pagination";
import { styleForTableRow } from '../../utils/style-for-mui/style-for-mui';

export type TypeCardForTable = {
    name?: string,
    cardsCount?: number,
    lastUpdated?: any,
    createdBy?: string,
    myProfile?: any,
    questions?: string,
    answer?: string,
    grade?: string
/*    answerImg?:any
    questionImg:any*/

}

type TableType = {
    model: {
        tableFieldName: (string | JSX.Element)[],
        rows: TypeCardForTable[],
        key: string[]
    }
    pagination: PaginationType
}



export const MainTable: FC<TableType> = ({ model, pagination }) => {

    return (
        <div className={styles.tableContainer}>
            <TableContainer component={Paper} className={styles.table}>
                <Table aria-label="simple table">
                    <TableHead className={styles.header}>
                        <TableRow>
                            {model.tableFieldName.map((name, index) =>
                                <TableCell key={index} sx={styleForTableRow}>
                                    <p className={styles.row}>{name}</p>
                                </TableCell>)}
                        </TableRow>
                    </TableHead>
                    {model.rows.length !== 0
                        ? <TableBody>
                            {model.rows.map((row: TypeCardForTable, index) => (
                                <TableRow
                                    key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    {model.key.map((property, index) =>
                                        <TableCell key={index} sx={styleForTableRow}>
                                            <p className={styles.row}>
                                                {row[property as keyof TypeCardForTable]}
                                            </p>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                        : <div className={styles.noResult}> No results for your search </div>}
                </Table>
            </TableContainer>
            <PaginationRounded
                pageSelector={pagination.pageSelector}
                setPage={pagination.setPage}
                totalCountSelector={pagination.totalCountSelector}
                pageCountSelector={pagination.pageCountSelector}
                setCountPage={pagination.setCountPage}
            />
        </div>

    );
};

