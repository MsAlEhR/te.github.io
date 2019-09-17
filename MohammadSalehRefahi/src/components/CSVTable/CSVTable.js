import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";

export const RowParser = row => {
    const reg = /"(.*?)"/g;
    const matches = row.match(reg);
    if (matches) {
        return matches.map(value => {
            return value.substr(1, value.length - 2);
        });
    }
    return row.split(",");
};

class CSVTable extends Component {
    static propTypes = {
        data: PropTypes.string.isRequired,
        header: PropTypes.bool
    };
    static defaultProps = {
        data: "",
        header: false
    };
    rowParser = row => {
        return RowParser(row);
    };
    render() {
        const { data, header } = this.props;
        const rows = [...data.split("\n")];
        const contentRows = header ? rows.slice(1, rows.length) : rows;
        return (
            <div style={{overflowY: 'scroll'}}>
                <Table>
                    {header && (
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                {this.rowParser(rows[0]).map((value, index) => (
                                    <TableHeaderColumn key={index}>{value}</TableHeaderColumn>
                                ))}
                            </TableRow>
                        </TableHeader>
                    )}
                    <TableBody displayRowCheckbox={false}>
                        {contentRows.map((row, index) => (
                            <TableRow key={index}>
                                {this.rowParser(row).map((value, index) => (
                                    <TableRowColumn key={index}>{value}</TableRowColumn>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default CSVTable;
