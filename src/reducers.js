import { combineReducers } from 'redux'
import { TOGGLE,TOGGLETIPS} from './actions'
// const { SHOW_ALL } = VisibilityFilters
// ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters,


// function visibilityFilter(state = SHOW_ALL, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return action.filter
//     default:
//       return state
//   }
// }

// function todos(state = [], action) {
//   switch (action.type) {
//     case ADD_TODO:
//       return [
//         ...state,
//         {
//           text: action.text,
//           completed: false
//         }
//       ]
//     case COMPLETE_TODO:
//       return [
//         ...state.slice(0, action.index),
//         Object.assign({}, state[action.index], {
//           completed: true
//         }),
//         ...state.slice(action.index + 1)
//       ]
//     default:
//       return state
//   }
// }

function togglePanel(state = 'LOGIN',action) {
    switch (action.type) {
        case TOGGLE:
            return state==='LOGIN'?'REGISTER':'LOGIN';
        default:
            return state
    }
}

function showTips(state=false,action) {
    switch (action.type) {
        case TOGGLETIPS:
            return !state
        default:
            return state
    }
}

function tipsText(state='something wrong',action) {
    switch (action.type) {
        case TOGGLETIPS:
            return action.text
        default:
            return state
    }
}

function wwmainPanel(state=true,action) {
    switch (action.type) {
        case 'toggleMainPanel':
            return action.mark
        default:
            return state
    }
}

function checkedFriend(state='',action) {
    switch (action.type) {
        case 'checkFriendInfo':
            return action.id
        default:
            return state
    }
}

function friendlist(state=[],action) {
    switch (action.type) {
        case 'updatelist':
            return action.data
        default:
            return state
    }
}

function friendInfor(state={},action) {
    switch (action.type) {
        case 'updateFriendInfo':
            return action.data
        default:
            return state
    }
}

function recentlist(state=[],action) {
    switch (action.type) {
        case 'updateRecentList':{
            let index = -1;
            state.forEach((ele,i)=>{
                if(ele.id === action.user.id){
                    index = i;
                }
            })
            if(index < 0){
                return [
                    action.user,
                    ...state,
                ]
            }else{
                return [
                    action.user,
                    ...state.slice(0,index),
                    ...state.slice(index+1)
                ]
            }
        }
        default:
            return state
    }
}

function talkingFriend(state='',action) {
    switch (action.type) {
        case 'toggleTalkingFriend':
            return action.id
        default:
            return state
    }
}

function chatRecords(state=[],action) {
    switch (action.type) {
        case 'updateRecord':
            return action.data;
        case 'addNewRecord':
            return [
                ...state,
                action.data
            ]
        default:
            return state
    }
}

function userId(state='',action) {
    switch (action.type) {
        case 'saveId':
            return action.id
        default:
            return state
    }
}



const todoApp = combineReducers({
  togglePanel,
  showTips,
  tipsText,
  wwmainPanel,
  checkedFriend,
  friendlist,
  friendInfor,
  recentlist,
  talkingFriend,
  chatRecords,
  userId
})

export default todoApp