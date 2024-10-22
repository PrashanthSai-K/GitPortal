import React from 'react';
import UserTable from '../components/UserManagement'
import AdminSidebar from '../components/AdminSidebar';
import AdminTopBar from '../components/AdminTopbar';
import PopupMenu from '../components/Menu';

const Dashboard = () => {




  return (
    <>
      <div className='h-screen'>
        <AdminSidebar />
        <AdminTopBar title="Dashboard" />
        <div className='w-full md:pl-60 md:pt-20 md:pr-8 p-3 bg-gray-100 h-full '>
          <UserTable />

        </div>
      </div>
    </>
  );
}

export default Dashboard;
