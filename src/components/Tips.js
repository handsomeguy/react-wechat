import React, { Component } from 'react';
import './Tips.css'

export default class Tips extends Component{
    render(){
        return (
            <div className='tips-background' 
                style={{display:this.props.showTips?'block':'none'}}
                onClick={this.props.hideTips}
            >
                <span className='tips-text'>
                    {this.props.tipsText}
                </span>
            </div>
        )
    }
}