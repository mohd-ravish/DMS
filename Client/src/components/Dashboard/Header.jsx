import React, { useState } from 'react';
import profile from '../../assets/profile.png';

const Navbar = ({ username, role, toggleSidebar }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <nav>
            <i className='bx bx-menu' onClick={toggleSidebar}></i>
            <div className="profile">
                <div className="notification-icon">
                    <i className='bx bx-bell bx-sm' onClick={toggleDrawer}></i>
                </div>
                <p>Hey, {username}<br /><b>{role === 1 ? 'Admin' : 'User'}</b></p>
                <img src={profile} alt="profile" />
            </div>
            <div className={`notification-drawer ${isDrawerOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h4>Notifications</h4>
                    <i className ='bx bx-x-circle' onClick={toggleDrawer}></i>
                </div>
                <div className="drawer-content">
                    <p>No new notifications</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;