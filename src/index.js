import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'font-awesome/css/font-awesome.css';
// 路由注入
// import { Router, Route ,browserHistory  } from 'react-router';
import {
    BrowserRouter as Router,
    // Link,
    Route,
    // Switch,
    // Redirect
} from 'react-router-dom';
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import todoApp from './reducers'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'

const loggerMiddleware = createLogger()

var store = createStore(todoApp,{
    togglePanel:'LOGIN',
    showTips:false,
    tipsText:'something wrong',
    wwmainPanel:true,
    checkedFriend:'',
    friendlist:[],
    friendInfor:{},
    recentlist:[],
    talkingFriend:'',
    chatRecords:[],
    userId:''
},applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    // loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
))
export {store};

// 修改原型链
Component.prototype.myDispatch = store.dispatch;

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}/>
        </Router>
    </Provider>,
document.getElementById('root'));
