import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/Navbars/AdminSidebar'
import AdminTopBar from '../components/Navbars/AdminTopbar'
import { Button } from 'primereact/button'
import ProjectsList from '../components/projects/ProjectsList'
import ProjectCreation from '../components/projects/ProjectCreation'
import axios from 'axios'
import toast from 'react-hot-toast'

function Project() {

    const [projectVisible, setProjectVisible] = useState(false);

    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://10.10.237.157:4500/api/v1/project/");
            setProjects(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

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
                <AdminSidebar />
                <AdminTopBar title={"Projects"} />
                <div className='w-full  md:pl-60 md:pt-20 md:pr-8 p-3 bg-gray-100 h-full '>
                    <div className='pt-12  flex items-center justify-between'>
                        <span className='text-xl font-medium '>Projects</span>
                        <button onClick={()=>setProjectVisible(true)} className='text-white font-xs font-normal rounded-lg px-3 py-1 bg-side-blue bg-opacity-90  '> New Project </button>
                    </div>
                    <ProjectsList projects={projects} fetchProjects={fetchProjects} />
                    <ProjectCreation users={users} visible={projectVisible} setVisible={setProjectVisible} fetchProjects={fetchProjects} />
                </div>
            </div >
        </>
    )
}

export default Project