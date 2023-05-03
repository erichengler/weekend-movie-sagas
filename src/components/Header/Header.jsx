import { useHistory } from 'react-router-dom';
import '../App/App.css'
// ------- MUI Imports -------
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TheatersIcon from '@mui/icons-material/Theaters';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


function Header() {

    const history = useHistory();
    
    // Brings user back to movie list view
    const backToList = () => {
        history.push('/')
    }

    // Takes user to form to add a movie
    const toForm = () => {
        history.push(`/form`);
    }

    return (
        <AppBar position="sticky" className='App-header'
            sx={{ backgroundColor: '#A62B1F' }}
        >
            <Container maxWidth="xxl">

                {/* Header */}
                <Toolbar disableGutters>
                    <Typography variant="h3" noWrap href="/" onClick={backToList}
                        sx={{ overflow: 'hidden', color: '#ddb9ac', cursor: 'pointer' }}
                    >
                        Movie Sagas
                    </Typography>

                    {/* Movie List Button */}
                    <Button onClick={backToList} 
                        sx={{ marginLeft: '40px', color: '#ddb9ac' }}
                    >
                        Movie List
                    </Button>
                    <TheatersIcon sx={{ color: '#ddb9ac' }} />

                    {/* Add Movie Button */}
                    <Button onClick={toForm} 
                        sx={{ marginLeft: '40px', color: '#ddb9ac' }}
                    >
                        Add Movie
                    </Button>
                    <ControlPointIcon sx={{ color: '#ddb9ac' }} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;