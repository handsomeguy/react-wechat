// 异步action中请求数据
import fetch from 'isomorphic-fetch';
// 注入store辅助判断 
import {store} from './index.js';

/*
 * action 类型
 */
export const TOGGLE = 'TOGGLE';
export const TOGGLETIPS = 'TOGGLETIPS'

// 跨域请求url地址
var mode = 'cors'
var credentials = 'include'
const baseUrl = 'http://123.207.240.27';

// post请求url不做特殊处理
const _url = (subUrl)=>{
    return baseUrl+subUrl;
}
// get请求url
const _getUrl = (subUrl,data)=>{
    let finalUrl = '';
    finalUrl = data === undefined?'':'?'+transform(data);
    return baseUrl+subUrl+finalUrl;
}

// get请求封装和post请求封装
const fetch_get = (url,data)=>{
    return fetch(_getUrl(url,data),{
         mode,
         credentials
    })
}
const fetch_post = (url,data)=>{
    return fetch(_url(url),post(data))
}

// 封装直接处理post数据的参数配置
const transform = (data)=>{
    let arr = [];
    for(let p in data){
        arr.push(`${p}=${data[p]}`);
    }
    return arr.join('&');
}
const post = (data)=>{
    return {
        method: 'post', 
        mode, 
        credentials,
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body:transform(data)
    }
}


/*
 * action 创建函数
 */

// 切换注册和登录面板
export function toggleStatus() {
    return { type: TOGGLE }
}

//切换聊天和好友信息面板
export function toggleMainPanel(mark) {
    return { 
        type: 'toggleMainPanel',
        mark
    }
}

// 切换tips
export function toggleTips(text) {
    return { type: TOGGLETIPS,text }
}

// 保存用户id
export function storeUserId(id) {
    return{
        type:'saveId',
        id
    }
}

// 登录和注册请求 异步action 特殊处理
export function LogAndRegister(data,props) {
    return (dispatch)=>{
        var {togglePanel} = store.getState();
        if(togglePanel==='LOGIN'){
            return fetch_get('/login',data)
            .then((response)=>{ 
                response.json().then((data)=>{
                    if(data.result==='success'){
                        dispatch(storeUserId(data.id))
                        props.history.push('/chat')
                    }else{
                        dispatch(toggleTips('wrong,reason:'+data.reason));
                    }
                })
            })
        }else if(togglePanel === 'REGISTER'){
            return fetch_post('/register',data)
            .then(function(response) { 
                response.json().then((data)=>{
                    if(data.result==='success'){
                        dispatch(toggleTips('Register successfully!'));
                    }else{
                        dispatch(toggleTips('wrong,reason:'+data.reason));
                    }
                })
            })
        }
    }
}

//点击不同好友 切换class，同时更新好友信息面板
//因为要更新面板 异步获取信息 所以用异步action
export function checkFriendInfo(id) {
    return (dispatch)=>{
        // toggle class for friendlist
        dispatch(toggleFriend(id))
        fetch_get('/getUserInfor',{
            id
        }).then((res)=>{
            res.json()
            .then((data)=>{
                // error check
                if(data.result === 'failed'){
                    dispatch(toggleTips('wrong,reason:'+data.reason));
                    return;
                }
                // if success update panel for friend's infor
                dispatch(updateFriendInfo(data));
            })
        })
    }
}

//更新用户信息面板 每次点击 都要获取好友的个人信息
export function updateFriendInfo(data) {
    return {
        type:'updateFriendInfo',
        data
    }
}

//切换不同好友 查看好友信息
export function toggleFriend(id) {
    return {
        type:'checkFriendInfo',
        id
    }
}

//获取好友列表
export function getFriendlist() {
    return (dispatch)=>{
        fetch_get('/getList')
        .then((res)=>{
            res.json()
            .then((data)=>{
                try{
                    data = JSON.parse(data);
                }catch(err){
                    console.log(err);
                    dispatch(toggleTips('wrong,reason:'+err));
                    return;
                }
                // get data successfully
                if(data instanceof Array){
                    dispatch(updateList(data));
                }else{
                    dispatch(toggleTips('wrong,reason:'+data.err));
                }
            })
        })
        .catch((err)=>{
            console.log(err);
            dispatch(toggleTips('wrong,reason:'+err));
        })
    }
}

//更新好友列表
export function updateList(data) {
    return {
        type:'updatelist',
        data
    }
}

