import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react'

function ProjectsList() {

    const products = [
        { code: '1', name: 'Project A', category: 'Category A', quantity: 10, lastCommitOn: "12/08/2024", lastCommitBy: "Sai" },
        { code: '2', name: 'Project B', category: 'Category B', quantity: 5, lastCommitOn: "13/09/2024", lastCommitBy: "Kavin" },
        { code: '3', name: 'Project C', category: 'Category C', quantity: 15, lastCommitOn: "10/09/2024", lastCommitBy: "Hari" },
        { code: '4', name: 'Project D', category: 'Category D', quantity: 20, lastCommitOn: "20/12/2024", lastCommitBy: "Guru" },
    ]

    const projectData = {
        name: "",
        id: "",
        lastCommitOn : "",
        lastCommitBy:"",
        owner: "",
        assignedTo: "",
        status: "",
        role: "",
    }

    const [ visible, setVisible ] = useState(false);
    const [ projectVisible, setProjectVisible ] = useState(false);
    const [ ModalData, setModalData ] = useState(projectData);


    const handleClick = (e) => {
        setVisible(true);
        console.log(e.data);
        setModalData(e.data);
        
    }

    const lastcommit = (rowData) => {
        return (
            <div className='flex flex-col'>
                <span className='text-xs'>Last Commit on: {rowData.lastCommitOn}</span>
                <span className='text-xs'>Last Commit by : {rowData.lastCommitBy}</span>
            </div>
        )
    }

    return (
        <div>
            <DataTable value={products} tableStyle={{ minWidth: '' }} className=' ' onRowClick={handleClick}>
                <Column key={1} field={"name"} headerClassName='bg-gray-100' className='w-6/12 text-sm font-medium md:text-base md:w-8/12 border-b-4 rounded-l-xl border-gray-100' />
                <Column key={1} field={"category"} headerClassName='bg-gray-100' body={lastcommit} className='text-end  border-b-4 rounded-r-lg border-gray-100' />
            </DataTable>

            <Dialog header="Project Details" className='h-full w-full md:w-6/12' visible={visible} position={"right"} onHide={() => { if (!visible) return; setVisible(false); }} draggable={false} resizable={false}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className='flex flex-col gap-5 mt-5'>
                    <span className='text-sm font-medium'>Project Name: {ModalData.name}</span>
                    <span className='text-sm font-medium'>Category: {ModalData.category}</span>
                    <span className='text-sm font-medium'>Last Commit: {ModalData.lastCommitOn} by {ModalData.lastCommitBy}</span>
                    <span className='text-sm font-medium'>Owner: {ModalData.owner}</span>
                    <span className='text-sm font-medium'>Assigned To: {ModalData.assignedTo}</span>
                    <span className='text-sm font-medium'>Status: {ModalData.status}</span>
                    <span className='text-sm font-medium'>Role: {ModalData.role}</span>
                </p>
            </Dialog>



        </div>
    )
}

export default ProjectsList