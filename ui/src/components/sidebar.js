import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button'; 
import { toast } from 'react-toastify';
import '../styles/Sidebar.css'; // Import the CSS file

const Sidebar = ({ children }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null); // State to track active item

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const itemRenderer = (item) => (
        <div
            className={`p-menuitem-content ${activeItem === item.label ? 'active-menu-item' : ''}`} // Apply active class if active
            onClick={() => setActiveItem(item.label)} 
        >
            <a className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </a>
        </div>
    );

    let items = [
        {
            template: () => (
                <span className="inline-flex align-items-center gap-1 px-2 py-2 bg-slate-100">
                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_2642_713)">
                            {/* SVG paths omitted for brevity */}
                        </g>
                    </svg>
                    <span className="font-medium text-xl font-semibold  bg-slate-100">
                        PRIME<span className="text-primary">APP</span>
                    </span>
                </span>
            )
        },
        {
            items: [
                { label: 'New', icon: 'pi pi-plus', template: itemRenderer },
                { label: 'Search', icon: 'pi pi-search', template: itemRenderer },
                { label: 'Settings', icon: 'pi pi-cog', template: itemRenderer },
                { label: 'Messages', icon: 'pi pi-inbox', badge: 2, template: itemRenderer },
                { label: 'Logout', icon: 'pi pi-sign-out', template: itemRenderer }
            ]
        },
        { separator: true },
      
    ];

    return (
        <>
            {isMenuVisible && <div className="fixed inset-0 opacity-50 z-40 h-60" onClick={toggleMenu}></div>}
            
            {!isMenuVisible && (
               <div className="card md:hidden relative">
               <Button
                   icon="pi pi-bars"
                   className="p-button-text absolute top-2 left-2 "
                   onClick={toggleMenu}
               />
           </div>
            )}

            <div className= {`fixed top-0 left-0 h-full z-50 transition-transform transform ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex`} style={{ backgroundColor: '#f1f5f9' }}>
                <Menu model={items} className="w-64 p-3 h-200 custom-menu  bg-slate-100" />
            </div>

            <div className={`transition-all duration-300 ${isMenuVisible ? 'md:ml-64' : 'md:ml-0'} p-4 w-full`}>
                {children}
            </div>
        </>
    );
};

export default Sidebar;
