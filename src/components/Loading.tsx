import {
    Backdrop,
    Box,
    CardContent,
    CircularProgress,
    Skeleton,
} from '@mui/material';

export default function Loading() {
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CardContent>
                    <Skeleton
                        animation="wave"
                        height={30}
                        style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={300} width="80%" />
                </CardContent>
                <Box sx={{ width: 1000, backgroundColor: '#rgb(101 96 96)' }}>
                    <Skeleton />
                    <Skeleton animation="pulse" />
                    <Skeleton animation="pulse" />
                </Box>

                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={true}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </>
    );
}
