import React, { Component } from 'react';
import './Login.css';
import img from '../assets/mywife.png'

export default class Login extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }
    handleClick() {
        // 信息字段的收集
        let valueObj = {};
        for(let p in this.refs){
            valueObj[p] = this.refs[p].value
        }
        // console.log(valueObj);
        this.props.submitInfor(valueObj);
    }
    componentDidMount(){
        console.log('I am here');
    }
    render(){
        let togglePanel = this.props.togglePanel;
        return(
            <div className="login-box">
                <img src={img} className="head-img" alt='这是头像'/>
                <p className="head-title">PLEASE INPUT</p>
                <div className="input-container">    
                    <div className="input-item">
                        <i className="fa fa-user-o fa-awesome"></i>
                        <input 
                        type='text'
                        name='account'
                        className="form-control" 
                        ref="account" />
                    </div>
                    <div className="input-item">
                        <i className="fa fa-unlock-alt fa-awesome"></i>
                        <input 
                        type='password'
                        name='password'
                        className="form-control" 
                        ref="password" />
                    </div>
                </div>
                <div className="input-group">
                 <button className="submit-button" onClick={this.handleClick.bind(this)}>{togglePanel==='LOGIN'?'LOGIN':'REGISTER'}</button>
                </div>
                <span className="togglePanel-style"></span>
                <span className="togglePanel" onClick={this.props.toggle}>{togglePanel==='LOGIN'?'LOGIN':'REGISTER'}</span>
            </div>
        )
    }
}