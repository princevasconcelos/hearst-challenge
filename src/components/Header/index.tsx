import AppBar from "@mui/material/AppBar";
import Typography from '@mui/material/Typography';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate, useMatch } from "react-router-dom";
import Box from "@mui/material/Box";
import useMediaQuery from '@mui/material/useMediaQuery';
import Sort from '../Sort'
import Filter from '../Filter'

const Header = () => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width:600px)');
    const isHomePage = useMatch('/')
    const onLogoClick = () => navigate('/');

    console.log('prince', {
        isDesktop,
        isHomePage
    })

    return (
        <AppBar color='inherit' variant='outlined' position='fixed' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: isDesktop ? '100px' : '90px', px: 4 }}>
            <Box sx={{ display: 'flex', whiteSpace: 'nowrap', cursor: 'pointer', }} onClick={onLogoClick}>
                <PetsIcon color='primary' sx={{ marginRight: '16px' }} />
                <Typography variant='h1' fontWeight="bold" fontSize={24}>
                    The Cat App
                </Typography>
            </Box>

            {isDesktop && isHomePage && <>
                <Filter />
                <Sort />
            </>}

        </AppBar>

    )
}

export default Header;
