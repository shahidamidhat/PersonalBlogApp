import { useEffect, useState } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config';

export default function Sidebar(){

    const[cats,setCats] = useState([]);

    useEffect(()=>{
        const getCats = async ()=>{
            const res = await axiosInstance.get("/categories")
            setCats(res.data)
        }
        getCats();
    },[])
    return (
        <div className="sidebar">
            <div className="sidebaritems">
                <span className="title">ABOUT ME</span>
                <img src='https://weneedfun.com/wp-content/uploads/2016/07/Latest-Hidden-Face-Girls-Display-Pictures-26.jpg' alt='' />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo officiis nostrum quasi vel quis beatae dolores, porro iure.</p>
            </div>
            <div className="sidebaritems">
                <span className="title">CATEGORIES</span>
                <ul className="sidebarlist">
                    {cats.map((c)=>(
                        <Link to={`/?cat=${c.name}`} className="link"><li className="listitems">{c.name}</li></Link>
                        
                    ))}
                    
                </ul>                
            </div>
            <div className="sidebaritems">
                <span className="title">FOLLOW</span>
                    <div className="social">
                    <i className="sidebaricons fa fa-facebook-square fa-2x" aria-hidden="true"></i>
                    <i className="sidebaricons fa fa-instagram fa-2x"></i>
                    <i className="sidebaricons fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                    <i className="sidebaricons fa fa-youtube-square fa-2x" aria-hidden="true"></i>
                    </div>
            </div>
        </div>
    )
}