import React from 'react'
import AdminSidebar from '../components/Navbars/AdminSidebar'
import AdminTopBar from '../components/Navbars/AdminTopbar'
import { Button } from 'primereact/button'

function Leaderboard() {
    return (

        <>
            <div className='h-screen card flex justify-content-center' >
                <AdminSidebar />
                <AdminTopBar title={"Leaderboard"} />
                <div className='w-full  md:pl-60 md:pt-20 md:pr-8 p-3 bg-gray-100 h-full '>
                    <div className='pt-12  flex items-center justify-between'>
                        <span className='text-xl font-medium '>Leaderboard</span>
                        {/* <button  className='text-white font-xs font-normal rounded-lg px-3 py-1 bg-side-blue bg-opacity-90  '> Settings  </button> */}
                    </div>

                    <div>
                        <div>
                                
                        </div>    
                    </div>                    
                </div>
            </div>
        </>
    )
}

export default Leaderboard