import { RocketLaunch } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

interface FooterProps {
    apiVersion: string;
}

export default function Footer({ apiVersion }: FooterProps) {
    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    py: 2,
                    backgroundColor: '#033566',
                    textAlign: 'center',
                }}
            >
                <Typography variant="caption" color="#FFF">
                    Nasa API Version:{' '}
                    <a
                        href="https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf"
                        target="_blank"
                        style={{
                            color: '#FFF',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                    >
                        {apiVersion}
                    </a>
                    {'   '}
                    {' | '} Develop by Marcus Melo
                    {'   '}
                    <RocketLaunch />
                </Typography>
            </Box>
        </>
    );
}
