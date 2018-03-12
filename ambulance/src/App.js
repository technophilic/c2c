/*global google*/
import React, {Component} from 'react';
import logo from './logo.png';
import {TextField} from 'rmwc/TextField'
import { Radio } from 'rmwc/Radio';
import { Button, ButtonIcon } from 'rmwc/Button';
import {Row,Col} from "react-grid-system";
import Camera from 'react-camera';
import { Icon } from 'rmwc/Icon';
import './App.css';

const style = {
    preview: {
        width:'100%',
        position: 'relative',
    },
    captureContainer: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '100%'
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 56,
        width: 56,
        color: '#000',
        margin: 20
    },
    captureImage: {
        width: '100%',
    }
};
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            register:true,
            navigate:false,
            phone:"",
            gender:'',
            name:"",
            gps:"",
            description:"",
            image:"",
            camera:false,
            captured:false,
            submitted:false,
            lat:'',
            lon:'',
            hospLat:'',
            hospLon:''
        };
        this.postData=this.postData.bind(this);
        this.takePicture = this.takePicture.bind(this);
    }
    postData=function (location) {
        let data={
            phone:this.state.phone,
            gender:this.state.gender,
            name:this.state.name,
            gps:`${location.coords.latitude},${location.coords.longitude}`,
            description:this.state.description,
            image:this.state.image
        };
        console.log(data);
        return new Promise((res,rej)=>{
           let xhr=new XMLHttpRequest();
            xhr.open("POST", 'http://35.200.142.66:8000/eme', true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {//Call a function when the state changes.
                if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    res(JSON.parse(xhr.responseText));
                }
            };
            xhr.onerror=function (err) {
                rej(data);
            };
            xhr.send(JSON.stringify(data));
        });
    };
    takePicture() {
        let self=this;
        this.setState({
            camera:false,
            captured:true
        });
        this.camera.capture()
            .then(blob => {
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function() {
                    let base64data = reader.result;
                    self.setState({
                       image:base64data
                    });
                };
                this.img.src = URL.createObjectURL(blob);
                this.img.onload = () => { URL.revokeObjectURL(this.src); }
            })
    }
    dispMaps(lat,lon,hospLat,hospLong){
        var gps = new google.maps.LatLng(lat,lon);
        var mapOptions = {
            zoom: 5,
            center: gps
        };
        let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }
    componentDidMount(){
        this.dispMaps();
    }
    render() {
        return (
            <div className="App" style={{overflowX:'hidden'}}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">SM-Medikit</h1>
                </header>
                <main>
                    {(!this.state.camera&&!this.state.submitted)?
                        <div style={{paddingTop:'20px'}}>
                            <Row>
                                <Col xs={10} offset={{xs:1}}>
                                    <TextField style={{verticalAlign:'bottom'}} fullwidth label="Phone" value={this.state.phone} onChange={evt => this.setState({phone: evt.target.value})}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} offset={{xs:1}}>
                                    <TextField style={{verticalAlign:'bottom'}} fullwidth label="Name" value={this.state.name} onChange={evt => this.setState({name: evt.target.value})}/>
                                </Col>
                            </Row>
                            <Row style={{paddingTop:'20px',paddingBottom:'20px'}}>
                                <Col xs={10} offset={{xs:1}} style={{textAlign:'left'}}>
                                    <Radio
                                        value="Male"
                                        checked={this.state.gender === 'Male'}
                                        onChange={evt => this.setState({gender: evt.target.value})}>
                                        Male
                                    </Radio>
                                </Col>
                                <Col xs={10} offset={{xs:1}} style={{textAlign:'left'}}>
                                    <Radio
                                        value="Female"
                                        checked={this.state.gender === 'Female'}
                                        onChange={evt => this.setState({gender: evt.target.value})}>
                                        Female
                                    </Radio>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} offset={{xs:1}}>
                                    <TextField textarea fullwidth label="Description" rows="8" value={this.state.description} onChange={evt => this.setState({description: evt.target.value})}/>
                                </Col>
                            </Row>
                            {this.state.captured?
                                <Row>
                                    <Col xs={10} offset={{xs:1}} style={{textAlign:'left'}}>
                                        <img
                                            style={style.captureImage}
                                            ref={(img) => {
                                                this.img = img;
                                            }}
                                        />
                                    </Col>
                                </Row>:""
                            }
                            <Row>
                                <Col xs={10} offset={{xs:1}} style={{textAlign:'left',marginTop:'15px'}}>
                                    <Button stroked onClick={()=>{
                                        this.setState({
                                            camera:true
                                        })
                                    }} ><ButtonIcon use="camera" />{this.state.captured?"Modify":"Add"} picture</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} offset={{xs:1}} style={{textAlign:'left',marginTop:'15px',marginBottom:'15px'}}>
                                    <Button stroked onClick={()=>{
                                        let self=this;
                                        navigator.geolocation.getCurrentPosition(function (position) {
                                            self.postData(position).then((data)=>{
                                                console.log('success',data);
                                                self.setState({
                                                    hospLat:data.hosp_gps.lat,
                                                    hospLon:data.hosp_gps.lng,
                                                    submitted:true
                                                });

                                            }).catch((err)=>{
                                                console.log('error',err);
                                            });
                                        });
                                    }} >Sumbit</Button>
                                </Col>
                            </Row>
                        </div>:""
                    }
                    {this.state.camera?
                        <div>
                            <div style={style.container}>
                                <Camera
                                    style={style.preview}
                                    ref={(cam) => {
                                        this.camera = cam;
                                    }}
                                    video={{facingMode: "environment"}}
                                >
                                    <div style={style.captureContainer} onClick={this.takePicture}>
                                        <div style={style.captureButton}>
                                            <Icon strategy="ligature" style={{lineHeight: '56px',transform: 'scale(1.5)'}}>
                                                camera</Icon>
                                        </div>
                                    </div>
                                </Camera>
                            </div>
                        </div>: ''
                    }
                    {this.state.submited&&!this.state.camera?
                        <div id="map-canvas" style={{height:'40vh'}}/>:""
                    }
                </main>
            </div>
        );
    }
}

export default App;
