import { RocketLaunch } from '@mui/icons-material';
import { AppBar, IconButton, Theme, Toolbar, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface HeaderProps {
    theme: Theme;
    toggleColorMode: () => void;
}

export default function Header({ theme, toggleColorMode }: HeaderProps) {
    return (
        <AppBar
            position="fixed"
            sx={{
                marginBottom: '5px',
                paddingBottom: '5px',
                backgroundColor: '#023567',
            }}
        >
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    <RocketLaunch /> {' | '} SpaceXplorer
                </Typography>

                <IconButton
                    sx={{ ml: 1 }}
                    onClick={toggleColorMode}
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
    );
}
