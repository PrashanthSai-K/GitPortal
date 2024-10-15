import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { InputNumber } from "primereact/inputnumber";
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css"; // PrimeIcons CSS

export default function CustomFilterDemo() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    academicWorkload: { value: null, matchMode: FilterMatchMode.CUSTOM },
    academicLab: { value: null, matchMode: FilterMatchMode.CUSTOM },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // Example static data
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
  ];

  const statuses = ["unqualified", "qualified", "new", "negotiation", "renewal"];

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setCustomers(staticCustomers); // Set static data
      setLoading(false);
    }, 500);
  }, []);

  const getSeverity = (status) => {
    switch (status) {
      case "unqualified":
        return "danger";
      case "qualified":
        return "success";
      case "new":
        return "info";
      case "negotiation":
        return "warning";
      case "renewal":
        return null;
      default:
        return null;
    }
  };

  const numericFilterTemplate = (options) => {
    return (
      <div className="flex gap-1">
        <InputNumber
          value={options.value ? options.value[0] : null}
          onValueChange={(e) =>
            options.filterApplyCallback([e.value, options.value ? options.value[1] : null])
          }
          placeholder="Min"
          min={0}
        />
        <InputNumber
          value={options.value ? options.value[1] : null}
          onValueChange={(e) =>
            options.filterApplyCallback([options.value ? options.value[0] : null, e.value])
          }
          placeholder="Max"
          min={0}
        />
      </div>
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const representativeBodyTemplate = (rowData) => {
    return <span>{rowData.representative.name}</span>;
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <div className="card">
      <DataTable
        value={customers}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["name", "academicWorkload", "academicLab", "status"]}
        emptyMessage="No customers found."
      >
        <Column field="name" header="Name" />
        <Column field="representative.name" header="Representative" body={representativeBodyTemplate} />
        <Column field="academicWorkload" header="Academic Workload" filter filterElement={numericFilterTemplate} />
        <Column field="academicLab" header="Academic Lab" filter filterElement={numericFilterTemplate} />
        <Column
          field="status"
          header="Status"
          filter
          filterElement={(options) => (
            <Dropdown
              value={options.value}
              options={statuses}
              onChange={(e) => options.filterApplyCallback(e.value)}
              itemTemplate={statusItemTemplate}
              placeholder="Select Status"
              showClear
            />
          )}
        />
        <Column
          field="verified"
          header="Verified"
          body={(rowData) => (
            <i className={`pi ${rowData.verified ? "pi-check-circle" : "pi-times-circle"}`}></i>
          )}
          filter
          filterElement={(options) => (
            <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
          )}
        />
      </DataTable>
    </div>
  );
}
