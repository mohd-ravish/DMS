import React, { useState } from 'react';
import AllSchools from './ViewSchools';
import AllLabs from './ViewLabs';
import AllEquipments from './ViewEquipments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllEntries = () => {
    const [activeComponent, setActiveComponent] = useState('schools');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'schools':
                return <AllSchools />;
            case 'labs':
                return <AllLabs />;
            case 'equipment':
                return <AllEquipments />;
            default:
                return <AllSchools />;
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
                    className={activeComponent === 'equipment' ? 'active' : ''}
                    onClick={() => setActiveComponent('equipment')}
                >
                    Equipments
                </button>
            </div>
            <div className="component-container">
                {renderComponent()}
            </div>
        </div>
    );
};

export default AllEntries;