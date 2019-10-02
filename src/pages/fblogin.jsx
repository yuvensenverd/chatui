import React from 'react'
import FacebookLogin from 'react-facebook-login'

class Fblogin extends React.Component{
    state= {
        isLoggedIn : false,
        userID : '',
        name : '',
        email : '',
        picture : ''
    }
    responseFacebook = response =>{
        
    }
    componentClicked = () => console.log('clicked')

    render(){
        let fbContent;

        if(this.state.isLoggedIn){
            fbContent = null;
        }else{
            fbContent = ( <FacebookLogin
                appId="645936472599840"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />)


        }

        return <div>{fbContent}</div>
    }
}

export default Fblogin