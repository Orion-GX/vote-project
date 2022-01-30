import * as React from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AppBar, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppBarCustom() {
  const [logoutNavi, setLogoutNavi] = React.useState(false);
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location = "/";
    window.history.replaceState(null, null, "/");
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>คุณต้องการออกจากระบบ</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button
            onClick={(e) => {
              setOpen(false);
              handleLogout(e);
            }}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
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
              <Link href="/homeAdmin" color="white" underline="none">
                ระบบบริหารจัดการงานเลือกตั้งนายกองค์การ
              </Link>
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
                  color="white"
                  onClick={handleClickOpen}
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
