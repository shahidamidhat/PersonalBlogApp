import './home.css'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import Posts from '../../components/posts/posts'
import { useEffect, useState } from 'react'
import {axiosInstance} from '../../config'
import { useLocation } from 'react-router-dom'

export default function Home(){
    const [posts,setPosts] = useState([])
    const { search} = useLocation();

    useEffect(()=>{
        const fetchPosts = async()=>{
            const res = await axiosInstance.get("/posts" + search)
            setPosts(res.data)
            console.log(res.data)
        }

        fetchPosts()
    },[search])
    return (
        <>
            <Header/>
            <div className="home">              
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    )
}