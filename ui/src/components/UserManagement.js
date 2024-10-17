import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/table.css";
export default function CustomFilterDemo() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const staticCustomers = [
    {
      id: 1,
      name: "John Doe",
      academicWorkload: 25,
      academicLab: 10,
      status: "qualified",
      verified: true,
      representative: { name: "Amy Elsner" },
    },
    {
      id: 2,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 3,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 4,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 5,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 6,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
    {
      id: 7,
      name: "Jane Smith",
      academicWorkload: 20,
      academicLab: 12,
      status: "new",
      verified: false,
      representative: { name: "Anna Fali" },
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCustomers(staticCustomers);
      setLoading(false);
    }, 500);
  }, []);

  // Template for numeric filtering
  const numericFilterTemplate = (value, setValue, placeholder) => {
    return (
      <div className="flex gap-1" style={{ border: "1px solid black" }}>
        <InputNumber
          value={value ? value[0] : null}
          onValueChange={(e) => setValue([e.value, value ? value[1] : null])}
          placeholder={`Min ${placeholder}`}
          min={0}
        />
        <InputNumber
          value={value ? value[1] : null}
          onValueChange={(e) => setValue([value ? value[0] : null, e.value])}
          placeholder={`Max ${placeholder}`}
          min={0}
        />
      </div>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    return <span>{rowData.representative.name}</span>;
  };

  const buttonTemplate = () => {
    return (
      <div className="card flex justify-content-center bg-red-700 ">
        <Button label="Approve" />
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center flex-col md:flex-row mt-12">
        <h2 className="font-medium text-xl">Customers</h2>
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

      <DataTable
        value={customers}
        paginator
        rows={3}
        dataKey="id"
        loading={loading}
        emptyMessage="No customers found."
        className="p-datatable-sm border border-gray-300 rounded-xl overflow-hidden pt-10 "
        paginatorClassName="custom-paginator"
      >
        <Column
          field="name"
          header="Name"
          className="border border-x border-gray-100"
        />
        <Column
          field="representative.name"
          header="Registration Number"
          body={representativeBodyTemplate}
          className="border border-b border-gray-100"
        />
        <Column
          field="academicWorkload"
          header="Year"
          className="border border-b border-gray-100"
        />
        <Column
          field="academicLab"
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
          field="approval"
          header="Approval Status"
          className="border border-b border-gray-100 "

          body={(rowData) => (
            <Tag
              value={rowData.status}
              style={{
                backgroundColor:
                  rowData.status === "new"
                    ? "red"
                    : rowData.status === "qualified"
                      ? "green"
                      : "gray",
                color: "white",
              }}
            />
          )}
        />
      </DataTable>
    </div>
  );
}
