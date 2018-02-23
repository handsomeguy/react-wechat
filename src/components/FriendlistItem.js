import React, { Component } from 'react';
import './FriendlistItem.css';
import header from '../assets/header.jpg';

export default class FriendlistItem extends Component{
    componentWillMount(){
        this.props.getFriendlist();
        // setInterval to get unread record;
        setInterval(()=>{
            this.props.intervalGetRecord()
        },3000)
    }
    render(){
        return (
            <div>
                {
                    this.props.friends.map((friend)=>{
                        return (
                            <div 
                            className={this.props.checkedFriend===friend.id?"record-item-hover record-item":"record-item"}
                            onClick={()=>this.props.onClickItem(friend.id)}
                            key={friend.id}
                            >
                                <img src={header}/>
                                <p className="user-name">{friend.nickname}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}