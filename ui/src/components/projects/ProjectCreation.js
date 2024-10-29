import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import React, { useEffect, useRef, useState } from 'react';
import ReactSearchBox from "react-search-box";
import ConfirmPopupComponent from '../../utilities/ConfirmPopupComponent';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Checkbox } from 'primereact/checkbox';

function ProjectCreation({ visible, setVisible, users, fetchProjects }) {

    const data = {
        project_name: "",
        project_description: "",
        project_lead: "",
        multiple_users: null,
        assigned_users: [],
    }

    const [formData, setFormData] = useState(data);

    const countryTemplate = (option) => {
        return (
            <div >{option.name} - {option.email}</div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4500/api/v1/project", { ...formData, project_lead: formData.project_lead[0] });
            fetchProjects();
            setFormData(data)
            setVisible(false);
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }

    const formRef = useRef();

    const handleConfrim = () => {
        formRef.current.requestSubmit();
    }

    const [teamMembers, setTeamMembers] = useState(users);

    const setTeamMembersData = () => {
        const data = users.filter((user) => {
            if (formData.project_lead.length > 0) {
                return user.email != formData.project_lead[0].email
            }
            return true
        })
        setTeamMembers(data);
        if (formData.multiple_users) {
            formData.assigned_users = "";
        }
    }

    useEffect(() => {
        setTeamMembersData();
    }, [formData.multiple_users])

    return (
        <>

            <Dialog header="Project Creation" className='h-full w-full md:w-6/12' visible={visible} position={"right"} onHide={() => { if (!visible) return; setVisible(false); }} draggable={false} resizable={false}>

                <div className='text-justify text-xsm ml-5 flex flex-col gap-6 pb-5'>
                    <p>
                        Start by entering a precise project name and a clear, detailed description of the project’s purpose and goals.
                        This will help ensure that the project is easy to identify and understand, both for yourself and for others
                        who may work on it in the future.
                    </p>
                    <div>
                        <span className='text-red-500 text-xsm font-bold '>Note : </span>
                        <span> All newly created projects will be set to private by default, meaning they will only be visible to you.</span>
                    </div>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5 transition-all duration-500 '>
                    <div className='text-xsm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Project Name:</span>
                        <InputText className=' border p-2 w-10/12 pl-5 ' name='project_name' value={formData.project_name} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    </div>
                    <div className='text-xsm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Project Lead: </span>
                        <MultiSelect value={formData.project_lead} options={users} onChange={(e) => { if (e.target.value.length <= 1) setFormData({ ...formData, [e.target.name]: e.target.value }) }} optionLabel="email"
                            filter name='project_lead' placeholder="Select Users" itemTemplate={countryTemplate} className="text-xsm  border w-10/12 rounded min-h-10 border-gray-100 flex items-center gap-2 pl-5 overflow-y-scroll scrollbar-hidden "
                            display="chip" itemClassName='bg-gray-100 border-b text-xsm'
                        />
                    </div>

                    <div className='text-xsm font-medium flex gap-5 items-center  w-full'>
                        <span className='w-2/12'>Team Project : </span>
                        <input type="checkbox" name='multiple_users' className=" appearance-none border h-5 w-5 rounded text-side-blue checked:bg-side-blue checked:border-side-blue checked:text-white focus:ring-0 checked:after:content-['✓'] checked:after:text-white checked:after:flex checked:after:justify-center checked:after:items-center"
                            value={formData.multiple_users} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.checked })}
                        />
                        <span className='text-gray-500 text-xsm'> (Note: Select if you project consists of more than one member)</span>
                    </div>
                    {
                        formData.multiple_users &&
                        <div className='text-xsm font-medium flex gap-5 items-center w-full'>
                            <span className='w-2/12'>Team Members: </span>
                            <MultiSelect value={formData.assigned_users} options={teamMembers} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} optionLabel="email"
                                filter name='assigned_users' placeholder="Select Users" itemTemplate={countryTemplate} className="text-xsm  border w-10/12 rounded min-h-10 border-gray-100 flex items-center gap-2 pl-5 overflow-y-scroll scrollbar-hidden "
                                display="chip" itemClassName='bg-gray-100 border-b text-xsm'
                            />
                        </div>
                    }

                    <div className='text-xsm font-medium flex gap-5 items-center w-full'>
                        <span className='w-2/12'>Status:</span>
                        <div className=' border w-10/12 rounded  border-gray-100 flex items-center gap-2 p-2 pl-5 '>
                            <span className="h-1.5 w-1.5 bg-orange-500 rounded-full"></span>
                            <span>{"Pending"}</span>
                        </div>
                    </div>

                    <div className='text-xsm font-medium flex gap-5 items-start justify-start w-full'>
                        <span className='w-2/12 '>Description </span>
                        <InputTextarea name='project_description' value={formData.project_description} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className=' border p-2 w-10/12 pl-5' autoResize rows={5} cols={30} />
                    </div>
                    <ConfirmPopupComponent popUpMessage={"Do you want to create project ?"} buttonName={"Create"} accept={handleConfrim} />
                </form>
            </Dialog>
        </>
    )
}

export default ProjectCreation