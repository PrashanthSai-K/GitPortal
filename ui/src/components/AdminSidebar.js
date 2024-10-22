import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ children }) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null); // State to track active item

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    let items = [

        { label: 'Dashboard', icon: 'pi pi-chart-pie', link: "/admin/dashboard" },
        { label: 'Project', icon: 'pi pi-table', link: "/admin/project" },
        { label: 'Leaderboard', icon: 'pi pi-chart-bar', link: "/admin/leaderboard" },
        { label: "Users", icon: "pi pi-users", link: "/admin/users" },
        { label: 'Settings', icon: 'pi pi-cog', link: "/admin/settings" },
        { label: 'Logout', icon: 'pi pi-sign-out', }

    ];

    const location = useLocation().pathname.split('/');
    const navigate = useNavigate();

    const setActiveItemFunc = () => {
        items.map((item) => {
            if (location.length > 1 && location[2].toLowerCase() === item.label.toLowerCase()) {
                setActiveItem(item.label);
            }
        })
    }

    useEffect(()=>{
        setActiveItemFunc();
    },[])

    const logout =()=>{
        console.log("logged out");
    }

    return (
        <>

            {isMenuVisible && <div className="fixed inset-0 opacity-50 z-40 h-full  bg-#0F3B99" onClick={toggleMenu}></div>}

            {!isMenuVisible && (
                <div className="md:hidden ">
                    <Button
                        icon="pi pi-bars"
                        className="p-button-text absolute z-50 top-2 left-2"
                        onClick={toggleMenu}
                    />
                </div>
            )}

            <div className={`fixed top-0 left-0 h-screen w-52  z-50 transition-transform transform bg-side-blue ${isMenuVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} >
                <img className='h-20 w-auto pl-4 pt-1 ' src="/white-logo.png" alt="" />
                <div className='p-5'>
                    {items.map((item) => {
                        return (
                            <div
                                className={`text-white mt-3 p-2 cursor-pointer ${activeItem === item.label ? '   bg-white-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white-blue' : ''} hover:bg-gray-50 rounded-lg hover:text-side-blue`} // Apply active class if active
                                onClick={()=>{
                                    item.label != "Logout" ? 
                                        navigate(`${item.link}`)
                                    :
                                        logout();
                                }}  
                            >
                                <button  className=" flex items-center gap-4 text-xl">
                                    <span className={item.icon} />
                                    <span className="">{item.label}</span>
                                </button>
                            </div>
                        )
                    })}
                </div>
                <div className='text-gray-50 cursor-pointer opacity-60 absolute bottom-2 left-2  border w-16  text-xs flex items-center justify-center gap-1 py-1 rounded-lg '>
                    <i className='pi pi-info-circle'></i> <span>help</span>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
