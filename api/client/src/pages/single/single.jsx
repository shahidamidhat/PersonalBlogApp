import './single.css'
import Sidebar from '../../components/sidebar/sidebar'
import Singlepost from '../../components/singlePost/singlepost'

export default function Single(){
    return (
        <div className="single">
            <Singlepost/>
            <Sidebar/>
        </div>
    )
}