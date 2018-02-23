import React, { Component } from 'react';

class List extends Component{
    render(){
        let lists = [1,2,3];
        return(
            <div>
                this is my list
                <ul>
                    {
                        lists.map(function (ele,i) {
                            return <li key={i}>haha + {ele}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default List;