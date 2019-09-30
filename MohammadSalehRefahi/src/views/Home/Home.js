import React from "react";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import {makeStyles} from "@material-ui/core/styles/index";
import styles from "../../assets/jss/material-dashboard-react/layouts/adminStyle.js";
import c from  './Home.css'
import imagine1 from "../../assets/img/sidebar-3.jpg";
import avatar from "assets/img/faces/marc.jpg";


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {



        return (
            <div
                className={c.background}
                // style={{ backgroundImage: "url(" + imagine1 + ")" }}
            >
                <GridContainer align="center" justify="center">
                <GridItem   xs={6} sm={6} md={6}>
                    <Card profile  style={{backgroundColor: '#acd4c4'}}>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile >
                            <h1 className={styles.cardTitle}>Mohammad Saleh Refahi</h1>
                            <p className={styles.description}>
                                <h4 className={styles.cardTitle}>RESEARCH INTEREST</h4>
                                <span>Application of Machine Learning and Deep Learning in Bioinformatics</span><br/>
                                <span> Network Analysis in biology</span><br/>
                                <span> Computer vision</span><br/>
                            </p>

                        </CardBody>
                    </Card>
                </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default (Home);

