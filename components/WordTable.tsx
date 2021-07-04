import Table from 'react-bootstrap/Table'

import classes from '../styles/WordTable.module.css'

export default function WordTable(props: { words: any[][] }): JSX.Element {
    return <div >
        <Table striped bordered size="sm">
            <thead>
                <tr>
                    <th className={classes.colName}>Word</th>
                    <th className={classes.colState}>Number of Occurance</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.words[0].map((word: any) => {
                        if (word[1] > 5) {
                            return (
                                <tr key={word[0]}>
                                    <td className={classes.colName}>{word[0]}</td>
                                    <td className={classes.colState}>{word[1]}</td>
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </Table>

    </div>
}
