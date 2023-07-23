import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Base } from '../models/interfaces';
import Loading from './Loading';
import Error from './Error';
import CardItem from './CardItem';
import { Box } from '@mui/material';

export default function Search() {
    const { status, data, error } = useSearch();
    const baseUrl = import.meta.env.VITE_BASE_URL as string;

    function useSearch() {
        return useQuery({
            queryKey: ['search'],
            queryFn: async () => {
                const { data } = await axios.get<Base>(
                    `${baseUrl}/search?q=saturn&page=2&page_size=5`
                );
                return data;
            },
        });
    }

    const planets = [
        { title: 'Earth' },
        { title: 'Jupiter' },
        { title: 'Mars' },
        { title: 'Mercury' },
        { title: 'Neptune' },
        { title: 'Saturn' },
        { title: 'Uranus' },
        { title: 'Venus' },
    ];

    const defaultProps = {
        options: planets,
        getOptionLabel: (option: PlanetOptionType) => option.title,
    };

    interface PlanetOptionType {
        title: string;
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '8%',
                }}
            >
                {/* <div>
                    <Autocomplete
                        sx={{ backgroundColor: 'white' }}
                        {...defaultProps}
                        id="auto-complete"
                        autoComplete
                        includeInputInList
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Enter your search here to learn about other planets"
                                variant="standard"
                            />
                        )}
                    />
                </div> */}

                {error ? <p>An error occurred: {error?.message}</p> : ''}

                {status === 'loading' ? (
                    <Loading />
                ) : status === 'error' ? (
                    <span>
                        <Error error />
                        {error?.message}
                    </span>
                ) : (
                    ''
                )}
                <section>
                    {data?.collection?.items.map((item, index) => {
                        return (
                            <div key={index}>
                                <CardItem item={item} />
                            </div>
                        );
                    })}
                </section>
            </Box>
        </>
    );
}
