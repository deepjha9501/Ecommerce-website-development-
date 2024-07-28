import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
    const [catdata, setcatdata] = useState([]);
    async function fetchallcat() {
        try {
            const resp = await axios.get("http://localhost:9000/api/getallcat")
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setcatdata(resp.data.catdata)
                }
                else {
                    setcatdata([]);
                }
            }
            else {
                alert("Some error occured")
            }
        }
        catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
        fetchallcat();
    }, [])
    return (
        <>
            <div className="login">
                <div className="container">
                    {
                        catdata.map((item, index) =>
                            <div className="col-md-4 top_brand_left" key={index}>
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                        <Link to={`/products?cat=${item._id}`}>
                                                            <img title=" " alt=" " src={`uploads/${item.catpic}`} height='125'/>
                                                            <p>{item.catname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </>
    )
}
export default Categories;