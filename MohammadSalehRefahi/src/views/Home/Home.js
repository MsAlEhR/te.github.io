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
                <GridItem   xs={12} sm={12} md={6}>
                    <Card profile  style={{backgroundColor: '#9ed4a1'}}>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile >
                            <h6 className={styles.cardCategory}>Machine learning Researcher </h6>
                            <h4 className={styles.cardTitle}>Mohammad Saleh Refahi</h4>
                            <p className={styles.description}>
                                Don{"'"}t Stop keep going...
                            </p>
                            {/*<Button color="primary" round>*/}
                                {/*Follow*/}
                            {/*</Button>*/}
                        </CardBody>
                    </Card>
                </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default (Home);

