import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { Menu } from "primereact/menu";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { ConfirmPopup } from "primereact/confirmpopup";
import ConfirmPopupComponent from "../utilities/ConfirmPopupComponent";
import axios from "axios";
import toast from "react-hot-toast";
import { InputTextarea } from "primereact/inputtextarea";

export default function UserTable({ userData, fetchUsers }) {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUsers(userData);
      setLoading(false);
    }, 500);
  }, [userData]);


  //Table menu related variables and functions

  const menuRef = useRef(null);

  //Menu options to iterate
  const items = (rowData) => [
    {
      label: "Options",
      items: [
        {
          label: 'View',
          icon: 'pi pi-eye',
          command: () => show(rowData),
        },
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          command: () => edit(rowData),
        },
      ]
    }
  ];

  //Menu visibility variables
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false)

  //Menu onClick funtions

  const edit = (rowData) => {
    setVisible(true);
    setFormData({ ...rowData, year: getYear(rowData) });
  };

  const show = (rowData) => {
    setViewVisible(true);
    setFormData({ ...rowData, year: getYear(rowData) });
  };

  //function to get year in the correct format to list in dropdown
  const getYear = (rowData) => {
    if (rowData.year == 1) {
      return { name: "First Year", code: 1 };
    } else if (rowData.year == 2) {
      return { name: "Second Year", code: 2 };
    } else if (rowData.year == 3) {
      return { name: "Third Year", code: 3 };
    } else if (rowData.year == 4) {
      return { name: "Fourth Year", code: 4 };
    } else {
      return { name: "Passed Out", code: 5 };
    }
  }

  //Form Data related variables and functions 
  const data = {
    name: "",
    rollno: "",
    department: "",
    year: "",
    email: "",
  }

  const [formData, setFormData] = useState(data);

  //Formdata dropdown options for year 
  const years = [
    { name: 'First Year', code: 1 },
    { name: 'Second Year', code: 2 },
    { name: 'Third Year', code: 3 },
    { name: 'Fourth Year', code: 4 },
    { name: 'Passed Out', code: 5 }
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put("http://localhost:4500/api/v1/user/", { ...formData, year: formData.year.code });
      setVisible(false);
      fetchUsers();
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  }

  //Confirm popup related variables and functions
  const formRef = useRef();

  const handleConfrim = () => {
    formRef.current.requestSubmit();
  }


  return (

    <div className="w-full">
      <div className="flex justify-between items-center flex-col md:flex-row mt-12">
        <h2 className="font-medium text-xl">Users</h2>
        <div className="flex items-center ">
          <IconField iconPosition="left" className="search-icon-field flex items-center gap-3">
            <i className="pi pi-search"></i>
            <InputText placeholder="Search" className="search-input border border-gray-300 p-1" />
          </IconField>
          <Button
            icon="pi pi-filter"
            className="p-button-text p-button-rounded ml-2"
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
      </div>

      {showFilter && (
        <div className=" absolute h-60 w-56 z-20 top-10 right-10 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 border border-gray-300">

        </div>
      )}
      {
        users &&

        <DataTable
          value={users}
          paginator
          rows={5}
          dataKey="id"
          loading={loading}
          emptyMessage="No users found."
          className="p-datatable-sm border border-gray-300 rounded-xl overflow-hidden pt-1 bg-gray-50"
          paginatorClassName="custom-paginator"
        >
          <Column
            field="name"
            header="Name"
            className="border border-x border-gray-100"
          />
          <Column
            field="rollno"
            header="Registration Number"
            className="border border-b border-gray-100"
          />
          <Column
            field="department"
            header="Dept"
            className="border border-b border-gray-100"
          />
          <Column
            field="year"
            header="Year"
            className="border border-b border-gray-100"
          />
          <Column
            field="email"
            header="email"
            className="border border-b border-gray-100"
          />

          <Column
            field="status"
            header="Status"
            body={(rowData) => <Tag value={rowData.status} />}
            className="border border-b border-gray-100"
          />

          <Column
            className=" w-2 border border-b border-gray-100 "
            body={(rowData) => (
              <div>
                <Menu model={items(rowData)} popup ref={menuRef} />
                <i onClick={(e) => menuRef.current.toggle(e)}
                  className="pi pi-ellipsis-v"></i>
              </div>
            )}
          />
        </DataTable>
      }

      <Dialog className="pt-5" header="Edit User" visible={visible} position={"top"} style={{ minWidth: "50vw" }} onHide={() => { if (!visible) return; setVisible(false); }} draggable={false} resizable={false}>
        <form onSubmit={handleSubmit} ref={formRef} id="editUserForm">
          <div className="p-5 flex flex-col gap-5 ">
            <div className=" flex flex-col gap-3">
              <label htmlFor="name">Name</label>
              <InputText id="name" name="name" autoComplete="off" placeholder="Name" className="border border-gray-100 p-1 " value={formData.name} onChange={handleChange} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="rollno">Register Number</label>
              <InputText id="rollno" name="rollno" autoComplete="off" placeholder="Register Number" className="border border-gray-100 p-1 " value={formData.rollno} onChange={handleChange} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="department">Department</label>
              <InputText id="department" name="department" autoComplete="off" placeholder="Department" className="border border-gray-100 p-1 " value={formData.department} onChange={handleChange} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="year">Year</label>
              <Dropdown options={years} optionLabel="name" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Select a year" className="border border-gray-100 p-1 h-9 flex items-center " />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="email">Email</label>
              <InputText id="email" name="email" type="email" required autoComplete="off" placeholder="Email" className="border border-gray-100 p-1 " value={formData.email} onChange={handleChange} />
            </div>
            <ConfirmPopupComponent buttonName={"Update"} popUpMessage={"Are you sure you want to update user ?"} accept={handleConfrim} />
          </div>
        </form>
      </Dialog>

      <Dialog className="pt-5" header="View User" visible={viewVisible} position={"top"} style={{ minWidth: "50vw", }} onHide={() => { if (!viewVisible) return; setViewVisible(false); }} draggable={false} resizable={false}>
        <form onSubmit={handleSubmit} ref={formRef} id="editUserForm">{console.log(formData)
        }
          <div className="p-5 flex flex-col gap-5 ">
            <div className=" flex flex-col gap-3">
              <label htmlFor="name">Name</label>
              <InputText disabled id="name" name="name" autoComplete="off" placeholder="Name" className="border border-gray-100 p-1 text-black " value={formData.name} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="rollno">Register Number</label>
              <InputText disabled id="rollno" name="rollno" autoComplete="off" placeholder="Register Number" className="border border-gray-100 p-1 text-black " value={formData.rollno} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="department">Department</label>
              <InputText disabled id="department" name="department" autoComplete="off" placeholder="Department" className="border border-gray-100 p-1 text-black " value={formData.department} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="year">Year</label>
              <Dropdown disabled options={years} optionLabel="name" value={formData.year}
                placeholder="Select a year" className=" text-black border border-gray-100 p-1 h-9 flex items-center " />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="email">Email</label>
              <InputText disabled id="email" name="email" type="email" required autoComplete="off" placeholder="Email" className="border border-gray-100 p-1 text-black " value={formData.email} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="dob">Mobile No.</label>
              <InputText disabled id="dob" name="dob" type="text" required autoComplete="off" placeholder="DOB" className="border border-gray-100 p-1 text-black " value={formData.dob ? formData.dob : "Yet to be added"} />
            </div>
            <div className=" flex flex-col gap-3 ">
              <label htmlFor="mobileno">Mobile No.</label>
              <InputText disabled id="mobileno" name="mobileno" type="text" required autoComplete="off" placeholder="Mobile no" className="border border-gray-100 p-1 text-black " value={formData.mobileno ? formData.mobileno : "Yet to be added"} />
            </div>
          </div>
        </form>
      </Dialog>

    </div>
  );
}
