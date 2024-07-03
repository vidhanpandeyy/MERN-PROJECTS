import * as React from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction';


const pages = ['Home', 'Log In'];


const Navbar = () => {
    //show / hide button 
    
    const { userInfo } = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    // log out user
    const logOutUser = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }
    return (
        <AppBar position="static" sx={{ bgcolor: "#10170B" }}>
            <Container >
                {/* principal Menu */}
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
                            color: 'green',
                            textDecoration: 'none',
                            zIndex:10
                        }}
                    >
                        <img src="https://i.ibb.co/h966BHv/Screenshot-2024-01-09-at-8-38-48-PM.png" alt="JOB" border="0" height={50}></img>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } ,zIndex:10}}>
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
                                zIndex:10
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 ,zIndex:10}} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            zIndex:10
                        }}
                    >
                        <img src="https://i.ibb.co/h966BHv/Screenshot-2024-01-09-at-8-38-48-PM.png" alt="JOB" border="0"></img>
                        
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },zIndex:10 }}>
                        {/* menu desktop */}

                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block',zIndex:10 }}>
                            <Link to="/" style={{ color: 'white', textDecoration: "none" }}>
                                Home
                            </Link>
                        </Button>
                        
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block',zIndex:10 }}>
                            <Link to="/prompt" style={{ color: 'white', textDecoration: "none" }}>
                                Get presciption
                            </Link>
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block',zIndex:10 }}>
                            <Link to="/" style={{ color: 'white', textDecoration: "none" }}>
                                Doctors
                            </Link>
                        </Button>


                    </Box>
                    {/* <IconButton sx={{ mr: 4,zIndex:10 }} onClick={() => dispatch(toggleActionTheme())}>
                        {palette.mode === "dark" ? (
                            <DarkMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        )}
                    </IconButton> */}

                    <Box sx={{ flexGrow: 0 }}>
                        {!userInfo?
                        (<Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block',zIndex:10 }}>
                        <Link to="/login" style={{ color: 'white', textDecoration: "none" }}>
                        LogIn/SignUp
                        </Link>
                    </Button>)
                        
                        :(<><Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, zIndex: 10 }}>
                                    <Avatar sx={{ color: "white" }} alt="Remy Sharp" src="https://www.vhv.rs/dpng/d/421-4212514_user-icon-round-png-png-download-user-round.png" />
                                </IconButton>
                            </Tooltip></>
                        )
                        }
                        <Menu
                            PaperProps={{
                                sx: {
                                    "& 	.MuiMenu-list": {
                                        bgcolor: "#10170B",
                                        color: "white"
                                    },
                                }
                            }}

                            sx={{ mt: '45px' ,zIndex:10}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                userInfo && userInfo.role===1?
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color: "white" }} to="/prompt">Admin Dashboard</Link></Typography>
                            </MenuItem>
                            :
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center"><Link style={{ textDecoration: "none", color:"white"}} to="/prompt">User Dashboard</Link></Typography>
                            </MenuItem>
                            }
                            <MenuItem onClick={logOutUser}>
                                        <Typography style={{ textDecoration: "none", color: "white"}} textAlign="center">Log Out</Typography>
                                    </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
