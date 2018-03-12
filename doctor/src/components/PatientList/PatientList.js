/**
 * Created by Vineeth on 11-03-2018.
 */
import React,{Component} from 'react'
import {
    Card,
    CardPrimaryAction,
    CardAction,
    CardActions
} from 'rmwc/Card';

import {
    ListDivider,
} from 'rmwc/List';

import {
    Icon,
} from 'rmwc/Icon';

import createContainer from "firestore-react";
import {Link} from 'react-router-dom'
import { Typography } from 'rmwc/Typography';
import {Row,Col} from 'react-grid-system';
class PatientList extends Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.renderUsers=this.renderUsers.bind(this);
    }
    renderUsers() {
        var list = [];

        this.props.users.snapshot.forEach((doc)=> {
            list.push(<div key={doc.data().id}>
                <ListDivider />
                <Link to={`/view/${doc.data().id}`} style={{textDecoration:'none'}}>
                <CardPrimaryAction>
                    <div style={{padding: '1rem'}}>
                        <Typography use="headline" tag="div" style={{textAlign:'left'}}>{doc.data().name}</Typography>
                        <Typography
                            use="body1"
                            tag="p"
                            theme="text-secondary-on-background"
                            style={{textAlign:'left'}}
                        >
                            {doc.data().contact}</Typography>
                    </div>
                </CardPrimaryAction>
                </Link>
            </div>);
        });

        return list;
    }
    render(){

        return(
            <div>
                <Row>
                    <Col xs={10} offset={{xs:1}}>
                        <Card stroked style={{width: '100%'}}>
                            <Typography
                                use="subheading2"
                                tag="div"
                                style={{padding: '0.5rem 1rem'}}
                                theme="text-secondary-on-background"
                            >
                                Patients
                            </Typography>
                            {this.props.users.loading ? <div>Loading</div> : this.renderUsers()}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default createContainer(PatientList, (db) => {
    return {
        users: db.collection("patient")
    };
});