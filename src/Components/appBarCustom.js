import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export default function AppBarCustom() {
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
            <Typography
              style={{ marginLeft: "20px" }}
              variant="h5"
              color="inherit"
              noWrap
            >
              <Link href="/" color="white" underline="none">
                หน้าแรก
              </Link>
            </Typography>
            <Typography
              style={{ marginLeft: "20px" }}
              variant="h5"
              color="inherit"
              noWrap
            >
              <Link href="/president" color="white" underline="none">
                ข้อมูลผู้ลงสมัคร
              </Link>
            </Typography>
            <Typography
              style={{ marginLeft: "20px" }}
              variant="h5"
              color="inherit"
              noWrap
            >
              <Link href="/home" color="white" underline="none">
                ผู้ดูแลระบบ
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
