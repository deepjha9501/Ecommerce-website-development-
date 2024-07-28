import axios from "axios";
import { useState } from "react"
import { Link} from "react-router-dom"
function SearchUser() {
    const [uname,setuname]=useState();
    const [msg,setmsg]=useState();
    const [flag,setflag]=useState(false);
    const [udata,setudata]= useState({});
    async function searchuser(e)
    {
        e.preventDefault();
        try
        {
            const resp =  await axios.get(`http://localhost:9000/api/searchuser?un=${uname}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    setmsg("Incorrect Username");
                    setflag(false)
                }
                else if(resp.data.statuscode===1)
                {
                    setmsg("");
                    setflag(true)
                    setudata(resp.data.searchdata[0])
                }
            }
            else
            {
                setmsg("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Search User</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Search User</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={searchuser}>
            <input type="email" name="un" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)} />
            <input type="submit" name="btn" value="Search" /><br/>
            {msg}
            {
                flag?
                <>
                    <b>Name:-</b>{udata.pname}  <br/>
                    <b>Phone:-</b>{udata.phone} <br/>
                </>:null
            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchUser