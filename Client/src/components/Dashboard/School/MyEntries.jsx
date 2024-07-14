import React, { useState } from 'react';
import MySchools from './MySchools';
import MyLabs from './MyLabs';
import MyEquipments from './MyEquipments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyEntries = () => {
    const [activeComponent, setActiveComponent] = useState('schools');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'schools':
                return <MySchools />;
            case 'labs':
                return <MyLabs />;
            case 'equipment':
                return <MyEquipments />;
            default:
                return <MySchools />;
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
                    My Schools
                </button>
                <button
                    className={activeComponent === 'labs' ? 'active' : ''}
                    onClick={() => setActiveComponent('labs')}
                >
                    My Labs
                </button>
                <button
                    className={activeComponent === 'equipment' ? 'active' : ''}
                    onClick={() => setActiveComponent('equipment')}
                >
                    My Equipments
                </button>
            </div>
            <div className="component-container">
                {renderComponent()}
            </div>
        </div>
    );
};

export default MyEntries;