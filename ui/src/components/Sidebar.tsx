import React, {type PropsWithChildren} from 'react';
import {FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";


interface SidebarProps extends PropsWithChildren{
    sidebarOpen?: boolean;
}


const Sidebar: React.FC<SidebarProps> = ({sidebarOpen}: SidebarProps) => {
    if (!sidebarOpen) return null;
    return sidebarOpen && (
        <section className="column sidebar">
            <aside className="menu" style={{padding: '1rem', flex: 0.99}}>
                <ul className="menu-list">
                    <li><Link to="/dashboard/organizations">Organizations</Link></li>
                    <li><Link to="/dashboard/settings">Settings</Link></li>
                </ul>
            </aside>
            <div className="user-section">
                <div className="avatar">
                    <div className="avt-icon">
                        <FaUser size={24} color="white"/>
                    </div>
                </div>
                <div className="avatar-info">
                    <p className="has-text-white">
                        <strong style={{color: 'white'}}>John Doe</strong>
                    </p>
                    <button className="button is-primary" style={{marginTop: '0.5rem'}}>
                        Logout
                    </button>
                </div>
            </div>
        </section>
    )
};

export default Sidebar;
