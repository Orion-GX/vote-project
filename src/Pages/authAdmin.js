import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBarCustom from "../Components/appBarCustom";
import { Navigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function AuthAdmin() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorText, setErrorText] = React.useState(false);
  const [navi, setNavi] = React.useState(false);

  const getDataUser = async (id) => {
    axios
      .get("/vote/admin_data/" + id)
      .then((response) => {
        if (response.data.message == "SUCCESS") {
          setNavi(true);
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
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorText(false);
    // eslint-disable-next-line no-console
    console.log({
      username: username,
      password: password,
    });
    if (username != "" && password != "") {
      // setNavi(true);

      axios
        .post("/vote/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          if (response.data.message == "SUCCESS") {
            localStorage.setItem("admin_id", response.data.result[0].id);
            setNavi(true);
          } else {
            setErrorText(true);
          }
          console.log("response: ", response);
          // do something about response
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const myStyle = {
    backgroundImage: "url(/login.jpg)",
    height: "100vh",
    fontSize: "30px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={myStyle}>
      {navi && <Navigate to="/homeAdmin" replace={true} />}
      <AppBarCustom />
      <ThemeProvider theme={theme}>
        <Container
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            paddingBottom: "10px",
          }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Login Admin
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="ชื่อผู้ใช้งาน"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errorText && (
                <a style={{ fontSize: "15px", color: "red" }}>
                  ไม่พบข้อมูลผู้ใช้งาน
                </a>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                เข้าสู่ระบบ
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </div>
  );
}
