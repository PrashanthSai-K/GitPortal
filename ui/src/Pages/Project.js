import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminTopBar from '../components/AdminTopbar'
import { Button } from 'primereact/button'
import ProjectsList from '../components/ProjectsList'
import ProjectCreation from '../components/ProjectCreation'

function Project() {

    const [projectVisible, setProjectVisible] = useState(false);


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
                    <ProjectsList />
                    <ProjectCreation projectVisible={projectVisible} setProjectVisible={setProjectVisible} />
                </div>
            </div >
        </>
    )
}

export default Project