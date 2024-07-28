import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
function ManageCategory() {
    const [catid,setcatid]=useState();
    const [cname,setcname]=useState();
    const [cpic,setcpic]=useState(null);
    const [msg,setmsg]=useState();
    const [catdata,setcatdata]=useState([]);
    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    async function fetchallcat()
    {
        try
        {
            const resp =  await axios.get("http://localhost:9000/api/getallcat")
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setcatdata(resp.data.catdata)
                }
                else
                {
                    setcatdata([]);
                }
            }
            else
            {
                alert("Some error occured")
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    useEffect(()=>
    {
        fetchallcat();
    },[])

    useEffect(()=>
    {
        if(sessionStorage.getItem("userdata")===null)
        {
            toast.error("Please login to access the page");
            navigate("/login");
        }
        else
        {   
            var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
            if(uinfo.usertype!=="admin")
            {
                toast.error("Please login to access the page");
                navigate("/login");
            }
        }
    },[])

    async function addcategory(e)
    {
        e.preventDefault();
        try
        {
            const formdata = new FormData();
            formdata.append("catname",cname)
            if(cpic!==null)
            {
                formdata.append("catpic",cpic)
            }
            const resp =  await axios.post(`http://localhost:9000/api/savecategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Category added successfully")
                   oncancel();
                   fetchallcat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Category not added");
                }
            }
            else
            {
               alert("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }
    }
    async function updatedb()
    {
        try
        {
            const formdata = new FormData();
            formdata.append("catname",cname)//either oldname or new name

            if(cpic!==null)
            {
                formdata.append("catpic",cpic)
            }
            formdata.append("oldpicname",picname)
            formdata.append("cid",catid);
            const resp =  await axios.put(`http://localhost:9000/api/updatecategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Category updated successfully")
                   oncancel();
                  fetchallcat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Category not updated");
                }
            }
            else
            {
               alert("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }

    }
    async function ondel(id)
    {
        var userresp=window.confirm("Are you sure to delete");
        if(userresp===true)
        {
            const resp =  await axios.delete(`http://localhost:9000/api/delcat/${id}`);
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    toast.success("User deleted successfully");
                    fetchallcat();
                }
                else if(resp.data.statuscode===0)
                {
                    alert("User not deleted");
                }
            }
            else
            {
                alert("Some error occured")
            }
        }
    }
    function onupdate(catitem)
    {
        seteditmode(true)
        setcname(catitem.catname)
        setpicname(catitem.catpic)
        setcatid(catitem._id);
    }
    function oncancel()
    {
        seteditmode(false);
        setcname("")
        setpicname("")
        setcatid("");
        setcpic(null)
        if (fileInputRef.current) 
        {
            fileInputRef.current.value = '';
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Manage Category</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Manage Category</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={addcategory}>
            <input type="text" name="catname" value={cname} placeholder="Category Name" required=" " onChange={(e)=>setcname(e.target.value)} /><br/>
            {
                editmode?
                <>
                    <img src={`uploads/${picname}`} height='100'/>
                    Choose new image, if required<br/><br/>
                </>:null
            }

            <input type="file" name="catpic" ref={fileInputRef} onChange={(e)=>setcpic(e.target.files[0])} /><br/>

            {editmode===false?<input type="submit" name="btn1" value="Add" />:null}
            {
                editmode?
                <>
                    <input type="button" className="btn btn-primary" name="btn2" value="Update" onClick={updatedb} /> &nbsp;
                    <input type="button" className="btn btn-primary" name="btn3" onClick={oncancel} value="Cancel" />
                </>:null
            }
            {msg}
                        </form>
                    </div><br/><br/>

                    {
                        catdata.length>0?
                        <>
                            <h2>Added Categories</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Category Name</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                catdata.map((item,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${item.catpic}`}  height='75'/></td>
                                    <td>{item.catname}</td>
                                    <td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>ondel(item._id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {catdata.length} categories found
                        </>:<h2>No categories found</h2>
                    }

                </div>
            </div>
        </>
    )
}
export default ManageCategory