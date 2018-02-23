import React, { Component } from 'react';
import './Chatbox.css'
import header from '../assets/header.jpg';

export default class Chatbox extends Component{
    constructor(props){
        super(props);
        // 绑定this
        this.trySendMessage = this.trySendMessage.bind(this);
    }
    trySendMessage(){
        let value = this.refs.message.value;
        if(value === ''){
            return;
        }else{
            this.refs.message.value = ''
            this.props.sendMessage(value);
        }
    }
    render(){
        var userid = this.props.userId;
        return (
            <div className="contact-box"
            style={{display:this.props.mainPanel?'block':'none'}}
            >
                <p className="talking-name">对话好友</p>
                <div className="record-box" id='haha'>
                    <p className="sm-tips" 
                    style={{display:this.props.chatRecords.length===0?'block':'none'}}
                    >暂时没有消息</p>
                    <div className="sm-record-box" v-show='records.length !== 0' ref='container'  >
                        {
                            this.props.chatRecords.map((ele,i)=>{
                                return (
                                    <div className="single-record" key={i}>
                                        <p className="record-time"
                                        style={{display:ele.mark?'block':'none'}}
                                         >{ele.date}</p>
                                        <div 
                                        className={userid===ele.sender?"maintext mytext":"maintext friendtext"}
                                        >
                                            <img src={header} alt="" className="headimg" />
                                            <div className="record-text">
                                                {ele.content}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })   
                        }
                    </div>
                </div>
                <div className="banner">
                    <div className="tools-base">
                        <span className="emoji"></span>
                    </div>
                    <div className="textinput-box">
                        <textarea className="textinput" 
                        ref='message'></textarea>
                    </div>
                    <div className="banner-bottom">
                        <button 
                        className="sendNewMessage right" 
                        onClick={this.trySendMessage}
                        >发送</button>
                        <span className="sm-tips-bottom right">按下Ctrl+Enter换行</span>
                    </div>
                </div>
            </div>
        )
    }
}