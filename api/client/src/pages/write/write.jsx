import {axiosInstance} from '../../config'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import './write.css'

export default function Write(){
    const [title,setTitle] = useState()
    const [desc,setDesc] = useState()
    const [file,setFile] = useState(null)
    const {user} = useContext(Context)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const newPost = {
            username:user.username,
            title,
            desc
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo = filename;

            try{
                await axiosInstance.post("/upload", data)
            }catch(err){

            }
            try{
                const res = await axiosInstance.post("/posts",newPost)
                window.location.replace("/post/" + res.data._id)
            }catch(err){

            }
            
        }
    }

    return (
        <div className="write">
            {file && 
                <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
            }
            
            <form action="" className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                    <i className="writeIcon fa fa-plus" aria-hidden="true"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder="Tell Your Story Here....." className="writeInput writeText" type="text" onChange={(e)=>setDesc(e.target.value)}></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}