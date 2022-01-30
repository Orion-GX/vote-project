import * as React from "react";
import { Card, Grid } from "@mui/material";
import AppBarCustom from "../Components/appBarCustom";
import "./homeAdmin.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { tableCellClasses } from "@mui/material/TableCell";
import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    width: 250,
    label: "รหัสนักศึกษา",
    dataKey: "preID",
  },
  {
    width: 200,
    label: "ชื่อ-สกุล",
    dataKey: "preName",
    numeric: true,
  },
  {
    width: 200,
    label: "คณะ",
    dataKey: "brandID",
    numeric: true,
  },
  {
    width: 200,
    label: "สาขา",
    dataKey: "tyID",
    numeric: true,
  },
];

const columnsStudent = [
  {
    width: 250,
    label: "รหัสนักศึกษา",
    dataKey: "stuID",
  },
  {
    width: 250,
    label: "ชื่อ-สกุล",
    dataKey: "stuName",
  },
  {
    width: 250,
    label: "คณะ",
    dataKey: "brandID",
  },
  {
    width: 200,
    label: "สาขา",
    dataKey: "tyID",
  },
];

export default function HomeAdmin() {
  const [userData, setUserData] = useState([]);
  const [presidentData, setPresidentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [navi, setNavi] = React.useState(false);
  //   const [dataReady, setDataReady] = useState(false);
  const myStyle = {
    backgroundImage: "url(/login.jpg)",
    height: "100vh",
    fontSize: "30px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#501624",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const getDataUser = async (id) => {
    axios
      .get("/vote/admin_data/" + id)
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setUserData(response.data.result);
        } else {
        }
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getDataPresident = async () => {
    axios
      .get("/vote/president_all")
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setPresidentData(response.data.result);
        } else {
        }
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getDataStudent = async () => {
    axios
      .get("/vote/student_all")
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setStudentData(response.data.result);
        } else {
        }
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    var adminId = localStorage.getItem("admin_id");
    console.log(adminId);
    if (adminId != null) {
      getDataUser(adminId);
      getDataPresident();
      getDataStudent();
    } else {
      setNavi(true);
    }
  }, []);
  return (
    <div style={myStyle}>
      {navi && <Navigate to="/home" replace={true} />}
      <AppBarCustom />
      <Grid style={{ marginTop: "10px" }} container spacing={5}>
        <Grid item xs={5}>
          <Card
            style={{
              backgroundColor: "whitesmoke",
              font: "1em sans-serif",
              fontSize: "large",
              padding: "20px",
              paddingLeft: "20px",
              paddingBottom: "30px",
              borderRadius: "20px 20px 20px 20px",
              marginLeft: "100px",
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              <p>ข้อมูลส่วนตัว</p>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <p>ชื่อ-สกุล</p>
              </Grid>
              <Grid item>
                <p>:</p>
              </Grid>
              <Grid item xs>
                {userData.length != 0 ? <p>{userData[0].adName}</p> : <p></p>}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <p>รหัสนักศึกษา</p>
              </Grid>
              <Grid item>
                <p>:</p>
              </Grid>
              <Grid item xs>
                {userData.length != 0 ? <p>{userData[0].adID}</p> : <p></p>}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <p>สาขาวิชา</p>
              </Grid>
              <Grid item>
                <p>:</p>
              </Grid>
              <Grid item xs>
                {userData.length != 0 ? <p>{userData[0].tyID}</p> : <p></p>}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <p>คณะ</p>
              </Grid>
              <Grid item>
                <p>:</p>
              </Grid>
              <Grid item xs>
                {userData.length != 0 ? <p>{userData[0].brandID}</p> : <p></p>}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <p>อีเมลล์</p>
              </Grid>
              <Grid item>
                <p>:</p>
              </Grid>
              <Grid item xs>
                {userData.length != 0 ? <p>{userData[0].email}</p> : <p></p>}
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item justifyContent="flex-start" alignItems="stretch" xs>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
          >
            <p>รายชื่อผู้ลงสมัครในการเลือกตั้งองค์การนักศึกษา</p>
          </Grid>
          <Card
            style={{
              backgroundColor: "whitesmoke",
              font: "1em sans-serif",
              fontSize: "large",
              padding: "20px",
              paddingLeft: "20px",
              paddingBottom: "30px",
              borderRadius: "15px 15px 15px 15px",
            }}
            className="CardViewInformationList"
          >
            <Paper
              sx={{
                height: "280",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <TableContainer sx={{ maxHeight: 280 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <StyledTableCell
                          key={uuidv4()}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontSize: "15px",
                            fontWeight: "bold",
                            border: "2px",
                          }}
                        >
                          {column.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {presidentData.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.preID}
                          </StyledTableCell>
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.preName}
                          </StyledTableCell>
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.brandID}
                          </StyledTableCell>
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.tyID}
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Card>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
          >
            <p>รายชื่อนักศึกษาในการลงเลือกตั้งองค์การนักศึกษา</p>
          </Grid>
          <Card
            style={{
              backgroundColor: "whitesmoke",
              font: "1em sans-serif",
              fontSize: "large",
              padding: "20px",
              paddingLeft: "20px",
              paddingBottom: "30px",
              borderRadius: "15px 15px 15px 15px",
            }}
            className="CardViewInformationList"
          >
            <Paper
              sx={{
                height: "280",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <TableContainer sx={{ maxHeight: 280 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columnsStudent.map((column) => (
                        <StyledTableCell
                          key={uuidv4()}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontSize: "15px",
                            fontWeight: "bold",
                            border: "2px",
                          }}
                        >
                          {column.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentData.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={uuidv4()}
                        >
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.stuID}
                          </StyledTableCell>
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.stuName}
                          </StyledTableCell>
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.brandID}
                          </StyledTableCell>
                          <StyledTableCell key={uuidv4()} align="left">
                            {row.tyID}
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
