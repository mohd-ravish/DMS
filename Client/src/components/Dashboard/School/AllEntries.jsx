import React, { useState } from 'react';
import ViewSchools from './ViewSchools';
import ViewLabs from './ViewLabs';
import ViewEquipments from './ViewEquipments';
import ViewSessions from './ViewSessions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllEntries = () => {
    const [activeComponent, setActiveComponent] = useState('schools');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'schools':
                return <ViewSchools />;
            case 'labs':
                return <ViewLabs />;
            case 'equipments':
                return <ViewEquipments />;
            case 'sessions':
                return <ViewSessions />;
            default:
                return <ViewSchools />;
        }
    };

    return (
        <div className="my-entries-container">
            <ToastContainer />
            <div className="switch-buttons">
                <button
                    className={activeComponent === 'schools' ? 'active' : ''}
                    onClick={() => setActiveComponent('schools')}
                >
                    Schools
                </button>
                <button
                    className={activeComponent === 'labs' ? 'active' : ''}
                    onClick={() => setActiveComponent('labs')}
                >
                    Labs
                </button>
                <button
                    className={activeComponent === 'equipments' ? 'active' : ''}
                    onClick={() => setActiveComponent('equipments')}
                >
                    Equipments
                </button>
                <button
                    className={activeComponent === 'sessions' ? 'active' : ''}
                    onClick={() => setActiveComponent('sessions')}
                >
                    Sessions
                </button>
            </div>
            <div className="component-container">
                {renderComponent()}
            </div>
        </div>
    );
};

export default AllEntries;