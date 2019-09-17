import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Graph from 'react-graph-vis';
import CSVReader from './CSVReader';
import { withStyles } from '@material-ui/styles';
// import {DropzoneArea} from 'material-ui-dropzone'
import ft from '@fortawesome/fontawesome-free/css/brands.min.css';
import jt from '@fortawesome/fontawesome-free/css/solid.min.css';
import vt from 'vis/dist/vis.css';
import nt from 'vis/dist/vis-network.min.css';

import avatar from "assets/img/faces/marc.jpg";

// var Graph = require('react-graph-vis');


var graph = {
    nodes: [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
    ],
    edges: [
        {from: 1, to: 2},
        {from: 1, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ]
};

const groups = {};

const options = {
    nodes: {
        font: {
            size: 12,
            face: 'Tahoma',
        },
        size: 25,
        color: {
            background: '#e6e6e6'
        }
    },
    layout: {
        hierarchical: false,
    },
    edges: {
        color: { inherit: true },
        width: 0.4,
        smooth: {
            roundness: 0.2,
            type: 'dynamic',
        },
        scaling: {
            max: 8,
        },
    },
    groups: { ...groups },
    // physics: {
    //   stabilization:{
    //     enabled : true,
    //     iterations:500,
    //   }
    //   barnesHut: {
    //     // gravitationalConstant: -2000,
    //     centralGravity: 0.4,
    //     springLength: 125,
    //     avoidOverlap: 0.3,
    //   },
    //   minVelocity: 0.75,
    // },
    interaction: {
        hover: true,
        tooltipDelay: 200,
    },
};

var events = {
    select: function(event) {
        var { nodes, edges } = event;
    }
}

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "4px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);
// const classes = useStyles();

class GraphDesign extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            csvData: '',
            graph:{
                nodes: [
                    {id: 1, label: 'Protein',shape:'icon',icon: {
                            face: '"Font Awesome 5 Free"',
                            code: '\uf471',
                            size: 40,
                        }},
                    {id: 2, label: 'Drug',shape:'icon',icon: {
                            face: '"Font Awesome 5 Free"',
                            code: '\uf48e',
                            size: 40,
                        }},
                    {id: 3, label: 'SideEffect',shape:'icon',icon: {
                            face: '"Font Awesome 5 Free"',
                            code: '\uf487',
                            size: 40,
                        }},
                    {id: 4, label: 'Disease',shape:'icon',icon: {
                            face: '"Font Awesome 5 Free"',
                            code: '\uf21e',
                            size: 40,
                        }},
                    {id: 5, label: 'Node 5',shape:'icon',icon: {
                            face: '"Font Awesome 5 Free"',
                            code: '\uf471',
                            size: 40,
                        }}
                ],
                edges: [
                    {from: 1, to: 2},
                    {from: 1, to: 3},
                    {from: 2, to: 4},
                    {from: 2, to: 5}
                ]
            },
        };
    }



    triggerChange = () =>{
        const onChange= this.props.onChange;
        if(onChange){
            onChange(this.state.csvData)
        }
    };

    csvTOobject(bufferString){
        var arr = bufferString.split('\n');
        var jsonObj = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
            }
            jsonObj.push(obj);
        }
        return jsonObj
    }


    handleCSV=csv=>{
        this.setState({
                csvData: csv,
            graph:{...graph,edges :this.csvTOobject(csv)}
        },
            () => this.triggerChange(),
            );
    };
    render() {

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={useStyles.cardTitleWhite}>Graph</h4>
                                {/*<p className={useStyles.cardCategoryWhite}>Input Graph data</p>*/}
                            </CardHeader>
                            <CardBody>
                                <Graph graph={this.state.graph} options={options} events={events} style={{height: 400}}/>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <Card>
                            {/*<CardBody>*/}
                                {/*<GridContainer>*/}
                                    {/*<GridItem xs={48} sm={48} md={48}>*/}
                                        <CSVReader csvData={this.state.csvData} handleCSV={this.handleCSV}/>
                                    {/*</GridItem>*/}
                                {/*</GridContainer>*/}
                            {/*</CardBody>*/}
                            <CardFooter>
                                <Button color="primary">Update Profile</Button>
                            </CardFooter>
                        </Card>

                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles( vt, nt, ft, jt)(GraphDesign);

