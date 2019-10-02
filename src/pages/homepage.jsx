import React from 'react'
import '../assets/css/main.css'
import '../assets/css/util.css'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {logUser} from '../redux/actions/userAction'
import FacebookLogin from 'react-facebook-login'
import {
  FacebookShareButton,
  FacebookIcon
} from 'react-share';

const URLAPI = 'http://localhost:1998'


class HomePage extends React.Component{
  state={
    redirect : false,
    isLoggedIn : false,
    userID : '',
    name : '',
    email : '',
    picture : ''
  }
 

    onBtnLoginClick = () =>{
      var username = this.refs.inputuser.value
      var password = this.refs.inputpassword.value
      console.log({
        username,
        password
      })
      Axios.post(URLAPI+'/user/loginuser', {
        username,
        password
      })
      .then((res)=>{
        console.log('login success')
        console.log(res.data)
        this.props.logUser(res.data[0])
        
        this.setState({
          redirect : true
        })
      })
      .catch((err)=>{
        window.alert(err.response.data.err)
      })
      
    }

    responseFacebook = response =>{
        console.log('masuk')
        console.log(response)
        var data = {
          username : response.name,
          email : response.email,
          isfacebook : 1
        }
        Axios.post(URLAPI+'/user/registeruser', data)
        .then((res)=>{
          console.log(res.data)
          this.props.logUser(res.data[0])
        
          this.setState({
            redirect : true
          })
        })
        .catch((err)=>{
          console.log(err)
        })

    }
    componentClicked = () => console.log('clicked')


    render(){
      let fbContent;
      if(this.state.redirect){
        console.log('redirecttrue')
        return(
          <Redirect to='/channel'></Redirect>
        )
      }else{
        fbContent = ( <FacebookLogin
          cssClass="login100-form-btn btn-block mb-2 btn-primary"
          appId="645936472599840"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} />)
      }
        
          return(
              <div>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55" style={{width : "1000px"}}>
                <div className="login100-form validate-form flex-sb flex-w"  >
                  <span className="login100-form-title p-b-32">
                    Account Login
                  </span>
                  <span className="txt1 p-b-11">
                    Username
                  </span>
                  <div className="wrap-input100 validate-input m-b-36" >
                    <input className="input100" ref="inputuser" type="text" id="inputuser" />
                    <span className="focus-input100" />
                  </div>
                  <span className="txt1 p-b-11">
                    Password
                  </span>
                  <div className="wrap-input100 validate-input m-b-12" >
   
                      <i className="fa fa-eye" />
                
                    <input className="input100" ref="inputpassword" type="password" id="inputpass" />
                    <span className="focus-input100" />
                  </div>
                  <div className="container-login100-form-btn mt-4" >
                
                  <button className="login100-form-btn btn-block mb-2" id="buttonlog" onClick={() => this.onBtnLoginClick()}>
                    Login
                  </button>
                  {/* <Link to='/facebooklogin'>
                  <button className="login100-form-btn btn-block" id="buttonlog" style={{backgroundColor : 'lightblue'}} >
                    Login with facebook
                  </button>
                  </Link> */}
                  <div>{fbContent}</div>
                  <FacebookShareButton url={'www.google.com'}>
                    <FacebookIcon/>
                  </FacebookShareButton>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="dropDownSelect1" />
        </div>
          )
      }
}

const mapStateToProps= (state)=>{
  return{ 
    userdata : state.userdata

  }
}

export default connect(mapStateToProps, {logUser})(HomePage);