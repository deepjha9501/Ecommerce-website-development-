import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Products() {
    const [params] = useSearchParams();
    const catid = params.get("cat");
    const [prodsdata,setprodsdata]=useState([]);
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
    return (
        <>
            <div className="login">
                <div className="container">
                    {
                        prodsdata.length>0?
                        prodsdata.map((item, index) =>
                            <div className="col-md-4 top_brand_left" key={index}>
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                        <Link to={`/details?pid=${item._id}`}>
                                                            <img title=" " alt=" " src={`uploads/${item.picture}`} height='125'/>
                                                            <p>{item.pname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ):<h2>No products found</h2>
                    }


                </div>
            </div>
        </>
    )
}
export default Products;