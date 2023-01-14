import {MainTable} from "./mainTable";
import {QuestionTable} from "./question";

interface BaseTable {
    type: `main` | `question-answer`
}


export const BaseTable = (props: BaseTable) => {

    return (<>
            {props.type === "main" ? <MainTable/> : <QuestionTable/>}
        </>
    );
};

//
// interface  BaseTable<T>  {
//     dataTable: T
//     type: `main` | `question-answer`
// }
//
// export function createData(
//     name?: string,
//     cardsCount?: number,
//     lastUpdated?: any,
//     createdBy?: string,
//     actions?: string,
//     questions?: string,
//     answer?: string,
//     grade?: string
// ) {
//     return {name, cardsCount, lastUpdated, createdBy, actions, questions, answer, grade};
// }
//
// export function BaseTable <T>(props:BaseTable<T>) {
//     const {dataTable, type} = props
//     let tableFieldName = [`Name`, `Cards`, `Last updated`, `Created by`, `Actions`]
//     if (type === "question-answer") {
//         tableFieldName = [`Question`, `Answer`, `Last updated`, `Grade`]
//     }
//
//     let rows = dataTable.map(pack => createData(pack.name,
//         pack.cardsCount,
//         parseData(pack.updated),
//         pack.user_name,
//         pack.updated))
//
//     return (
//         <TableContainer component={Paper}>
//             <Table sx={{minWidth: 350}} aria-label="simple table">
//                 <TableHead>
//                     <TableRow>{}
//                         <TableCell>Name</TableCell>
//                         {tableFieldName.map(name => <TableCell align="right">{name}</TableCell>)}
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {rows.map((row) => (
//                         <TableRow
//                             key={row.name}
//                             sx={{'&:last-child td, &:last-child th': {border: 0}}}
//                         >
//                             <TableCell component="th" scope="row">
//                                 {row.name}
//                             </TableCell>
//                             <TableCell align="right">{row.cardsCount}</TableCell>
//                             <TableCell align="right">{row.lastUpdated}</TableCell>
//                             <TableCell align="right">{row.createdBy}</TableCell>
//                             <TableCell align="right">{row.actions}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

