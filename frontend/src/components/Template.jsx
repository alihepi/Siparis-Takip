import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Template = () => {
  return (
    <div >
      <Navbar/>
      <div className='home container'>
        <Outlet />    
      </div>
      <Footer /> 
    </div>
  );
};

export default Template;
