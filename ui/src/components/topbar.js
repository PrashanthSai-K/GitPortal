import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Avatar } from "primereact/avatar";
import "../styles/topnav.css";

export default function TopBar() {
  const endContent = (
    <React.Fragment>
<div className="flex">
  <h2 className="text-white font-bold ml-2">Dashboard</h2>
  <div className="flex align-items-center">
    <Avatar
      image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
      shape="circle"
    />
    <span className="font-bold text-white ml-2">Amy Elsner</span>
  </div>
</div>
    </React.Fragment>
  );

  return (
    <div className="topbar">
      <Toolbar
        end={endContent}
        className="bg-gray-900"
        style={{ borderRadius: "0", backgroundColor: "#0F3B99" }}
      />
    </div>
  );
}
