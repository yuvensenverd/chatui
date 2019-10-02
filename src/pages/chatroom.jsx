import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import queryString from 'query-string'
import Swal from 'sweetalert2'



const URLAPI = 'http://localhost:1998'

class Chatroom extends React.Component{
  state = {
    messages : [],
    userCount : 0,
    chatName : '',
    chatid : null
  }

  
  
  componentDidMount(){
    const values = queryString.parse(this.props.location.search)
    const chatid = values.room
    this.setState({
      chatid : values.room
    })

    
    this.socketConnection()
    // const socket = io(URLAPI) //localhost 
    // socket.on('user connected', (count)=>this.updateUserCount(count))
    // socket.on(`chat no ${chatid}`, (msgs)=>this.updateMessages(msgs) )

    // initial get 
    Axios.get(URLAPI+'/chat/getmessages?chatid=' + chatid) //localhost
    .then((res)=>{
      console.log('jalan')
      this.setState({
        messages : res.data
      })
    })
  }
// CSS TRANS
// ACTIVE AFTER,
// AFTER
  socketConnection = () =>{
    const socket = io(URLAPI) //localhost 
  
  
    var userchannel = this.props.userdata.chatlist
    if(userchannel.length !== 0){
      for(var i = 0; i<userchannel.length; i++){
        socket.on(`chat no ${userchannel[i]}`, (msgs)=>this.updateMessages(msgs))
        console.log(`chat no ${userchannel[i]}`, (msgs)=>this.updateMessages(msgs))
      }
    }
  }

  updateMessages = (msgs) => {

    console.log(msgs)
    var result = msgs.result
    if(msgs.type === this.state.chatid){

      if(result !== 'clear'){
  
        var arr = this.state.messages
        arr.push(result)
        this.setState({ messages: arr })
      }else{
        this.setState({
          messages : []
        })
  
      }
    }else{
      console.log('msg lain')
      console.log(msgs.result)
    
      if(msgs.result !== 'clear'){

        var timerInterval = null
        Swal.fire({
          title: 'New Message!',
          html: `${msgs.result.username} : ${msgs.result.message}`,
          timer: 2500,
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.timer
          ) {
            console.log('I was closed by the timer')
          }
        })
      }
      }

   
  
  }

  updateUserCount = (count) => {
    this.setState({ userCount: count })
  }

  onBtnSendClick = () => {
    const values = queryString.parse(this.props.location.search)
    const chatid = values.room
    Axios.post(URLAPI+'/chat/sendmessage?', {
      chatid : chatid,
      userid : this.props.userdata.userid,
      message : this.refs.message.value
    }).then((res) => {
      console.log('send message success!')
      document.getElementById('textbox').value = ''
    })
  }

  onBtnClearClick = () => {
    const values = queryString.parse(this.props.location.search)
    const chatid = values.room
    Axios.delete(URLAPI+`/chat/clearmessages?chatid=${chatid}`)
    .then((res) => {
      console.log(res.data)
    })
  }

  renderListMessage = () => {
    return this.state.messages.map((item, index) => {
      if(this.props.userdata.username === item.username){

        return (
          
          <div class="container">
            {/* <img src="/w3images/bandmember.jpg" alt="Avatar"/> */}
            <div><h5>{item.username}</h5></div>
            <div><p>{item.message}</p></div>
          
            <span class="time-right">11:00</span>
          </div>
        )
      }else{
        return (
          <div class="container darker" style={{textAlign : 'right'}}>
            <div><h5>{item.username}</h5></div>
            <div style={{textAlign : 'left'}}><p >{item.message}</p></div>
            <span class="time-left">11:01</span>
          </div>
        )
      }
    })
  }

  render(){
    console.log(this.props.userdata)
    return (
      <div>
        <div>
          {this.renderListMessage()}
        </div>
        
        <div className="d-flex flex-row footer">

        <input type='text' id='textbox' className='form-control' ref='message' />
        <input type='button' value='send' className='btn btn-secondary' onClick={this.onBtnSendClick}/>
        <input type='button' value='clear' className='btn btn-primary' onClick={this.onBtnClearClick}/>
        
        </div> 

      </div>
    )
  }
}

const mapStateToProps= (state)=>{
  return{ 
    userdata : state.userdata

  }
}

export default connect(mapStateToProps, null)(Chatroom);