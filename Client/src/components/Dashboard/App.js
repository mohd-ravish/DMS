import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home/Home';
import Search from './Search/Search';
import MyArtifacts from './Manage/MyArtifacts';
import Upload from './Manage/Upload';
import AddUrl from './Manage/AddUrl';
import SystemSettings from './GodMode/SystemSettings';
import UserActivity from './GodMode/UserActivity';
import UserAccess from './GodMode/UserAccess';
import ManageAllArtifacts from './GodMode/ManageAllArtifacts';
import EditTags from './GodMode/EditTags';
import DefineDocType from './GodMode/DefineDocType';

function Dashboard() {
    // All dashboard components initial states (Home is set to true by default)
    const initialState = {
        home: true,
        search: false,
        myArtifacts: false,
        upload: false,
        addUrl: false,
        systemSettings: false,
        userActivity: false,
        userAccess: false,
        manageAllArtifacts: false,
        editTags: false,
        defineDocType: false,
    };

    const [isDashboard, setIsDashboard] = useState(initialState.home); // Dashboard home
    const [isClicked, setIsClicked] = useState(initialState);  // To access different components of dashboard by sidebar
    const [username, setUsername] = useState("");  // Username to show on header
    const [role, setRole] = useState(null);  // Role ID (If 1 then Admin, 0 for user cannot access God Mode )
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [limit, setLimit] = useState("");  // File upload size limit
    const [updatedBy, setUpdatedBy] = useState("");  // Who updated the system settings
    const [lastUpdated, setLastUpdated] = useState("");  // Time at which system settings updated
    const [docTypes, setDocTypes] = useState([]);
    const [tags, setTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);

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

    const handleTagChange = async (newValue) => {
        const newTags = newValue.filter(option => option.__isNew__);
        if (newTags.length > 0) {
            try {
                const response = await Axios.post("http://localhost:4500/tags/createTag", { tag_nm: newTags[0].label }, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                if (response.data.status === "success") {
                    const newTagId = response.data.data.id;
                    setAvailableTags([...availableTags, { value: newTagId, label: newTags[0].label }]);
                    setTags([...tags, { value: newTagId, label: newTags[0].label }]);
                } else {
                    console.log("Failed to create tag");
                }
            } catch (error) {
                console.log("An error occurred while creating tag");
            }
        } else {
            setTags(newValue);
        }
    };

    // If the user is authenticate then the dashboard will be visible
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const option = {
                    method: 'get',
                    url: "http://localhost:4500/auth/verifyUser",
                    headers: {
                        Authorization: localStorage.getItem("token") // Get token from local storage
                    }
                };
                const res = await Axios(option);
                if (res.data.status === "success") {
                    setAuth(true);
                    setUsername(res.data.username);
                    setRole(res.data.role_id);
                    // Retrieve the limit value from local storage when the component mounts
                    const savedLimit = localStorage.getItem('limit');
                    if (savedLimit) {
                        setLimit(savedLimit);
                    }
                } else {
                    setAuth(false);
                    setMessage(res.data.error);
                }
            } catch (err) {
                console.log(err);
            }
        };

        const fetchSettings = async () => {
            try {
                const response = await Axios.get("http://localhost:4500/settings/systemSettings", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                if (response.data.status === "success") {
                    setLimit(response.data.data.limit);
                    setUpdatedBy(response.data.data.updatedBy);
                    setLastUpdated(response.data.data.lastUpdated);
                } else {
                    console.log(response);

                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchDocTypes = async () => {
            try {
                const response = await Axios.get("http://localhost:4500/artifacts/documentTypes", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                if (response.data.status === "success") {
                    setDocTypes(response.data.data);
                } else {
                    console.log("Failed to fetch document types");
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTags = async () => {
            try {
                const response = await Axios.get("http://localhost:4500/tags/allTags", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                if (response.data.status === "success") {
                    setAvailableTags(response.data.data.map(tag => ({
                        value: tag.id,
                        label: tag.tag_nm,
                    })));
                } else {
                    console.log("Failed to fetch tags");
                }
            } catch (error) {
                console.log(error);
            }
        };

        verifyUser();
        fetchSettings();
        fetchDocTypes();
        fetchTags();
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
                    />
                    <section id="content">
                        <Header username={username} role={role} />
                        {isClicked.home && isDashboard && <Home />}
                        {isClicked.search && <Search />}
                        {isClicked.myArtifacts && <MyArtifacts />}
                        {isClicked.upload && <Upload limit={limit} docTypes={docTypes} availableTags={availableTags} handleTagChange={handleTagChange} tags={tags} setTags={setTags} />}
                        {isClicked.addUrl && <AddUrl docTypes={docTypes} availableTags={availableTags} handleTagChange={handleTagChange} tags={tags} setTags={setTags} />}
                        {isClicked.systemSettings && <SystemSettings limit={limit} updatedBy={updatedBy} lastUpdated={lastUpdated} />}
                        {isClicked.userActivity && <UserActivity />}
                        {isClicked.userAccess && <UserAccess />}
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