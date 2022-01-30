import AppBarCustom from "../Components/appBarCustom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./managePresident.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Navigate } from "react-router-dom";

const columns = [
  { id: "preID", label: "รหัสนักศึกษา", minWidth: 170, align: "left" },
  { id: "preName", label: "ชื่อ-สกุล", minWidth: 100, align: "left" },
  { id: "brandID", label: "คณะ", minWidth: 170, align: "left" },
  { id: "tyID", label: "สาขา", minWidth: 170, align: "left" },
  { id: "email", label: "อีเมลล์", minWidth: 170, align: "left" },
  { id: "edit", label: "แก้ไขข้อมูล", minWidth: 170, align: "center" },
  { id: "delete", label: "ลบข้อมูล", minWidth: 170, align: "center" },
];

export default function ManageStudent() {
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
  const [studenData, setStudentData] = React.useState([]);
  const [brandData, setBrandData] = React.useState([]);
  const [typeData, setTypeData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [brand, setBrand] = React.useState("");
  const [type, setType] = React.useState("");
  const [idData, setIdData] = React.useState("");
  const [stuId, setStuId] = React.useState("");
  const [stuIdError, setStuIdError] = React.useState(false);
  const [stuName, setStuName] = React.useState("");
  const [stuNameError, setStuNameError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [navi, setNavi] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (status == "add") {
      if (stuId == "") {
        setStuIdError(true);
        return;
      }
      if (stuName == "") {
        setStuNameError(true);
        return;
      } else {
        setStuIdError(false);
        setStuNameError(false);
        addDataStudent();
      }
    } else if (status == "edit") {
      if (stuId == "") {
        setStuIdError(true);
        return;
      }
      if (stuName == "") {
        setStuNameError(true);
        return;
      } else {
        setStuIdError(false);
        setStuNameError(false);
        editDataStudent();
      }
    } else if (status == "delete") {
      if (idData == "") {
        return;
      } else {
        deleteDataStudent();
      }
    } else {
      setOpen(false);
    }
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const setDefault = () => {
    setStuId("");
    setStuName("");
    setBrand("");
    setType("");
    setEmail("");
    getDataStudent();
    setOpen(false);
  };
  const addDataStudent = async () => {
    await axios
      .post("/vote/student_add", {
        stuId: stuId != "" ? stuId : null,
        stuName: stuName != "" ? stuName : null,
        brandId: brand != "" ? brand : null,
        tyId: type != "" ? type : null,
        email: email != "" ? email : null,
      })
      .then((response) => {
        if (response.data.message == "SUCCESS") {
        } else {
        }
        setDefault();
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        setDefault();
        console.error(err);
      });
  };

  const editDataStudent = async () => {
    await axios
      .post("/vote/student_edit/" + idData, {
        id: idData,
        stuId: stuId != "" ? stuId : null,
        stuName: stuName != "" ? stuName : null,
        brandId: brand != "" ? brand : null,
        tyId: type != "" ? type : null,
        email: email != "" ? email : null,
      })
      .then((response) => {
        if (response.data.message == "SUCCESS") {
        } else {
        }
        setDefault();
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        setDefault();
        console.error(err);
      });
  };

  const deleteDataStudent = async () => {
    await axios
      .post("/vote/student_delete/" + idData, {})
      .then((response) => {
        if (response.data.message == "SUCCESS") {
        } else {
        }
        setDefault();
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        setDefault();
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

  const getDataBrand = async () => {
    axios
      .get("/vote/brand_all")
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setBrandData(response.data.result);
        } else {
        }
        console.log("response: ", response);
        // do something about response
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getDataType = async () => {
    axios
      .get("/vote/type_all")
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setTypeData(response.data.result);
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
      getDataStudent();
      getDataType();
      getDataBrand();
    } else {
      setNavi(true);
    }
  }, []);

  return (
    <div style={myStyle}>
      {navi && <Navigate to="/home" replace={true} />}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              marginTop={1}
            >
              {status == "add" ? "เพิ่มข้อมูลนักศึกษา" : ""}
              {status == "edit" ? "แก้ไขข้อมูลนักศึกษา" : ""}
              {status == "delete" ? "ลบข้อมูลนักศึกษา" : ""}
            </Grid>
          </DialogTitle>
          <DialogContent>
            {status == "add" || status == "edit" ? (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                marginTop={1}
                spacing={3}
              >
                <Grid item xl>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField
                      fullWidth
                      error={stuIdError}
                      label="รหัสนักศึกษา"
                      id="fullWidth"
                      value={stuId}
                      helperText={stuIdError ? "กรุณากรอกข้อมูล" : ""}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                        if (onlyNums == "") {
                          setStuIdError(true);
                          console.log("error");
                        } else {
                          setStuIdError(false);
                          console.log(e.target.value);
                        }
                        setStuId(onlyNums);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xl>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField
                      error={stuNameError}
                      fullWidth
                      label="ชื่อ-สกุล"
                      id="fullWidth"
                      value={stuName}
                      helperText={stuNameError ? "กรุณากรอกข้อมูล" : ""}
                      onChange={(e) => {
                        if (e.target.value == "") {
                          setStuNameError(true);
                          console.log("error");
                        } else {
                          setStuNameError(false);
                          console.log(e.target.value);
                        }
                        setStuName(e.target.value);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xl>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">คณะ</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brand}
                        label="คณะ"
                        onChange={handleChangeBrand}
                      >
                        {brandData.length != 0
                          ? brandData.map((item) => {
                              return (
                                <MenuItem key={uuidv4()} value={item.brandID}>
                                  {item.brandName}
                                </MenuItem>
                              );
                            })
                          : ""}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xl>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        สาขา
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="สาขา"
                        onChange={handleChangeType}
                      >
                        {typeData.length != 0
                          ? typeData.map((item) => {
                              return (
                                <MenuItem key={uuidv4()} value={item.tyID}>
                                  {item.tyName}
                                </MenuItem>
                              );
                            })
                          : ""}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xl>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                  >
                    <TextField
                      fullWidth
                      label="อีเมลล์"
                      id="fullWidth"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            ) : null}
            {status == "delete" ? (
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                คุณต้องการลบข้อมูลนักศึกษานี้
              </Box>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              size="large"
              variant="contained"
              color="error"
              autoFocus
              onClick={(e) => {
                setOpen(false);
                setStuId("");
                setStuName("");
                setBrand("");
                setType("");
                setStuIdError(false);
                setStuNameError(false);
                setEmail("");
              }}
            >
              ยกเลิก
            </Button>
            <Button
              size="large"
              variant="contained"
              color="success"
              onClick={(e) => {
                handleClose();
              }}
              autoFocus
            >
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <AppBarCustom />
      <Grid
        style={{ marginTop: "10px" }}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={5}
      >
        <Grid item xs={11}>
          <Card
            style={{
              backgroundColor: "whitesmoke",
              font: "1em sans-serif",
              fontSize: "large",
              padding: "20px",
              paddingLeft: "20px",
              paddingBottom: "30px",
              borderRadius: "20px 20px 20px 20px",
            }}
            sx={{
              overflow: "hidden",
            }}
          >
            <Grid
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid>
                <p style={{ fontSize: "22px", fontWeight: "bold" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;จัดการข้อมูลนักศึกษา
                </p>
              </Grid>
              <Grid item lg>
                <Paper
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <TableContainer sx={{ maxHeight: 600 }}>
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
                        {studenData.map((row, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
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
                              <StyledTableCell key={uuidv4()} align="left">
                                {row.email}
                              </StyledTableCell>
                              <StyledTableCell key={uuidv4()} align="center">
                                <EditIcon
                                  color="info"
                                  onClick={(e) => {
                                    console.log("on edit" + row.id);
                                    setStatus("edit");
                                    setStuId(row.stuID);
                                    setStuName(row.stuName);
                                    setBrand(row.brandID);
                                    setType(row.tyID);
                                    setIdData(row.id);
                                    setOpen(true);
                                  }}
                                ></EditIcon>
                              </StyledTableCell>
                              <StyledTableCell key={uuidv4()} align="center">
                                <DeleteIcon
                                  color="error"
                                  onClick={(e) => {
                                    console.log("on delete");
                                    setStatus("delete");
                                    setIdData(row.id);
                                    setOpen(true);
                                  }}
                                ></DeleteIcon>
                              </StyledTableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="end"
                alignItems="flex-end"
                item
                marginTop="20px"
              >
                <Grid item>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={(e) => {
                      setStatus("add");
                      handleClickOpen();
                    }}
                  >
                    เพิ่มข้อมูล
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
