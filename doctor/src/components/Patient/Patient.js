/**
 * Created by Vineeth on 11-03-2018.
 */
/*global $*/
import React,{Component} from 'react';
import createContainer from "firestore-react";
import {
    Card,
    CardPrimaryAction,
    CardMedia,
    CardMediaContent,
    CardAction,
    CardActionIcons,
    CardActions
} from 'rmwc/Card';
import { Typography } from 'rmwc/Typography';
import {Row,Col} from 'react-grid-system'
class Patient extends Component{
    constructor(props){
        super(props);
        this.state={
            hash:props.match.params.token,
            verified:false
        };
        this.retComponent=this.retComponent.bind(this);
    }
    retComponent() {
        let self=this;
        let ele;
        this.props.users.snapshot.forEach((doc)=> {
            if(self.state.hash==doc.data().id)
            {
                console.log(doc.data());
                ele=<div key={doc.data().id}>
                    {/*<div className="jke-ecgChart"></div>*/}
                    <Row>
                        <Col xs={5} offset={{xs:1}} style={{paddingTop:'15px',paddingBottom:'15px'}}>
                            <Card style={{width: '100%'}}>
                                <h1>{doc.data().live.diastolic}/{doc.data().live.systolic}</h1>
                                <hr/>
                                <p>Blood Pressure</p>
                            </Card>
                        </Col>
                        <Col xs={5} style={{paddingTop:'15px',paddingBottom:'15px'}}>
                            <Card style={{width: '100%'}}>
                                <h1>{doc.data().live.oxygen_value}%</h1>
                                <hr/>
                                <p>Oxygen Saturation</p>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} offset={{xs:1}} style={{paddingTop:'15px',paddingBottom:'15px'}}>
                            <Card style={{width: '100%'}}>
                                <h1>{doc.data().live.pulse}</h1>
                                <hr/>
                                <p>Pulse</p>
                            </Card>
                        </Col>
                        <Col xs={5} style={{paddingTop:'15px',paddingBottom:'15px'}}>
                            <Card style={{width: '100%'}}>
                                <h1>{doc.data().live.resp}</h1>
                                <hr/>
                                <p>Respiratory Rate</p>
                            </Card>
                        </Col>
                    </Row>

                </div>;
            }
        });
        return ele;
    }
    render(){
        return(
            <div>
                {this.props.users.loading ? <div>Loading</div> : this.retComponent()}
            </div>
        )
    }
}
export default createContainer(Patient, (db) => {
    return {
        users: db.collection("patient")
    };
});