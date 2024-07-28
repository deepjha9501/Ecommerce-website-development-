import Header from './components/Header';
import Footer from './components/Footer';
import SiteRoutes from './components/SiteRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from 'react';
import AdminHeader from './components/AdminHeader';

const userContext = createContext(null);

function App() {
  const [udata,setudata] = useState(null);
  useEffect(()=>
  {
    if(sessionStorage.getItem("userdata")!==null)
    {
      setudata(JSON.parse(sessionStorage.getItem("userdata")));
    }
  },[])
  return (
    <>
      <userContext.Provider value={{udata,setudata}}>
        {
          udata===null?<Header/>
          :udata.usertype==="admin"?<AdminHeader/>:
          <Header/>
        }
        <SiteRoutes/>
        <Footer/>
      </userContext.Provider>
      <ToastContainer theme='colored' />
    </>
  );
}
export default App;
export {userContext};