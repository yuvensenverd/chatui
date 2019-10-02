import React from 'react'
// import Axios from 'axios'
// import io from 'socket.io-client'
// import { URLAPI } from '../types'
import { Route , Switch } from 'react-router-dom'
import ChatRoom from './pages/chatroom'
import Home from './pages/homepage'
import {logUser} from './redux/actions/userAction'
import { connect } from 'react-redux'
import ChatChannel from './pages/chatchannel'
import Facebook from './pages/fblogin'
import './App.css'


class App extends React.Component{
  componentDidMount(){
    if(localStorage.getItem('username') && localStorage.getItem('password') && localStorage.getItem('userid')){
      this.props.logUser({
        username : localStorage.getItem('username'),
        password : localStorage.getItem('password'),
        userid : localStorage.getItem('userid')
      }
      )
    }
  }

    render(){
      return (
        <div>
          <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/chat' component={ChatRoom}></Route>
          <Route path='/channel' component={ChatChannel}></Route>
          <Route path='/facebooklogin' component={Facebook}></Route>
          </Switch>
        </div>
        
      )
    }
  }

const mapStateToProps= (state)=>{
  return{ 
    userdata : state.userdata

  }
}

export default connect(mapStateToProps, {logUser})(App);