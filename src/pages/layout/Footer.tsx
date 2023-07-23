import { Theme } from '@emotion/react';
import { Box, Typography } from '@mui/material';

// interface FooterProps {
//     theme: Theme;
// }
export default function Footer(theme: Theme) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 56,
                    padding: '16px 0',
                    backgroundColor: theme?.palette?.background?.default,
                    color: theme?.palette?.text?.primary,
                }}
            >
                <Typography variant="caption" color="text.primary">
                    Nasa API Version:
                    {/* {data?.collection?.version}. More */}
                    details:{' '}
                    <a href="https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf">
                        Nasa API Docs
                    </a>
                </Typography>
            </Box>
        </>
    );
}

// import React from 'react';
// import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// import Footer from './Footer';

// const lightTheme = createTheme({
//     palette: {
//         mode: 'light',
//         primary: {
//             main: '#808080', // Cinza para o light mode
//         },
//     },
// });

// const darkTheme = createTheme({
//     palette: {
//         mode: 'dark',
//         primary: {
//             main: '#1976d2', // Azul para o dark mode
//         },
//     },
// });

// function App() {
//     const [isDarkMode, setIsDarkMode] = React.useState(false);

//     const theme = isDarkMode ? darkTheme : lightTheme;

//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             {/* Seu conteúdo aqui */}
//             <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
//         </ThemeProvider>
//     );
// }

// export default App;
