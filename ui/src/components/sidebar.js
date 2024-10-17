import React, { useState } from 'react';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button'; 
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
            items: [
                { label: 'Home', icon: 'pi pi-plus', template: itemRenderer },
                { label: 'Home', icon: 'pi pi-plus', template: itemRenderer },
                { label: 'Table', icon: 'pi pi-search', template: itemRenderer },
                { label: 'Upload', icon: 'pi pi-cog', template: itemRenderer },
                { label: 'Logout', icon: 'pi pi-sign-out', template: itemRenderer }
            ]
        }
    ];

    return (
        <>
            {isMenuVisible && <div className="fixed inset-0 opacity-50 z-40 h-60 sidebar-overlay bg-#0F3B99" onClick={toggleMenu}></div>}
            
            {!isMenuVisible && (
               <div className="card relative">
               <Button
                   icon="pi pi-bars"
                   className="p-button-text absolute top-2 left-2"
                   onClick={toggleMenu}
               />
           </div>
            )}

            <div className={`fixed top-0 left-0 h-full z-50 transition-transform transform ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex`} style={{ backgroundColor: '#0F3B99' }}>
                <Menu model={items} className="w-55 p-3 custom-menu" />
            </div>

            <div className={`transition-all duration-300 ${isMenuVisible ? 'md:ml-64' : 'md:ml-0'} p-4 w-full`}>
                {children}
            </div>
        </>
    );
};

export default Sidebar;