//切换到chat 面板
//因为还要获取聊天记录信息 所以用异步action
export function toggleToChat() {
    return (dispatch)=>{
        let {checkedFriend} = store.getState();
        // toggle panel first
        dispatch(toggleMainPanel(true));
        // update recent friendlist
        dispatch(updateRecentList(checkedFriend));
        // toggole recent friendlist class
        dispatch(toggleTalkingFriend(checkedFriend));
        // get chat record for chat box
        fetch_get('/getChatRecord',{
            id:checkedFriend
        })
        .then((res)=>{
            res.json()
            .then((data)=>{
                try{
                    data = JSON.parse(data);
                    data = handleRecordsData(data);
                    console.log(data)
                    dispatch(updateRecord(data))
                    // 滚动条置底
                    setTimeout(()=>{
                        document.getElementById('haha').scrollTop = document.getElementById('haha').scrollHeight
                    },0)
                }catch(err){
                    console.log(err);
                    return;
                }
            })
        })
    }
}

// 更新最近聊天的好友列表
export function updateRecentList(id) {
    let {friendlist} = store.getState();
    let nickname = '';
    friendlist.forEach((ele,i)=>{
        if(ele.id === id){
            nickname = ele.nickname
        }
    })
    return {
        type:'updateRecentList',
        user:{
            id,
            nickname
        }
    }
}

// recent friend click event
export function toggleTalkingFriend(id) {
    return{
        type:'toggleTalkingFriend',
        id
    }
}

// click recent friend ,toggle class and load new records
export function getNewRecord(id) {
    return (dispatch)=>{
        console.log(id);
        dispatch(toggleTalkingFriend(id));
        fetch_get('/getChatRecord',{
            id
        })
        .then((res)=>{
            res.json()
            .then((data)=>{
                try{
                    data = JSON.parse(data);
                    data = handleRecordsData(data);
                    dispatch(updateRecord(data))
                    // 滚动条置底
                    setTimeout(()=>{
                        document.getElementById('haha').scrollTop = document.getElementById('haha').scrollHeight
                    },0)
                }catch(err){
                    console.log(err);
                    return;
                }
                console.log(data);
            })
        })
    }
}

//update record list with one of your friends
export function updateRecord(data) {
    return{
        type:'updateRecord',
        data
    }
}

//sended message,then,add new record into panel
export function addNewRecord(data) {
    return{
        type:'addNewRecord',
        data
    }
}

//模拟实现异步action
export function asyncRequest() {
    return ()=>{
        new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log(1);
                resolve();
            },2000);
        })
        .then(()=>{
            console.log('ok');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

//send message to your friends
export function sendMessage(content) {
    return (dispatch)=>{
        let {talkingFriend,userId} = store.getState();
        fetch_post('/sendContent',{
            receiver:talkingFriend,
            content
        }).then((res)=>{
            res.json()
            .then((data)=>{
                if(data.result === 'success'){
                    dispatch(addNewRecord({
                        receiver:talkingFriend,
                        content,
                        sender:userId,
                        date:'',
                        mark:false
                    }))
                    // 滚动条置底
                    setTimeout(()=>{
                        document.getElementById('haha').scrollTop = document.getElementById('haha').scrollHeight
                    },0)
                }
                console.log(data);
            })
        })
    }
}

//get unread record 
export function intervalGetRecord() {
    return (dispatch)=>{
        fetch_get('/getUnreadChatRecord')
        .then((res)=>{
            res.json()
            .then((data)=>{
                try{
                    data = JSON.parse(data);
                    if(data instanceof Array && data.length > 0){
                        dispatch(updateRecentList(data[0].sender))
                    }
                    return;
                }catch(err){
                    console.log(err);
                    return;
                }
                console.log(data);
            })
        })
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function handleRecordsData(d) {
    let now = getNowFormatDate();
    let date = now.substr(0,10);
    let reg = new RegExp(date,'g');
    d = d.map(function (ele,i) {
        ele.date = ele.date.replace(reg,'');
        if(i===0){
            ele.mark = true;
            return ele;
        }
        if(i>=1){
            if(ele.date.length > 10){
                ele.mark = true;
            }else{
                ele.date = ele.date.replace(/\s/,'');
                let me = parseInt(ele.date.substr(0,2),10);
                let fr = parseInt(d[i-1].date.substr(0,2),10);
                if(d[i-1].date.length > 10){
                    fr = -1;
                }
                if(me !== fr){
                    ele.mark = true;
                }else{
                    let met = parseInt(ele.date.substr(3,2),10);
                    let frt = parseInt(d[i-1].date.substr(3,2),10);
                    if(met-5>frt){
                        ele.mark = true;
                    }else{
                        ele.mark = false;
                    }
                }
            }
        }
        return ele;
    })
    return d
}

