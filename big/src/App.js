import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './firebaseConfig';
import {
    Card,
    CardPrimaryAction,
    CardMedia,
    CardAction,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from 'rmwc/Card';
import {Row, Col} from 'react-grid-system'
import {Typography} from 'rmwc/Typography';
import createContainer from 'firestore-react'

class App extends Component {
    constructor(props){
        super(props);
        this.state={

        };
        this.renderUsers=this.renderUsers.bind(this);
    }
    renderUsers() {
        var list = [];

        this.props.users.snapshot.forEach((doc)=> {
            list.push(
                <Col xs={10} md={4} offset={{xs:1}} style={{padding:'15px'}}>
                    <Card style={{width: '100%'}}>
                        <CardPrimaryAction>
                            <CardMedia sixteenByNine style={{backgroundImage: `url(${doc.data().image})`}}/>
                            <div style={{padding: '0 1rem 1rem 1rem'}}>
                                <Typography use="title" tag="h2">{doc.data().pname}</Typography>
                                <Typography
                                    use="subheading1"
                                    tag="h3"
                                    theme="text-secondary-on-background"
                                    style={{marginTop: '-1rem'}}
                                >
                                    {doc.data().gender}
                                </Typography>
                                <Typography use="body1" tag="div" theme="text-secondary-on-background">
                                    {doc.data().description}
                                </Typography>
                            </div>
                        </CardPrimaryAction>
                    </Card>
                </Col>
            );
        });

        return list;
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">SM-Medikit</h1>
                </header>
                <main>

                    <Row>
                        {this.props.users.loading ? <div style={{textAlign:'center'}}>Loading</div> : this.renderUsers()}
                    </Row>
                </main>
            </div>
        );
    }
}

export default createContainer(App, (db) => {
    return {
        users: db.collection("emergency")
    };
});
