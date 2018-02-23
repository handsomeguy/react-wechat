import React, { Component } from 'react';
import './Friendinfo.css';
import header from '../assets/header.jpg';

export default class Friendinfo extends Component{
    render(){
        return (
            <div className="friend-infor"
            style={{display:!this.props.mainPanel?'block':'none'}}
            >
                <p className="infor-title">详细信息</p>
                <div className="infor-panel">
                    <img src={header} alt="" className="head-img2" />
                    <div className="sm-pane" 
                    style={{display:this.props.checkedFriend.length===0?'none':'block'}}
                    > 
                        <p className="infor-nickname">{this.props.friendInfor.nickname?this.props.friendInfor.nickname:'新用户'}</p>
                        <p className="infor-intro">{this.props.friendInfor.introduction?this.props.friendInfor.introduction:'暂无'}</p>
                        <span className="infor-email infor-sm"><span className="sm-t">邮箱:</span>{this.props.friendInfor.email?this.props.friendInfor.email:'暂无'}</span>
                        <span className="infor-address infor-sm"><span className="sm-t">地址:</span>{this.props.friendInfor.address?this.props.friendInfor.address:'暂无'}</span>
                        <button 
                            className='send-to-friend'
                            onClick={this.props.toggleToChat}
                         >发消息</button>
                    </div>
                </div>
            </div>
        )
    }
}