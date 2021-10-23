import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import './singlepost.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function Singlepost(){
    const location = useLocation();
    const path = location.pathname.split("/")[2]
    const [post,setPost] = useState({})
    const {user} = useContext(Context)
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [updatemode,setUpdatemode] = useState(false)

    useEffect(()=>{
        const getpost = async ()=>{
            const res = await axios.get('/posts/' + path)
            setPost(res.data)
            setDesc(res.data.desc)
            setTitle(res.data.title)
        }

        getpost();
    },[path]);

    const handleDelete = async ()=>{
        try{
            await axios.delete(`/posts/${post._id}`,{data:{username:user.username}})
            window.location.replace("/")
        }catch(err){

        }
    }

    const handleUpdate = async ()=>{
        try{
            await axios.put(`/posts/${post._id}`,{
            username:user.username,
            title,
            desc
        })
            setUpdatemode(false)
        }catch(err){

        }
    }

    const PF = "https://midhatblog.herokuapp.com/api/images/"

    return (
        <div className="singlepost">
            <div className="singlepostwrap">
                {post.photo && (
                <img className="singlepostimg" src={PF + post.photo} alt="" />)
            }
                {updatemode?(<input type="text" value={title} className="singlepostTitleInput" onChange={(e)=>setTitle(e.target.value)} autoFocus ></input>):(

                <h1 className="singlepostTitle">
                    {title}
                    {post.username === user?.username && 
                    <div className="singlepostedit">
                    <i className="singlepostIcon fa fa-pencil-square-o" aria-hidden="true" onClick={()=>{setUpdatemode(true)}}></i>
                    <i className="singlepostIcon fa fa-trash" aria-hidden="true"onClick={handleDelete}></i>
                </div>
                }
                </h1>)}
                
                <div className="singlepostInfo">
                    <span className="singlepostAuthor">Author: <Link to={`/?user=${post.username}`} className="link"><b>{post.username}</b></Link> </span>
                    <span className="singlepostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updatemode? (<textarea value={desc} className="singlepostDescInput" onChange={(e)=>setDesc(e.target.value)}></textarea>):(
                    <p className="singlepostDesc">{desc}</p>
                )}

                {updatemode && 
                <button className="updatebutton" onClick={handleUpdate}>Update</button>} 
                               
            </div>
        </div>
    )
}