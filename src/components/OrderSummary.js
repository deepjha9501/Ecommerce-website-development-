import { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

function OrderSummary() {
    const {udata} = useContext(userContext);
    const [orderinfo,setorderinfo]=useState({});
    async function fetchorderid()
    {
        try
        {
            const resp =  await axios.get("http://localhost:9000/api/getorderid?un=" + udata.username)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setorderinfo(resp.data.orderdata);
                }
                else
                {
                   toast.error("Error while fetching details")
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    useEffect(()=>
    {
        if(udata!==null)
        {
            fetchorderid();
        }
    },[udata])
    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>Thanks for shopping on our website. Your order number is {orderinfo._id}</h2>
                </div>
            </div>
        </>
    )
}
export default OrderSummary;