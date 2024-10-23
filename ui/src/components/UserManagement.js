import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Dialog } from "primereact/dialog";
import { Menu } from "primereact/menu";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function UserTable({ userData, fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    department: "",
    year: "",
    email: "",
  });
  const menuRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected row for approval

  useEffect(() => {
    setTimeout(() => {
      setUsers(userData);
      setLoading(false);
    }, 500);
  }, [userData]);

  // Approve specific user
  const handleApprove = (rowData, event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to approve this user?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",
      acceptClassName: "bg-green-500 text-white p-1 ml-3",
      rejectClassName: "bg-red-500 text-white p-1",
      accept: () => {
        toast.success(`User with ID: ${rowData.id} has been approved`);
  
        // Update the status of approved user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === rowData.id ? { ...user, status: "Approved" } : user
          )
        );
      },
      reject: () => {
        toast.error(`User with ID: ${rowData.id} has been rejected`);
  
        // Update the status of rejected user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === rowData.id ? { ...user, status: "Rejected" } : user
          )
        );
      },
    });
  };

  // Menu items for each row
  const items = (rowData) => [
    {
      label: "Options",
      items: [
        {
          label: "View",
          icon: "pi pi-eye",
          command: () => show(rowData),
        },
        {
          label: "Edit",
          icon: "pi pi-pencil",
          command: () => edit(rowData),
        },
        {
          label: "Approve",
          icon: "pi pi-check",
          command: (e) => handleApprove(rowData, e.originalEvent), 
        },
      ],
    },
  ];

  const show = (rowData) => {
    setViewVisible(true);
    setFormData({ ...rowData });
  };

  const edit = (rowData) => {
    setVisible(true);
    setFormData({ ...rowData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:4500/api/v1/user/", formData);
      setVisible(false);
      fetchUsers();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-col md:flex-row mt-12">
        <h2 className="font-medium text-xl">Users</h2>
        <div className="flex items-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Search" className="p-inputtext-sm" />
          </span>
          <Button
            icon="pi pi-filter"
            className="p-button-text p-button-rounded ml-2"
            onClick={() => {}}
          />
        </div>
      </div>
      <DataTable
        value={users}
        paginator
        rows={5}
        dataKey="id"
        loading={loading}
        emptyMessage="No users found."
        className="p-datatable-sm"
      >
        <Column field="name" header="Name" />
        <Column field="rollno" header="Registration Number" />
        <Column field="department" header="Department" />
        <Column field="year" header="Year" />
        <Column field="email" header="Email" />
        <Column
          field="status"
          header="Status"
          body={(rowData) => <Tag value={rowData.status} />}
        />
        <Column
          body={(rowData) => (
            <>
              <Button
                icon="pi pi-ellipsis-v"
                className="p-button-text p-button-rounded"
                onClick={(e) => menuRef.current.toggle(e)}
              />
              <Menu model={items(rowData)} popup ref={menuRef} />
            </>
          )}
        />
      </DataTable>
      <Dialog
        header="Edit User"
        visible={visible}
        position="top"
        style={{ minWidth: "50vw" }}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-5">
            <div className="p-field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </Dialog>
      <Dialog
        header="View User"
        visible={viewVisible}
        position="top"
        style={{ minWidth: "50vw" }}
        onHide={() => setViewVisible(false)}
        draggable={false}
        resizable={false}
      >
        <div className="p-5">
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
        </div>
      </Dialog>
      <ConfirmPopup />
    </div>
  );
}
