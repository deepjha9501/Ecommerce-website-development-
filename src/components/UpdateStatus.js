import axios from "axios";
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
function UpdateStatus() {
    const [newst,setnewst]=useState();
    const [params] = useSearchParams();
    const orderid = params.get("oid");
    const navigate = useNavigate();
    async function onupdatestatus(e)
    {
        e.preventDefault();
        const updatedata = {newst,orderid};
        try
        {
            const resp =  await axios.put("http://localhost:9000/api/updatestatus",updatedata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    toast.error("Error while updating status")
                }
                else if(resp.data.statuscode===1)
                {
                   toast.success("Status updated successfully")
                   navigate("/vieworders");
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            toast.error(err.message)
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Update Status</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Update Status</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                    <form name="form1" onSubmit={onupdatestatus}>
                        <select name="newstatus" className="form-control" onChange={(e)=>setnewst(e.target.value)}>
                            <option value="">Choose New Status</option>
                            <option>Confirmed</option>
                            <option>Shipped</option>
                            <option>In-Transit</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                            <option>Returned</option>
                        </select>
                        <input type="submit" name="btn" value="Update" /><br/>
                    </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpdateStatus