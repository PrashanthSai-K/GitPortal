import axios from 'axios';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react'
import ConfirmPopupComponent from '../../utilities/ConfirmPopupComponent';

function ProjectsList({ projects, fetchProjects }) {

    const projectData = {
        "id": "",
        "project_name": "",
        "project_id": "",
        "project_link": "",
        "owner_id": 1,
        "owner_name": "",
        "owner_email": "",
        "owner_department": "",
        "status": "",
        "created_at": "",
        "last_commit_date": ""
    }

    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState(projectData);

    const fetchProjectUsers = async (data) => {
        try {
            const response = await axios.get(`http://10.10.237.157:4500/api/v1/project/${data.id}/users`);
            setModalData({ ...data, users: response.data.data });
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (e) => {
        fetchProjectUsers(e.data);
        setVisible(true);
    }

    const lastcommit = (rowData) => {
        return (
            <div className='flex flex-col'>
                <span className='text-xs'>Last Commit on: {rowData.last_commit_date}</span>
                <span className='text-xs'>Status : {rowData.status}</span>
            </div>
        )
    }

    const approveProject = async(data)=>{
        try {
            const response = await axios.post("http://localhost:4500/api/v1/project/approve/", {...data});
            fetchProjects();
            setVisible(false);
            toast.success("Project Approved Successfully");
        } catch (error) {
            console.log(error);
        }
    }

    const rejectProject = async(data)=>{
        try {
            const response = await axios.post("http://localhost:4500/api/v1/project/reject/", {...data});
            fetchProjects();
            setVisible(false);
            toast.success("Project Approved Successfully");
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchProjects();
    }, [])

    return (
        <>
            <DataTable value={projects} onRowClick={handleClick}>
                <Column key={1} field={"project_name"} headerClassName='bg-gray-100' className='w-6/12 text-sm font-medium md:text-base md:w-8/12 border-b-4 rounded-l-xl border-gray-100' />
                <Column key={1} headerClassName='bg-gray-100' body={lastcommit} className='text-end  border-b-4 rounded-r-lg border-gray-100' />
            </DataTable>

            <Dialog header="Project Details" className='h-full w-full md:w-6/12' visible={visible} position={"right"} onHide={() => { if (!visible) return; setVisible(false); }} draggable={false} resizable={false}>

                <p className='flex flex-col gap-5 mt-5'>
                    {
                        modalData.status === "ACTIVE" &&

                        <div className='text-sm font-medium flex gap-5 items-center w-full'>
                            <span className='w-2/12'>Project ID:</span>
                            <InputText value={modalData.project_id} disabled className='text-black border p-2 w-10/12 pl-5' />
                        </div>
                    }
                    <div className='text-sm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Project Name:</span>
                        <InputText value={modalData.project_name} disabled className='text-black border p-2 w-10/12 pl-5' />
                    </div>
                    {
                        modalData.status === "ACTIVE" &&
                        <div className='text-sm font-medium flex gap-5 items-center w-full'>
                            <span className='w-2/12'>Project Link:</span>
                            <InputText value={modalData.project_link} disabled className='text-black border p-2 w-10/12 pl-5' />
                        </div>
                    }
                    <div className='text-sm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Assigner Name:</span>
                        <InputText value={modalData.owner_name} disabled className='text-black border p-2 w-10/12 pl-5' />
                    </div>
                    <div className='text-sm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Assigner Email:</span>
                        <InputText value={modalData.owner_email} disabled className='text-black border p-2 w-10/12 pl-5' />
                    </div>
                    {
                        modalData.status === "ACTIVE" &&

                        <div className='text-sm font-medium flex gap-5 items-center w-full'>
                            <span className='w-2/12'>Last Commit Date:</span>
                            <InputText value={modalData.last_commit_date} disabled className='text-black border p-2 w-10/12 pl-5' />
                        </div>
                    }
                    <div className='text-sm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Assigned Users: </span>
                        <div className=' border w-10/12 rounded  border-gray-100 flex gap-1 p-2 pl-5 overflow-y-scroll scrollbar-hidden '>
                            {modalData.users && modalData.users.map((user, index) => {{console.log(user)}
                                return (
                                    <p key={index} className={`p-1.5 ${user.student_role === "MAINTAINER" ? "bg-blue-100" : "bg-gray-200" } rounded-xl text-xs `} >
                                        {user.student_name}
                                    </p>    
                                )
                            })}
                        </div>
                    </div>
                    <div className='text-sm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Status:</span>
                        <div className=' border w-10/12 rounded  border-gray-100 flex items-center gap-2 p-2 pl-5 '>
                            <span className={`h-2 w-2 ${modalData.status === "ACTIVE" ? "bg-green-500" : modalData.status === "PENDING" ? "bg-orange-500" : "bg-red-500"} rounded-full `}></span>
                            <span>{modalData.status}</span>
                        </div>
                    </div>
                    <div className='text-sm font-medium flex gap-5 items-start justify-start w-full'>
                        <span className='w-2/12 text-xs md:text-sm'>Description </span>
                        <div className=' border w-10/12 rounded min-h-24 border-gray-100 flex items-start gap-2 p-2 pl-5 overflow-y-scroll scrollbar-hidden '>
                            <span>{modalData.description ? modalData.description : "No description provided"}</span>
                        </div>
                    </div>
                    <div className='flex w-full gap-10 justify-end'>
                        <ConfirmPopupComponent popUpMessage={"Do you want to approve the Project ? "} buttonName={"Approve"} color={"green-500"}  />
                        <ConfirmPopupComponent popUpMessage={"Do you want to reject the Project ? "} buttonName={"Reject"} color={"red-500"} />
                    </div>
                </p>
            </Dialog>
        </>
    )
}

export default ProjectsList