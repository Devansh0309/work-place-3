import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import {Box,Switch} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from '../../assets/logo2.png'
import "./NavBar.css";
import { ColorContext } from "../../Context/DarkMode";
import { useContext } from "react";

const pages = [{label:"Home",path:'/'}, {label:"Find a job",path:'/candidate/auth'},{label:"Find a candidate",path:'/employer/auth'}];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigateToPage=(path)=>{
    navigate(path)
  }
  console.log(ColorContext)
  const [state,dispatch]=useContext(ColorContext)
  
  return (
    <AppBar className="nav-container" position="static" sx={{color:state.darkMode?'white !important':'black !important',backgroundColor:state.darkMode?'dimgrey !important':'#fff !important'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            
              textDecoration: "none",
              color:state.darkMode?'white !important':'black !important'
            }}
          >
            <img src={Logo} alt="logo" style={{width:"100px"}}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, color:state.darkMode?'white !important':'black !important'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },color:state.darkMode?'white !important':'black !important'
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={()=>{navigateToPage(page.path)}} sx={{color:state.darkMode?'white !important':'black !important',backgroundColor:state.darkMode?'dimgrey !important':'#fff !important'}}>
                  <Typography textAlign="center"  sx={{color:state.darkMode?'white !important':'black !important',backgroundColor:state.darkMode?'dimgrey !important':'#fff !important'}}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color:state.darkMode?'white !important':'black !important',
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="logo" style={{width:"100px"}}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={()=>{navigateToPage(page.path)}}
                sx={{ my: 2, color:state.darkMode?'white !important':'black !important', display: "block", }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 , display:'flex' }}>
            <Tooltip title={state.darkMode?'Dark Mode On':'Dark Mode Off'}>
            <Switch checked={state.darkMode} onChange={()=>{
              dispatch({type: state.darkMode?'Light':'Dark'})
              // setDarkMode(prev=>!prev);
              // console.log(state.darkMode)
            }}/>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;