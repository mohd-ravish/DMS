import profile from '../../assets/profile.png'

const Navbar = ({ username, role, toggleSidebar }) => {
    return (
        <nav>
            <i className='bx bx-menu' onClick={toggleSidebar}></i>
            {/* <input type="checkbox" id="switch-mode" hidden /> */}
            <div href="#" className="profile">
                <p>Hey, {username}<br></br><b>{role === 1 ? ('Admin') : ('User')}</b></p>
                <img src={profile} alt="profile" />
            </div>
        </nav>
    );
};

export default Navbar;