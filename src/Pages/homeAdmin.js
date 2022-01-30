import * as React from "react";
import { Button, Card, Grid, TextField } from "@mui/material";
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
import { Box } from "@mui/system";
import moment from "moment";

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
  const [voteData, setVoteData] = useState([]);
  const [navi, setNavi] = React.useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editVote, setEditVote] = useState(false);
  const [voteEnable, setVoteEnable] = useState(0);
  const [voteId, setVoteId] = useState("");
  const [reportEnable, setReportEnable] = useState(false);
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

  const getDataVoteEvent = async (id) => {
    axios
      .get("/vote/vote_all")
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setVoteId(response.data.result[0].id);
          var start = response.data.result[0].start_vote;
          var arrStart = `${start}`.split(" ");
          var xx = arrStart[1].split(":");
          var x = arrStart[0] + "T" + xx[0] + ":" + xx[1];
          setStartDate(x);
          var end = response.data.result[0].end_vote;
          var arrEnd = `${end}`.split(" ");
          var yy = arrEnd[1].split(":");
          var y = arrEnd[0] + "T" + yy[0] + ":" + yy[1];
          setEndDate(y);
          setVoteData(response.data.result);

          var m = moment.utc(
            response.data.result[0].end_vote,
            "YYYY-MM-DD  HH:mm:ss"
          );
          var mm = moment().utc("YYYY-MM-DD  HH:mm:ss");
          console.log(m.toLocaleString());
          console.log(mm.toLocaleString());
          var isvalid = m.isValid();
          var isBefore = m.isBefore(mm);
          if (isBefore) {
            setReportEnable(true);
          }

          console.log("Is valid " + isvalid);
          console.log("Is after " + isBefore);
        } else {
        }
        console.log("response: ", response);
        console.log(x + " /// " + y);
        // do something about response
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editDataVoteEvent = async (vid) => {
    axios
      .post("/vote/vote_edit/" + voteId, {
        startVote: startDate,
        endVote: endDate,
        voteEnable: vid,
      })
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setStartDate("");
          setEndDate("");
          setVoteData([]);
          setEditVote(false);
          getDataVoteEvent();
        }
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const addDataVoteEvent = async () => {
    axios
      .post("/vote/vote_add", {
        startVote: startDate,
        endVote: endDate,
        voteEnable: 1,
      })
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setStartDate("");
          setEndDate("");
          setVoteData([]);
          setEditVote(false);
          getDataVoteEvent();
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
      getDataVoteEvent();
    } else {
      setNavi(true);
    }
  }, []);
  return (
    <div style={myStyle}>
      {navi && <Navigate to="/home" replace={true} />}
      <AppBarCustom />
      <Grid style={{ marginTop: "10px" }} container spacing={2}>
        <Grid item xs={5}>
          <Grid container direction="column">
            <Grid>
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
                    {userData.length != 0 ? (
                      <p>{userData[0].adName}</p>
                    ) : (
                      <p></p>
                    )}
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
                    {userData.length != 0 ? (
                      <p>{userData[0].brandID}</p>
                    ) : (
                      <p></p>
                    )}
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
                    {userData.length != 0 ? (
                      <p>{userData[0].email}</p>
                    ) : (
                      <p></p>
                    )}
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid style={{ marginTop: "-70px" }}>
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
                {reportEnable ? (
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid style={{ fontSize: "20px", fontWeight: "bold" }} item>
                      สิ้นสุดการโหวต
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      paddingTop={2}
                      marginLeft={1}
                    >
                      <Box sx={{ width: 180, marginLeft: 2 }}>
                        <Button
                          fullWidth
                          size="large"
                          color="success"
                          variant="contained"
                          onClick={(e) => {}}
                        >
                          ดูรายงานการโหวต
                        </Button>
                      </Box>
                      <Box sx={{ width: 180, marginLeft: 2 }}>
                        <Button
                          fullWidth
                          size="large"
                          color="info"
                          variant="contained"
                          onClick={(e) => {
                            editDataVoteEvent(0);
                            setReportEnable(false);
                          }}
                        >
                          เลือกวันที่เริ่มโหวต
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid style={{ fontSize: "20px", fontWeight: "bold" }} item>
                      {voteData.length == 0
                        ? "เลือกวันที่เริ่มและสิ้นสุดโหวต"
                        : "อยู่ในช่วงการโหวต"}
                    </Grid>
                    <Grid item>
                      <TextField
                        id="datetime-local"
                        label="วันที่และเวลาที่เริ่มโหวต"
                        type="datetime-local"
                        value={startDate}
                        sx={{ width: 250 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setStartDate(e.target.value);
                          setEditVote(true);
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="datetime-local"
                        label="วันที่และเวลาที่เริ่มโหวต"
                        type="datetime-local"
                        value={endDate}
                        sx={{ width: 250 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setEndDate(e.target.value);
                          setEditVote(true);
                        }}
                      />
                    </Grid>
                    {voteData.length != 0 ? (
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        paddingTop={2}
                        marginLeft={1}
                      >
                        {editVote ? (
                          <Box sx={{ width: 180, marginLeft: 2 }}>
                            <Button
                              fullWidth
                              size="large"
                              color="primary"
                              variant="contained"
                              onClick={(e) => {
                                setVoteEnable(1);
                                editDataVoteEvent(1);
                              }}
                            >
                              แก้ไข
                            </Button>
                          </Box>
                        ) : null}
                        <Box sx={{ width: 180, marginLeft: 2 }}>
                          <Button
                            fullWidth
                            size="large"
                            color="error"
                            variant="contained"
                            onClick={(e) => {
                              setVoteEnable(0);
                              editDataVoteEvent(0);
                            }}
                          >
                            ปิดโหวต
                          </Button>
                        </Box>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        paddingTop={2}
                        marginLeft={1}
                      >
                        <Box sx={{ width: 180, marginLeft: 2 }}>
                          <Button
                            fullWidth
                            size="large"
                            color="success"
                            variant="contained"
                            onClick={(e) => {
                              if (startDate != "" && endDate != "") {
                                setVoteEnable(1);
                                addDataVoteEvent();
                              }
                            }}
                          >
                            ยืนยัน
                          </Button>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Card>
            </Grid>
          </Grid>
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
