import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import {userChannel} from '../redux/actions/userAction'


const URLAPI = 'http://localhost:1998'

class ChatChannel extends React.Component{
    state = {
        data : [],
        finishload : false
    }

    componentDidMount(){
        if(this.props.userdata.userid && !this.state.finishload){
            console.log('get api')
            Axios.get(URLAPI + '/chat/getchannel?userid='+this.props.userdata.userid)
            .then((res)=>{
                this.setState({
                    data : res.data,
                    finishload  : true
                })
                var listchannel = res.data.map((val,i)=>{
                    return val.chatid
                })
                this.props.userChannel(listchannel)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    componentDidUpdate(){
        if(this.props.userdata.userid && !this.state.finishload){
            console.log('get api')
            Axios.get(URLAPI + '/chat/getchannel?userid='+this.props.userdata.userid)
            .then((res)=>{
                this.setState({
                    data : res.data,
                    finishload : true
                })
                var listchannel = res.data.map((val,i)=>{
                    return val.chatid
                })
                this.props.userChannel(listchannel)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }


    renderChatChannel = () =>{
        return this.state.data.map((val,id)=>{
            return(
                <Link to={`/chat?room=${val.chatid}`}>
                <div className="chatchannel">
                    {val.chatname}
                </div>
                </Link>
            )
        })
    }

    render(){
        console.log(this.props.userdata)
        return(
            <div>
                <h5>{`Hello, ${this.props.userdata.username}!,  You Are now signed in !`}</h5>
                {this.renderChatChannel()}
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata
  
    }
}
  
  export default connect(mapStateToProps, {userChannel})(ChatChannel);