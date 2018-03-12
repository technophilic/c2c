import React, { Component } from 'react';
import logo from './logo.png';
import {Route, Link,Redirect} from 'react-router-dom'
import Login from './components/login/Login'
import Patient from './components/Patient/Patient'
import PatientList from './components/PatientList/PatientList'
import db from './database'
import './App.css';
import Loading from './components/Loading/Loading'
import createContainer from "firestore-react";
import "./firebaseConfig";

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            token:'',
            isLoggedIn:false
        };
        this.login=this.login.bind(this);
    }
    componentDidMount(){
        let self=this;
        db.getItem('doctorToken').then(function(value) {
            // This code runs once the value has been loaded
            // from the offline store.
            let isTokenExist;
            console.log(value);
            isTokenExist = value !== null; //true if no data i.e login section is to be displayed
            self.setState({
                isLoading:false,
                token:(isTokenExist)?value:'',
                isLoggedIn:isTokenExist
            });
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }
    login(token){
        // console.log('logged in app !',token);
        this.setState({
            token:token,
            isLoggedIn:true
        });
        db.setItem('doctorToken', token).then(function (value) {
            // Do other things once the value has been saved.
            console.log('Logged in and stored in db');
            console.log(value);
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }
    logout(){
        let self=this;
        db.clear().then(function() {
            // Run this code once the database has been entirely deleted.
            console.log('User has been logged out');
            self.setState({
                isLoggedIn:false,
                token:'',
                isLoading:false
            });
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title new">SM-Medikit</h1>
                </header>
                <main>
                    {/*<Login login={(data)=>{
                        console.log(data);
                    }}/>*/}
                    {/*<PatientList/>*/}
                    <div className="App">
                        {
                            this.state.isLoading?
                                <Loading/>:
                                <div>
                                    <Route exact path="/" render={() => (
                                        this.state.isLoggedIn ? (
                                            <Redirect to="/home"/>
                                        ) : (
                                            <Redirect to="/login"/>
                                        )
                                    )}/>
                                    <Route exact path="/login" render={()=>(
                                        this.state.isLoggedIn ? (
                                            <Redirect to="/"/>
                                        ) : (
                                            <Login onLogin={this.login}/>
                                        )
                                    )}/>
                                    <Route path="/view/:token" component={Patient}/>
                                    <Route path="/home" render={()=>(
                                        this.state.isLoggedIn ? (
                                            <PatientList/>
                                        ) : (
                                            <Redirect to="/login"/>
                                        )
                                    )}/>
                                </div>
                        }
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
