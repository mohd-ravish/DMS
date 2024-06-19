import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import docLogo from '../assets/doc-logo.png';
import { logout } from './ApiHandler/authFunctions';

const Sidebar = ({ handleDashboardAgain, handleDashboard, handleClick, role, controlAccess, isSidebarOpen }) => {
    const [isManageOpen, setIsManageOpen] = useState(false); // To open Manage section
    const [isGodModeOpen, setIsGodModeOpen] = useState(false); // To open God Mode section
    const [active, setActive] = useState('home');

    // Function to manage sidebar css
    const handleSlideBarClick = (item) => {
        setActive(item);
    };

    const toggleManage = () => {
        setIsManageOpen(!isManageOpen);
        setIsGodModeOpen(false); // Close God Mode when Manage is opened
    };

    const toggleGodMode = () => {
        setIsGodModeOpen(!isGodModeOpen);
        setIsManageOpen(false); // Close Manage when God Mode is opened
    };

    const navigate = useNavigate();

    return (
        <section id="sidebar" className={isSidebarOpen ? '' : 'hide'}>
            <a href="#" className="brand">
                <img src={docLogo} alt="logo" />
                <span className="text">DMS</span>
            </a>
            <ul className="side-menu top">
                <li className={active === 'home' ? 'active' : ''}>
                    <a href="#" onClick={() => { handleSlideBarClick('home'); handleClick('home'); handleDashboardAgain(); }}>
                        <i className='bx bxs-dashboard'></i>
                        <span className="text">Dashboard</span>
                    </a>
                </li>
                <li className={active === 'search' ? 'active' : ''}>
                    <a href="#" onClick={() => { handleSlideBarClick('search'); handleClick('search'); handleDashboard(); }}>
                        <i className='bx bx-search'></i>
                        <span className="text">Search</span>
                    </a>
                </li>
                <li className={active === 'manage' ? 'active' : ''}>
                    <a href="#" onClick={() => { handleSlideBarClick('manage'); toggleManage(); }}>
                        <i className='bx bx-brush-alt'></i>
                        <span className="text">Manage</span>
                        <i className={`bx ${isManageOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ marginLeft: 'auto' }}></i>
                    </a>
                </li>
                <ul className={`submenu ${isManageOpen ? 'open' : ''}`}>
                    <li className={active === 'myArtifacts' ? 'active' : ''}>
                        <a href="#" onClick={() => { handleSlideBarClick('myArtifacts'); handleClick('myArtifacts'); handleDashboard() }}>
                            <i className='bx bx-folder-open'></i>
                            <span className="text">My Artifacts</span>
                        </a>
                    </li>
                    <li className={active === 'uploadDocuments' ? 'active' : ''}>
                        <a href="#" onClick={() => { handleSlideBarClick('uploadDocuments'); handleClick('upload'); handleDashboard() }}>
                            <i className='bx bx-upload'></i>
                            <span className="text">Upload Document</span>
                        </a>
                    </li>
                    <li className={active === 'addUrl' ? 'active' : ''}>
                        <a href="#" onClick={() => { handleSlideBarClick('addUrl'); handleClick('addUrl'); handleDashboard() }}>
                            <i className='bx bx-link'></i>
                            <span className="text">Add URL</span>
                        </a>
                    </li>
                    {controlAccess === 'yes' && (
                        <>
                            <li className={active === 'demo' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('demo'); handleClick('demo'); handleDashboard() }}>
                                    <i class='bx bx-square-rounded' ></i>
                                    <span className="text">Demo</span>
                                </a>
                            </li>
                        </>
                    )}
                </ul>
                {role === 1 && ( // Only render God Mode if role is admin
                    <>
                        <li className={active === 'godMode' ? 'active' : ''}>
                            <a href="#" className='godText' onClick={() => { handleSlideBarClick('godMode'); toggleGodMode() }}>
                                <i className='bx bx-crown'></i>
                                <span className="text">God Mode</span>
                                <i className={`bx ${isGodModeOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`} style={{ marginLeft: 'auto' }}></i>
                            </a>
                        </li>
                        <ul className={`submenu ${isGodModeOpen ? 'open' : ''}`}>
                            <li className={active === 'systemSettings' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('systemSettings'); handleClick('systemSettings'); handleDashboard() }}>
                                    <i className='bx bx-cog'></i>
                                    <span className="text">System Settings</span>
                                </a>
                            </li>
                            <li className={active === 'checkUserActivity' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('checkUserActivity'); handleClick('userActivity'); handleDashboard() }}>
                                    <i className='bx bxs-user-detail'></i>
                                    <span className="text">Check User Activity</span>
                                </a>
                            </li>
                            <li className={active === 'changeUserAccess' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('changeUserAccess'); handleClick('userAccess'); handleDashboard() }}>
                                    <i className='bx bx-accessibility'></i>
                                    <span className="text">Change User Access</span>
                                </a>
                            </li>
                            <li className={active === 'controlAccess' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('controlAccess'); handleClick('controlAccess'); handleDashboard() }}>
                                    <i class='bx bx-street-view'></i>
                                    <span className="text">Control Access</span>
                                </a>
                            </li>
                            <li className={active === 'defineDocumentType' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('defineDocumentType'); handleClick('defineDocType'); handleDashboard() }}>
                                    <i className='bx bx-file'></i>
                                    <span className="text">Define Document Type</span>
                                </a>
                            </li>
                            <li className={active === 'manageAllArtifacts' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('manageAllArtifacts'); handleClick('manageAllArtifacts'); handleDashboard() }}>
                                    <i className='bx bxl-firebase'></i>
                                    <span className="text">Manage All Artifacts</span>
                                </a>
                            </li>
                            <li className={active === 'editTags' ? 'active' : ''}>
                                <a href="#" onClick={() => { handleSlideBarClick('editTags'); handleClick('editTags'); handleDashboard() }}>
                                    <i className='bx bx-purchase-tag'></i>
                                    <span className="text">Edit Tags</span>
                                </a>
                            </li>
                        </ul>
                    </>
                )}
                <li>
                    <a href="#" className="logout" onClick={() => { logout(navigate) }}>
                        <i className='bx bx-log-out-circle'></i>
                        <span className="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Sidebar;