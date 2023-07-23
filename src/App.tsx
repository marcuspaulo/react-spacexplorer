import { useEffect, useContext, createContext, useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Search from './components/Search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Footer from './pages/layout/Footer';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function MyApp() {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const queryClient = new QueryClient();
    const title = import.meta.env.VITE_TITLE as string;

    useEffect(() => {
        document.title = title ? title : 'React Nasa';
    });

    return (
        <>
            {theme.palette.mode} mode
            <QueryClientProvider client={queryClient}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        bgcolor: 'background.default',
                        color: 'text.primary',
                    }}
                >
                    {/* <Header /> */}
                    <AppBar
                        position="fixed"
                        sx={{
                            marginBottom: '10px',
                            paddingBottom: '10px',
                            backgroundColor: '#023567',
                        }}
                    >
                        <Toolbar>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                SpaceXplorer
                            </Typography>

                            <IconButton
                                sx={{ ml: 1 }}
                                onClick={colorMode.toggleColorMode}
                                color="inherit"
                            >
                                {theme.palette.mode === 'dark' ? (
                                    <Brightness7Icon />
                                ) : (
                                    <Brightness4Icon />
                                )}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Search />
                    {/* <Content /> */}
                    <Footer theme />
                </Box>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light'
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <MyApp />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
