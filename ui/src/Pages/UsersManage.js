import React, { useEffect, useRef, useState } from 'react'
import TopBar from '../components/AdminTopbar'
import Sidebar from '../components/AdminSidebar'
import UserTable from '../components/UserManagement'
import axios from 'axios'
import  toast from 'react-hot-toast';
import AdminTopBar from '../components/AdminTopbar'
import AdminSidebar from '../components/AdminSidebar'


function UsersManage() {

    // const toast = useRef(null);

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4500/api/v1/user");
            setUsers(response.data.students);
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch users');
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <>


            <div className='h-screen card flex justify-content-center' >

                <AdminTopBar title={"Users manage"} />
                <AdminSidebar  />
                <div className='w-full md:pl-60 md:pt-20 md:pr-8 p-3 bg-gray-100 h-full '>
                    <UserTable userData={users} fetchUsers={fetchUsers} />
                </div>
            </div>
        </>
    )
}

export default UsersManage