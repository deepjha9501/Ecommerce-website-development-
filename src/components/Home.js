import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }
  const slideImages = [
    {
      url: 'images/b1.jpg',
      caption: 'Slide 1'
    },
    {
      url: 'images/b3.jpg',
      caption: 'Slide 2'
    }
  ];
function Home() {
    const [prodsdata,setprodsdata]=useState([]);
    async function fetchlatestprods()
    {
        try
        {
            const resp =  await axios.get(`http://localhost:9000/api/fetchnewprods`)
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
    useEffect(()=>
    {  
        fetchlatestprods();
    },[])
    return (
        <>
        <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))} 
        </Slide>
        </div>
            <div className="login">
                <div className="container">
                <h2>Latest Products</h2><br/>
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
export default Home;