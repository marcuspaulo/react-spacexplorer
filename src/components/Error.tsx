import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Error(error: Error) {
    console.error('Error: ', error);
    return (
        <div>
            <ErrorOutlineIcon />
            <h1>Error</h1>
        </div>
    );
}
