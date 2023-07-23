import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Interface para as propriedades do componente Error
interface ErrorProps {
    errorMessage: any;
}

// export default function Error({ errorMessage }: ErrorProps) {
export default function Error() {
    // console.error('Error: ', errorMessage ? errorMessage : 'Error');
    return (
        <div>
            <ErrorOutlineIcon />
            {/* <h1>{errorMessage}</h1> */}
            {/* {errorMessage && <p>{errorMessage}</p>} */}
        </div>
    );
}
