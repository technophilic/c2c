/**
 * Created by Vineeth on 11-03-2018.
 */
import React,{Component} from 'react'
import {TextField} from 'rmwc/TextField'
import {Button} from 'rmwc/Button'
import {Row,Col} from 'react-grid-system'

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            doctorId:'',
            password:''
        };
    }
    login() {
        let data = {
            uid: this.state.doctorId,
            password: this.state.password
        };
        console.log(data);
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://sm-medikit.herokuapp.com/login', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    res(data);
                }
            };
            xhr.onerror = function (err) {
                rej(data);
            };
            xhr.send(data);
        });
    }
    render() {
        return(
            <div>
                <Row>
                    <Col xs={10} offset={{xs:1}}>
                        <h2 style={{textAlign:'center'}}>Login</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} offset={{xs:1}}>
                        <TextField style={{verticalAlign:'bottom'}} fullwidth label="Doctor ID" value={this.state.doctorId} onChange={evt => this.setState({doctorId: evt.target.value})}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} offset={{xs:1}}>
                        <TextField style={{verticalAlign:'bottom'}} type="password" fullwidth label="Password" value={this.state.password} onChange={evt => this.setState({password: evt.target.value})}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} offset={{xs:1}} style={{textAlign:'left',marginTop:'15px',marginBottom:'15px'}}>
                        <Button stroked onClick={()=>{
                            this.props.onLogin("6lcEj5wMpFRHlI1NDJ3A");
                        }} >Login</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Login;