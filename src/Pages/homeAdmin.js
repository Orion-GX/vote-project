import * as React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import AppBarCustom from "../Components/appBarCustom";
import "./homeAdmin.css";
import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import axios from "axios";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      ...(theme.direction === "rtl" && {
        paddingLeft: "0 !important",
      }),
      ...(theme.direction !== "rtl" && {
        paddingRight: undefined,
      }),
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(
  MuiVirtualizedTable
);

const sample = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 10; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default function HomeAdmin() {
  const [userData, setUserData] = useState([]);
  const [presidentData, setPresidentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  //   const [dataReady, setDataReady] = useState(false);
  const myStyle = {
    backgroundImage: "url(/login.jpg)",
    height: "100vh",
    fontSize: "30px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

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
    getDataUser(adminId);
    getDataPresident();
    getDataStudent();
  }, []);
  return (
    <div style={myStyle}>
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
            <Paper style={{ height: 280, width: "100%" }}>
              <VirtualizedTable
                rowCount={presidentData.length}
                rowGetter={({ index }) => presidentData[index]}
                columns={[
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
                ]}
              />
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
            <Paper style={{ height: 280, width: "100%" }}>
              <VirtualizedTable
                rowCount={studentData.length}
                rowGetter={({ index }) => studentData[index]}
                columns={[
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
                  {
                    width: 200,
                    label: "แก้ไขรายชื่อ",
                    dataKey: "",
                  },
                  {
                    width: 200,
                    label: "ลบรายชื่อ",
                    dataKey: "",
                  },
                ]}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
