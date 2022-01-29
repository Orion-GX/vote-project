import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function AppBarCustom() {
  const [logoutNavi, setLogoutNavi] = React.useState(false);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location = "/";
    window.history.replaceState(null, null, "/");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ backgroundColor: "#501624" }} position="relative">
          <Toolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              sx={{ mr: 2 }}
            >
              <img
                style={{ height: 80 }}
                alt="Remy Sharp"
                src={process.env.PUBLIC_URL + "/image/vote1.png"}
              />
            </div>
            <Typography
              style={{ marginLeft: "20px" }}
              variant="h5"
              color="inherit"
              noWrap
            >
              ระบบบริหารจัดการงานเลือกตั้งนายกองค์การ
            </Typography>
            <Container maxWidth="sm"></Container>
            {localStorage.getItem("admin_id") != null ? (
              <Typography
                style={{ marginLeft: "20px" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                <Link href="/president" color="white" underline="none">
                  จัดการข้อมูลผู้ลงสมัคร
                </Link>
              </Typography>
            ) : (
              ""
            )}
            {localStorage.getItem("admin_id") != null ? (
              <Typography
                style={{ marginLeft: "20px" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                <Link href="/student" color="white" underline="none">
                  จัดการข้อมูลนักศึกษา
                </Link>
              </Typography>
            ) : (
              ""
            )}

            {localStorage.getItem("admin_id") != null ? (
              <Typography
                style={{ marginLeft: "20px" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                <Link
                  href="/#"
                  color="white"
                  onClick={handleLogout}
                  underline="none"
                >
                  ออกจากระบบ
                </Link>
              </Typography>
            ) : (
              <Typography
                style={{ marginLeft: "20px" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                <Link href="/home" color="white" underline="none">
                  ผู้ดูแลระบบ
                </Link>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
