import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {

    const navigate = useNavigate();

    const handleToHomePage = () => {
        navigate(`/`);
    }

    return (
        <div className='nav-set sticky-top'>
            <div className='d-flex float-left align-items-center justify-content-between container'>
                <div className='d-flex float-left align-items-center gap-3'>
                    <h1>Happy</h1>
                    <div className='opacity-50'>Sipariş Takip Sistemi</div>
                </div>
                <div className='d-flex justify-content-end gap-3'>
                    <div onClick={handleToHomePage} className='navbar-home-btn'>Ana Sayfa</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
