import React from "react";
import AppBarCustom from "../Components/appBarCustom";

export default function ManageStudent() {
  const myStyle = {
    backgroundImage: "url(/login.jpg)",
    height: "100vh",
    fontSize: "30px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={myStyle}>
      <AppBarCustom />
      <h1>Manage Student</h1>
    </div>
  );
}
