
import { Link } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Box, Typography, Button } from '@mui/material';


const NotFoundPage = () => {


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        color: 'text.secondary',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ReportProblemIcon sx={{ fontSize: '6rem', color: 'warning.main', mb: 2 }} />

        <Typography variant="h1" component="h1" sx={{ fontSize: '3rem', fontWeight: 'bold', mb: 2 }}>
          404 Not Found
        </Typography>

        <Typography variant="body1" sx={{ fontSize: '1.25rem', mb: 3 }}>
          This page does not exist
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ color: 'white', backgroundColor: 'primary.main', mt: 3 }}
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
