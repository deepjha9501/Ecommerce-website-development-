import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"
function Signup() {
    const [name,setname] = useState();
    const [phone,setphone] = useState();
    const [uname,setuname] = useState();
    const [pass,setpass] = useState();
    const [cpass,setcpass] = useState();
    const [msg,setmsg] = useState();
    const [terms,setterms] = useState(false);
    async function onregister(e)
    {
        e.preventDefault();//it will prevent form from getting submit
        if(terms===true)
        {
            if(pass===cpass)
            {
                const regdata={name,phone,uname,pass}
                try
                {
                    const resp =  await axios.post("http://localhost:9000/api/signup",regdata)
                    if(resp.status===200)
                    {
                        setmsg(resp.data.msg)
                    }
                    else
                    {
                        setmsg(resp.data.msg)
                    }
                }
                catch(err)
                {
                    setmsg(err.message);
                }
            }
            else{
                setmsg("Password and confirm password doesn't match")
            }
        }
        else{
            setmsg("Please accept terms & conditions")
        }
    }
    return (
        <>
                <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Register Page</li>
                    </ol>
                </div>
            </div>
            <div className="register">
                <div className="container">
                    <h2>Register Here</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={onregister}>
                            <input type="text" name="pname" onChange={(e)=>setname(e.target.value)} placeholder="Name..." required=" " /><br/>
                            <input type="tel" name="phone" onChange={(e)=>setphone(e.target.value)} placeholder="Phone..." required=" " />
                        <h6>Login information</h6>
                            <input type="email" name="un" onChange={(e)=>setuname(e.target.value)} placeholder="Email Address(Username)" required=" " />
                            <input type="password" name="pass" onChange={(e)=>setpass(e.target.value)} placeholder="Password" required=" " />
                            <input type="password" name="cpass" onChange={(e)=>setcpass(e.target.value)}placeholder="Password Confirmation" required=" " />
                            <div className="register-check-box">
                                <div className="check">
                                    <label className="checkbox">
                                        <input type="checkbox" name="cbx1" onChange={(e)=>setterms(e.target.checked)}/><i> </i>I accept the terms and conditions</label>
                                </div>
                            </div>
                            <input type="submit" name="btn" value="Register"/>
                            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup