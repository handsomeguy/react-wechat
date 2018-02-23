import React, { Component } from 'react';
import './RecentItem.css';
import header from '../assets/header.jpg';

export default class RecentItem extends Component{
    render(){
        return (
            <div>
            {
                this.props.recentlist.map((ele,i)=>{
                    return(
                        <div 
                        className={this.props.talkingFriend===ele.id?"recent-item recent-item-hover":"recent-item"}
                        key={ele.id}
                        onClick={()=>this.props.onClickItem(ele.id)}
                        >
                            <img src={header}/>
                            {/* <span className="redpoint" 
                            v-show='friend.red'></span> */}
                            <div className="item-right">
                                <div className="some-detail">
                                    <span className="friend-name">{ele.nickname}</span>
                                    <span className="recent-time"></span>
                                </div>
                                <span className="recent-record"></span>
                            </div>  
                        </div>
                    )
                })
            }
             
            </div>
        )
    }
}