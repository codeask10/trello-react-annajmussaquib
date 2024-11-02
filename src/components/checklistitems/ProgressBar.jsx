import { LinearProgress, Typography, Box } from '@mui/material';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    {...props}
                    sx={{
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: 'green',
                        }
                    }}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

const ProgressBar = ({ progress }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
}

export default ProgressBar;
