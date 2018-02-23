import React, { Component } from 'react';
// import logo from './logo.svg';
import header from '../assets/header.jpg'
import './App.css';
import { connect } from 'react-redux'
import {
  // BrowserRouter as Router,
  // Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import Login from './Login';
import Tips from './Tips';
import Chatbox from './Chatbox';
import Friendinfo from './Friendinfo';
import FriendlistItem from './FriendlistItem'
import RecentItem from './RecentItem'

import {toggleStatus,
        LogAndRegister,
        asyncRequest,
        toggleMainPanel,
        checkFriendInfo,
        getFriendlist,
        intervalGetRecord,
        toggleToChat,
        sendMessage,
        getNewRecord,
        toggleTips} from '../actions'

class App extends Component {
  render() {
    // console.log(this.props)
    const { dispatch,
          togglePanel,
          showTips,
          tipsText,
          friendlist,
          checkedFriend,
          recentlist,
          talkingFriend,
          chatRecords,
          friendInfor,
          userId,
          wwmainPanel } = this.props
    // var recentlist2 = [{
    //   id:1,nickname:'123'},
    //   {id:2,nickname:'123123'
    // }]
    return (
      <div id="app">
        <Switch>

          {/* 登录面板 */}
          <Route path='/login' render={props => (
            <Login
             togglePanel={togglePanel}
             toggle={()=>dispatch(toggleStatus())}
             submitInfor={(val)=>dispatch(LogAndRegister(val,this.props)) }
             />
          )}/>

          {/* 聊天面板 */}
          <Route path='/chat' render={props => (
            <div className="chat-box">
                <div className="panel-left">
                      <div className="header">
                          <div className="avatar">
                              <img className="img" src={header}/>
                          </div>
                          <div className="info">
                              <div className="nickname">
                                  <span className="display_name ng-binding">Mr.培森</span>
                                  <a className="opt" href="#"><i className="web_wechat_add"></i></a>
                              </div>
                          </div>
                      </div>
                      <div className="toggle-panel">
                          <div className="single-item ">
                              <span 
                              className={wwmainPanel?"chat-fri-hover public-chat":"chat-fri public-chat"}
                              onClick={()=>dispatch(toggleMainPanel(true))}
                               >
                              </span>
                          </div>
                          <div className="single-item">
                              <span 
                              className={!wwmainPanel?"chat-list-hover public-chat":"chat-list public-chat"}
                              onClick={()=>dispatch(toggleMainPanel(false))}
                              >
                              </span>
                          </div>
                      </div>
                      <div className="friend-container">
                          <div className="recent"
                          style={{display:wwmainPanel?'block':'none'}}
                          >
                              <RecentItem
                              recentlist={recentlist}
                              talkingFriend={talkingFriend}
                              onClickItem={(id)=>dispatch(getNewRecord(id))}
                              />
                          </div>
                          <div className="friendlist"
                          style={{display:!wwmainPanel?'block':'none'}}
                          >
                              <FriendlistItem
                              friends={friendlist} 
                              checkedFriend={checkedFriend}
                              intervalGetRecord={()=>dispatch(intervalGetRecord())}
                              onClickItem={(id)=>dispatch(checkFriendInfo(id))}
                              getFriendlist={()=>dispatch(getFriendlist())}
                              />
                          </div>
                      </div>
                </div>
                <div className="panel-right">
                    <Chatbox 
                    mainPanel={wwmainPanel}
                    chatRecords={chatRecords}
                    userId={userId}
                    sendMessage={(message)=>{
                        dispatch(sendMessage(message))}
                        }
                    />
                    <Friendinfo
                    mainPanel={wwmainPanel}
                    friendInfor={friendInfor}
                    checkedFriend={checkedFriend}
                    toggleToChat={()=>dispatch(toggleToChat())}
                     /> 
                </div>
            </div>
          )}/>
          <Redirect from='/' to='/login'/>
        </Switch>

        {/* 提示面板 */}
        <Tips 
          showTips={showTips}
          tipsText={tipsText}
          hideTips={()=>dispatch(toggleTips('hide tips'))}
        />
      </div>
    );
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
