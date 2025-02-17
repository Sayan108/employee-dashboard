import { useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { UserButton } from "@clerk/clerk-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import "ag-grid-community/styles/ag-theme-alpine.css";
import ModalForm from "./modalForm";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import { searchEmployeeList } from "@/redux/application.slice";
import { formatDate } from "@/utils";

ModuleRegistry.registerModules([AllCommunityModule]);

const DataGrid = () => {
  const employeeList = useSelector(
    (state: RootState) => state.application.employeeList
  );

  const filteredList = useSelector(
    (state: RootState) => state.application.searchEmployeeeList
  );

  const [searchText, setSearchText] = useState("");
  const gridRef = useRef<AgGridReact>(null);

  const dispatch = useDispatch();

  const colDefs: any[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        filter: true,
        width: window.innerWidth / 5,
      },
      {
        field: "email",
        headerName: "Email",
        sortable: true,
        filter: true,
        width: window.innerWidth / 5,
      },
      {
        field: "phone",
        headerName: "Phone",
        sortable: true,
        filter: true,
        width: window.innerWidth / 5,
      },
      {
        field: "role",
        headerName: "Role",
        sortable: true,
        filter: true,
        width: window.innerWidth / 5,
      },
      {
        field: "joiningDate",
        headerName: "Joining Date",
        sortable: true,
        filter: true,
        width: window.innerWidth / 5,
        cellRenderer: (params: any) => formatDate(params.value),
      },
    ],
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);

    dispatch(searchEmployeeList(event.target.value));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // width: "100vw",
        height: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // padding: "15px",
          borderBottom: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          background: "#333",
          height: "50px",
        }}
      >
        <h1 style={{ fontSize: "18px", fontWeight: "600", color: "white" }}>
          Clapgrow
        </h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            id="filter-text-box"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <ModalForm />
          <UserButton />
        </div>
      </header>

      {/* Data Grid */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        <div
          className="ag-theme-alpine"
          style={{ flex: 1, width: "100%", height: "100%" }}
        >
          <AgGridReact
            ref={gridRef} // Attach grid reference
            rowSelection="multiple"
            onSelectionChanged={(e) => console.log(e.api.getSelectedRows())}
            rowData={searchText?.length > 2 ? filteredList : employeeList}
            columnDefs={colDefs}
            domLayout="autoHeight"
            animateRows={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
