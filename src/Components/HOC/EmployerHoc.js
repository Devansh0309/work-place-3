import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Switch } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConfig';
import { ColorContext } from '../../Context/DarkMode';
import Logo from '../../assets/logo2.png'

const pages = [{label:'Profile',key:'profile',icon:<AccountBoxIcon/>},{label:'Jobs',key:'jobs',icon:<WorkIcon/>},{label:'Conversation',key:'conversation',icon:<QuestionAnswerIcon/>},{label:'Applicants',key:'applicants',icon:<PeopleAltIcon/>}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function EmployerHoc({children}) {
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

  const reRoute=(page)=>{
    handleCloseNavMenu()
    navigate(`/employer/${page}`)
  }

  const [value, setValue] = React.useState(0);

  const [state,dispatch]=useContext(ColorContext)

  const Logout=()=>{
      localStorage.clear();
      auth.signOut()
      navigate('/')
  }

  return (
    <>
    <Box sx={{display:{xs:'none',md:'block'},}}>
    <AppBar position="static">
      <Container maxWidth="xl"  sx={{backgroundColor:state.darkMode?'dimgrey':'#fff',}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:state.darkMode?'white':'black',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} alt="logo" style={{width:"100px"}}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.key} onClick={()=>{reRoute(page.key)}}>
                  <Typography textAlign="center" sx={{color:state.darkMode?'white':'black',}}>{page.label}</Typography>
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
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color:state.darkMode?'white':'black',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} alt="logo" style={{width:"100px"}}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.key}
                onClick={()=>{reRoute(page.key)}}
                sx={{ my: 2, color:state.darkMode?'white':'black', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display:'flex' }}>
            <Tooltip title="logout">
              <Button onClick={()=>{Logout()}} sx={{ color:state.darkMode?'white':'black', display: 'block' }} contained >Logout</Button>
            </Tooltip>
            <Tooltip title={state.darkMode?'Dark Mode On':'Dark Mode Off'}>
              <Switch checked={state.darkMode} onChange={()=>{
              dispatch({type: state.darkMode?'Light':'Dark'})
            }}/>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Box>
    <Box sx={{ width: '100%', display:{xs:'block',md:'none'},position:'fixed',backgroundColor:'#fff',zIndex:'2',bottom:'0'}}>
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {pages.map((page)=>{
          console.log(page.icon)
          return <BottomNavigationAction label={page.label} key={page.key} icon={page.icon} onClick={()=>{reRoute(page.key)}} sx={{color:'black'}}/>
        })}
      </BottomNavigation>
    </Box>
    </Box>
    {children}
    </>
  );
}
export default EmployerHoc;
