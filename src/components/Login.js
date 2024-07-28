import axios from "axios";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userContext } from "../App";
function Login() {
    const [uname,setuname]=useState();
    const [pass,setpass]=useState();
    const [msg,setmsg]=useState();
    const navigate = useNavigate();

    const {setudata} = useContext(userContext);

    async function onlogin(e)
    {
        e.preventDefault();
        const logindata = {uname,pass};
        try
        {
            const resp =  await axios.post("http://localhost:9000/api/login",logindata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    setmsg("Incorrect Username/Password")
                }
                else if(resp.data.statuscode===1)
                {
                    setudata(resp.data.pdata);
                    sessionStorage.setItem("userdata", JSON.stringify(resp.data.pdata));
                    navigate("/homepage")
                }
            }
            else
            {
                setmsg("Some error occured");
            }
        }
        catch(err)
        {
            
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Login Page</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Login Form</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onlogin}>
            <input type="email" name="un" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)} />
            <input type="password" name="pass" placeholder="Password" required=" " onChange={(e)=>setpass(e.target.value)}/>
            <input type="submit" name="btn" value="Login" /><br/>
            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login