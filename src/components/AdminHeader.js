import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";

function AdminHeader() {
    const {udata,setudata} = useContext(userContext);
    const navigate = useNavigate();

    const [sterm,setsterm] = useState();

    function onlogout()
    {
        setudata(null);
        sessionStorage.clear();
        navigate("/homepage");
    }
    function gotocart()
    {
        navigate("/showcart");
    }
    function onsearch()
    {
        navigate("/searchresults?s=" + sterm);
    }
    return (
        <>
            <div className="agileits_header">
                <div className="container">
                    <div className="w3l_offers">
                        {
                            udata===null?
                            <p>Welcome Guest</p>:
                            <p>Welcome {udata.pname}</p>
                        }
                    </div>
                    <div className="agile-login">
                        {
                            udata===null?
                            <ul>
                                <li><Link to="/register">Create Account </Link> </li>
                                <li><Link to="/login">Login </Link></li>
                            </ul>:
                            <ul>
                                <li><Link to="/orderhistory">Your Orders </Link> </li>
                                <li><Link to="/changepassword">Change Password </Link> </li>
                                <li><button className="btn btn-primary" onClick={onlogout}>Logout</button></li>
                            </ul>
                        }
                        
                       
                    </div>
                    <div className="product_list_header">
                        {
                        udata!==null?
                        <form className="last">
                            <button className="w3view-cart" type="button" name="submit" value="" onClick={gotocart}>
                                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                            </button>
                        </form>:null
                        }
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="logo_products">
                <div className="container">
                    <div className="w3ls_logo_products_left1">
                        <ul className="phone_email">
                            <li><i className="fa fa-phone" aria-hidden="true"></i>Order online or call us : (+0123) 234 567</li>

                        </ul>
                    </div>
                    <div className="w3ls_logo_products_left">
                        <h1><Link to="/adminhome">Grocery World</Link> </h1>
                    </div>
                    <div className="w3l_search">
                        
                <input type="search" name="Search" placeholder="Search for a Product..." onChange={(e)=>setsterm(e.target.value)} required=""  />
                            <button type="submit" className="btn btn-default search" aria-label="Left Align" onClick={onsearch}>
                                <i className="fa fa-search" aria-hidden="true"> </i>
                            </button>
                            <div className="clearfix"></div>
                        
                    </div>

                    <div className="clearfix"> </div>
                </div>
            </div>
            <div className="navigation-agileits">
                <div className="container">
                    <nav className="navbar navbar-default">

                        <div className="navbar-header nav_2">
                            <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul className="nav navbar-nav">
                                <li><Link to="/adminhome">Home</Link></li>
                                <li class="dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown">Manage<b class="caret"></b></a>
										<ul class="dropdown-menu multi-column columns-3">
											<div class="row">
												<div class="multi-gd-img">
													<ul class="multi-column-dropdown">
														<h6>All Manage</h6>
														<li><Link to="/managecategory">Category</Link></li>
														<li><Link to="/manageproduct">Product</Link></li>
													</ul>
												</div>	
												
											</div>
										</ul>
								</li>
                                <li class="dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown">View<b class="caret"></b></a>
										<ul class="dropdown-menu multi-column columns-3">
											<div class="row">
												<div class="multi-gd-img">
													<ul class="multi-column-dropdown">
														<li><Link to="/listofusers">Users</Link></li>
														<li><Link to="/searchuser">Search User</Link></li>
														<li><Link to="/vieworders">Orders</Link></li>
													</ul>
												</div>	
												
											</div>
										</ul>
								</li>
                                
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default AdminHeader;