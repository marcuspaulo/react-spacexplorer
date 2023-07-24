import { Alert, AlertTitle } from '@mui/material';

// Interface para as propriedades do componente Error
// interface ErrorProps {
//     errorMessage: any;
// }

// export default function Error({ errorMessage }: ErrorProps) {
export default function Error() {
    // console.error('Error: ', errorMessage ? errorMessage : 'Error');
    return (
        <div>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                There was an error trying to get the results.{' '}
                <strong>Please try again!</strong>
            </Alert>
        </div>
    );
}
