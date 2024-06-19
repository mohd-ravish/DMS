import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Search from './Search/Search';
import MyArtifacts from './Manage/MyArtifacts';
import Upload from './Manage/Upload';
import AddUrl from './Manage/AddUrl';
import Demo from './Manage/Demo';
import SystemSettings from './GodMode/SystemSettings';
import UserActivity from './GodMode/UserActivity';
import UserAccess from './GodMode/UserAccess';
import ControlAccess from './GodMode/ControlAccess'
import ManageAllArtifacts from './GodMode/ManageAllArtifacts';
import EditTags from './GodMode/EditTags';
import DefineDocType from './GodMode/DefineDocType';
import { verifyUser } from './ApiHandler/authFunctions';
import { getControlAcessInfo } from './ApiHandler/usersFunctions';

function Dashboard() {
    // All dashboard components initial states (Home is set to true by default)
    const initialState = {
        home: true,
        search: false,
        myArtifacts: false,
        upload: false,
        addUrl: false,
        demo: false,
        systemSettings: false,
        userActivity: false,
        userAccess: false,
        controlAccess: false,
        manageAllArtifacts: false,
        editTags: false,
        defineDocType: false,
    };

    const [isDashboard, setIsDashboard] = useState(initialState.home); // Dashboard home
    const [isClicked, setIsClicked] = useState(initialState);  // To access different components of dashboard by sidebar
    const [username, setUsername] = useState("");  // Username to show on header
    const [role, setRole] = useState(null);  // Role ID (If 1 then Admin, 0 for user cannot access God Mode )
    const [auth, setAuth] = useState(false); // To check if user is authentic or not
    const [message, setMessage] = useState(""); // To store message from API
    const [controlAccess, setControlAccess] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // To hide and show sidebar

    // To toggle(hide and show) sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // To hide dashboard home 
    const handleDashboard = () => {
        setIsDashboard(false);
    };

    // To show dashboard home 
    const handleDashboardAgain = () => {
        setIsDashboard(true);
    };

    // Function to navigate the sidebar 
    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    };

    // If the user is authenticate then the dashboard will be visible
    useEffect(() => {
        verifyUser(setAuth, setUsername, setRole, setMessage);
        getControlAcessInfo(setControlAccess);
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            {auth ? (
                <div>
                    <Sidebar
                        handleDashboardAgain={handleDashboardAgain}
                        handleDashboard={handleDashboard}
                        handleClick={handleClick}
                        role={role}
                        controlAccess={controlAccess}
                        isSidebarOpen={isSidebarOpen}
                    />
                    <section id="content">
                        <Header username={username} role={role} toggleSidebar={toggleSidebar} />
                        {isClicked.home && isDashboard && <Home />}
                        {isClicked.search && <Search />}
                        {isClicked.myArtifacts && <MyArtifacts />}
                        {isClicked.upload && <Upload />}
                        {isClicked.addUrl && <AddUrl />}
                        {isClicked.demo && <Demo />}
                        {isClicked.systemSettings && <SystemSettings />}
                        {isClicked.userActivity && <UserActivity />}
                        {isClicked.userAccess && <UserAccess />}
                        {isClicked.controlAccess && <ControlAccess />}
                        {isClicked.defineDocType && <DefineDocType />}
                        {isClicked.manageAllArtifacts && <ManageAllArtifacts />}
                        {isClicked.editTags && <EditTags />}
                    </section>
                </div>
            ) : (
                // Navigate to sign in page
                <div className="auth-heading">
                    <h1>{message}</h1>
                    <button onClick={() => { navigate("/") }}>Sign In</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;