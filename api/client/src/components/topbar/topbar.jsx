import './topbar.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function Topbar(){
    const {user,dispatch} = useContext(Context);
    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"})
        window.location.replace("/login")
    }
    const PF = "https://midhatblog.herokuapp.com/images/"
    return (
        <div>
            <div className="top">
                <div className="topleft">
                <i className="topbaricons fa fa-facebook-square fa-2x" aria-hidden="true"></i>
                <i className="topbaricons fa fa-instagram fa-2x"></i>
                <i className="topbaricons fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                <i className="topbaricons fa fa-youtube-square fa-2x" aria-hidden="true"></i>
                </div>
                <div className="topcenter">
                    <ul className="toplist">
                        <li className="toplistitem"><Link className="link" to="/" >HOME</Link> </li>
                        <li className="toplistitem"><Link className="link" to="/" >ABOUT</Link> </li>
                        <li className="toplistitem"><Link className="link" to="/" >CONTACT</Link> </li>
                        <li className="toplistitem"><Link className="link" to="/write" >WRITE</Link> </li>
                        <li className="toplistitem" onClick={handleLogout}>{user && "LOGOUT"}</li>
                        
                    </ul>
                </div>
                <div className="topright">
                    {user ? <Link to='/setting'><img className="topimg" src={PF+user.profilePic} alt="" /></Link>  : 
                        <ul className="toplist">
                            <li className="toplistitem"><Link className="link" to="/login" >LOGIN</Link></li>
                            <li className="toplistitem"><Link className="link" to="/register" >REGISTER</Link></li>
                        </ul>
                    }
                    <i className="topsearch fa fa-search" aria-hidden="true"></i>
                    
                </div>
            </div>
        </div>
    )
}
