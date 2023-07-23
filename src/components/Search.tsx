import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Base } from '../models/interfaces';
import CardItem from './CardItem';
import { Box } from '@mui/material';
import ErrorComponent from './ErrorComponent';
import Loading from './Loading';

export default function Search() {
    const { data, isLoading, isError, error } = useSearch();
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

    if (isError || data === undefined) {
        return <ErrorComponent errorMessage={error} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    // const planets = [
    //     { title: 'Earth' },
    //     { title: 'Jupiter' },
    //     { title: 'Mars' },
    //     { title: 'Mercury' },
    //     { title: 'Neptune' },
    //     { title: 'Saturn' },
    //     { title: 'Uranus' },
    //     { title: 'Venus' },
    // ];

    // const defaultProps = {
    //     options: planets,
    //     getOptionLabel: (option: PlanetOptionType) => option.title,
    // };

    // interface PlanetOptionType {
    //     title: string;
    // }

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

                <section>
                    {data?.collection?.items.map((item, index) => {
                        return (
                            <div key={index}>
                                <CardItem
                                    item={item}
                                    href={''}
                                    data={[]}
                                    links={[]}
                                />
                            </div>
                        );
                    })}
                </section>
            </Box>
        </>
    );
}
