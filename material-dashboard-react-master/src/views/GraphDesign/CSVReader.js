import React, { Component, Fragment } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import Checkbox from "material-ui/Checkbox";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import CmpDropeZone from '../../components/CmpDropzone/CmpDropZone'
import savery from "savery";

import "./styles.css";

import CSVTable, { RowParser } from "../../components/CSVTable/CSVTable";

class CSVReader extends React.Component {
    state = {
        header: true,
        drawerOpen: false,
        csvData: ``
    };
    handleMenu = () => {
        this.setState({ drawerOpen: true });
    };
    handleOption = (name, e, value) => {
        this.setState({
            [name]: value
        });
    };
    onDrop = acceptedFiles => {
        const{handleCSV}=this.props;
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBinaryString = reader.result;
                this.setState({ csvData: fileAsBinaryString });
                handleCSV(fileAsBinaryString);
            };
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");

            reader.readAsBinaryString(file);
        });
    };
    generateJSON = () => {
        let json = {};
        const { csvData, header } = this.state;
        if (header && csvData !== "") {
            const rows = csvData.split("\n").map(row => {
                return RowParser(row);
            });
            const headerRow = rows[0];
            json = rows.slice(1, rows.length - 1).map(row => {
                let obj = {};
                row.map((cell, index) => {
                    obj[headerRow[index]] = cell;
                });
                return obj;
            });
        }
        return JSON.stringify(json, null, 2).replace(/\\r/g, "");
    };
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Select CSV"
                        onLeftIconButtonClick={this.handleMenu}
                        iconElementRight={
                            <div>
                                {this.state.csvData !== "" && (
                                    <Fragment>
                                        <RaisedButton
                                            onClick={() => {
                                                this.setState({ csvData: "" });
                                            }}
                                            label="Clear Data"
                                        />
                                        <RaisedButton
                                            label="Download as JSON"
                                            style={{ marginLeft: 10 }}
                                            onClick={() => {
                                                // this.generateJSON();
                                                savery.save(this.generateJSON(), "export.json");
                                            }}
                                        />
                                    </Fragment>
                                )}
                            </div>
                        }
                    />
                    {/*<div style={{ height: 180 }} />*/}
                    {this.state.csvData === "" ? (

                        <CmpDropeZone
                            style={{
                                // width: "100%",
                                // height: "400",
                                // position: "fixed",
                                // top: "50%",
                                // left: "50%"
                            }}
                            onDrop={this.onDrop}
                        />

                    ) : (
                        <CSVTable data={this.state.csvData} header={this.state.header} />
                    )}
                </MuiThemeProvider>
            </div>
        );
    }
}

export default CSVReader;
