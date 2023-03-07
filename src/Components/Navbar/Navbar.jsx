import './Navbar.css'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from 'react-google-login';
import { ReactComponent as GoogleIcon } from '../../images/google-icon.svg';
import { auth } from '../../redux/actions';
import { LOGOUT } from '../../redux/actions';
import { useEffect } from "react";
import { gapi } from 'gapi-script';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    useEffect(() => {
        gapi.load('client:auth2', ()=>{
          gapi.client.init({
            clientId: '733992931171-gjd9utoojt376cq1b0l9ut8prvikebbn.apps.googleusercontent.com',
            scope: 'email',
          });
        });
    }, []);
    
    const dispatch = useDispatch();
    
    const authData = useSelector(state => state.authReducer.authData);
    
    const googleSuccess = async (res) => {        
        try {
          dispatch(auth(res.profileObj));
        } catch (error) {
          console.log(error);
        }
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
        setUser(null);
    }

    return(
        <div>
            <div className='login-button-wrap'>
                {user || authData ?
                    <div className='profile-block-wrap'>
                        <div className='logout-block'>
                            <button onClick={logout} type="submit">
                                Logout
                            </button>
                        </div>
                        <div className='profile-block'>
                            <img alt="" src={authData ? authData.imageUrl : user.imageUrl} />
                            <h1>{authData ? authData.name : user.name}</h1>
                        </div>
                    </div>
                    :  <div className='login-button'>
                        <GoogleLogin className='login-button'
                                clientId="733992931171-gjd9utoojt376cq1b0l9ut8prvikebbn.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    renderProps.disabled ? 
                                    <button type="submit" >
                                        <GoogleIcon className='google-icon' />
                                        Google Sign In
                                    </button>
                                    : <button onClick={renderProps.onClick} disabled={renderProps.disabled} type="submit">
                                        <GoogleIcon className='google-icon' />
                                        Google Sign In
                                    </button>
                                )}
                                onSuccess={googleSuccess}
                                cookiePolicy="single_host_origin"
                        />   
                    </div>      
                }
            </div>
        </div>
    )
}

export default Navbar;