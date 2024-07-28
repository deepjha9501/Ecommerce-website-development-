import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "react-toastify";
function ManageProduct() {
    const [catid,setcatid]=useState("");
    const [pname,setpname]=useState();
    const [rate,setrate]=useState();
    const [dis,setdis]=useState();
    const [stock,setstock]=useState();
    const [descp,setdescp]=useState();
    const [picture,setpicture]=useState(null);
    const [msg,setmsg]=useState();

    const [catdata,setcatdata]=useState([]);
    const [prodsdata,setprodsdata]=useState([]);

    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);
    const fileInputRef = useRef(null);

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
        if(catid!=="")
        {
            fetchprodsbycat();
        }
    },[catid])

    async function fetchprodsbycat()
    {
        try
        {
            const resp =  await axios.get(`http://localhost:9000/api/fetchprodsbycatid?cid=${catid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setprodsdata(resp.data.proddata)
                }
                else
                {
                    setprodsdata([]);
                    toast.info("No products found");
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

    async function addproduct(e)
    {
        e.preventDefault();
        try
        {
            const formdata = new FormData();
            formdata.append("catid",catid)
            formdata.append("pname",pname)
            formdata.append("rate",rate)
            formdata.append("dis",dis)
            formdata.append("stock",stock)
            formdata.append("descp",descp)

            if(picture!==null)
            {
                formdata.append("picture",picture)
            }

            const resp =  await axios.post(`http://localhost:9000/api/saveproduct`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Product added successfully")
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Product not added");
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

          
            formdata.append("catid",catid)
            formdata.append("pname",pname)
            formdata.append("rate",rate)
            formdata.append("dis",dis)
            formdata.append("stock",stock)
            formdata.append("descp",descp)
           //either oldname or new name

            if(picture!==null)
            {
                formdata.append("catpic",picture)
            }
            formdata.append("oldpicname",picname)
            formdata.append("cid",catid);
            const resp =  await axios.put(`http://localhost:9000/api/updateproduct`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Category updated successfully")
                   oncancel();
                   fetchprodsbycat();
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
            const resp =  await axios.delete(`http://localhost:9000/api/delpro/${id}`);
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    toast.success("User deleted successfully");
                    fetchprodsbycat();
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
        setpname(catitem.pname)
         setpicname(catitem.picture)
        setcatid(catitem._id);
    }
    function oncancel()
    {
        // seteditmode(false);
        // setcname("")
        // setpicname("")
        // setcatid("");
        // if (fileInputRef.current) 
        // {
        //     fileInputRef.current.value = '';
        // }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Manage Product</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Manage Product</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={addproduct}>

            <select name="cat" className="form-control" onChange={(e)=>setcatid(e.target.value)}>
                <option value="">Choose Category</option>
                {
                    catdata.map((item,index)=>
                    <option value={item._id} key={index}>{item.catname}</option>
                    )
                }
            </select>

            <input type="text" name="prodname" value={pname} placeholder="Product Name" required=" " onChange={(e)=>setpname(e.target.value)} />
            <input type="text" name="rate" value={rate} placeholder="Rate" required=" " onChange={(e)=>setrate(e.target.value)} /><br/>

            <input type="text" name="dis" value={dis} placeholder="Discount(in percent, do not add % symbol)" required=" " onChange={(e)=>setdis(e.target.value)} /><br/>

            <input type="text" name="stock" value={stock} placeholder="Stock" required=" " onChange={(e)=>setstock(e.target.value)} /><br/>
            
            <textarea name="des" placeholder="Description" className="form-control" value={descp} onChange={(e)=>setdescp(e.target.value)}></textarea><br/>


            {
                editmode?
                <>
                    <img src={`uploads/${picname}`} height='100'/>
                    Choose new image, if required<br/><br/>
                </>:null
            }

            <input type="file" name="ppic" ref={fileInputRef} onChange={(e)=>setpicture(e.target.files[0])} /><br/>

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
                        prodsdata.length>0?
                        <>
                            <h2>Added Products</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Product Name</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                prodsdata.map((item,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${item.picture}`}  height='75'/></td>
                                    <td>{item.pname}</td>
                                    <td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>ondel(item._id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {prodsdata.length} products found
                        </>:null
                    }

                </div>
            </div>
        </>
    )
}
export default ManageProduct