import { Dialog } from 'primereact/dialog';
import React from 'react'

function ProjectCreation({projectVisible, setProjectVisible}) {




    return (
        <>

            <Dialog header="Project Creation" className=' h-full w-full md:w-6/12' visible={projectVisible} position={"right"} onHide={() => { if (!projectVisible) return; setProjectVisible(false); }} draggable={false} resizable={false}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                {/* <p className='flex flex-col gap-5 mt-5'>
                    <span className='text-sm font-medium'>Project Name: {ModalData.name}</span>
                    <span className='text-sm font-medium'>Category: {ModalData.category}</span>
                    <span className='text-sm font-medium'>Last Commit: {ModalData.lastCommitOn} by {ModalData.lastCommitBy}</span>
                    <span className='text-sm font-medium'>Owner: {ModalData.owner}</span>
                    <span className='text-sm font-medium'>Assigned To: {ModalData.assignedTo}</span>
                    <span className='text-sm font-medium'>Status: {ModalData.status}</span>
                    <span className='text-sm font-medium'>Role: {ModalData.role}</span>
                </p> */}
            </Dialog>
        </>
    )
}

export default ProjectCreation