import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Base } from '../models/interfaces';
import CardItem from './CardItem';
import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Loading from './Loading';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('saturn');
    const { data, isLoading } = useSearch(searchQuery);
    const baseUrl = import.meta.env.VITE_BASE_URL as string;
    const [inputValue, setInputValue] = useState('');

    function useSearch(query: string) {
        query ? query : undefined;
        const queryParam = query ? query : 'earth';
        return useQuery({
            queryKey: ['search', query],
            staleTime: 60000,
            queryFn: async () => {
                const { data } = await axios.get<Base>(
                    `${baseUrl}/search?q=${queryParam}&page=2&page_size=5`
                );
                return data;
            },
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log('Tecla Enter pressionada!', inputValue);
            handleSearch(inputValue);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // if (isError || data === undefined) {
    //     return <ErrorComponent />;
    // }

    // if (isLoading) {
    //     return <Loading />;
    // }

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
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: {
                            xs: '30%',
                            sm: '50%',
                            md: '10%',
                            lg: '10%',
                        },
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Enter your search here to learn about other planets.
                    </Typography>

                    <br />
                    <TextField
                        sx={{
                            minWidth: {
                                sx: '300px',
                                sm: '300px',
                                md: '300px',
                                lg: '70%',
                            },
                            width: {
                                xs: '85%',
                                sm: '90%',
                                md: '90%',
                                lg: '70%',
                            },
                            fontWeight: 'bold',
                            fontSize: '30px',
                            color: 'red',
                        }}
                        InputProps={{
                            sx: {
                                fontSize: '2rem',
                                color: '#1976d2',
                            },
                        }}
                        variant="standard"
                        focused
                        value={inputValue}
                        onKeyDown={handleInputKeyDown}
                        onChange={handleInputChange}
                        onSubmit={(e) => e.preventDefault()}
                    />
                    {/* <Autocomplete
                    sx={{ minWidth: '56%' }}
                    {...defaultProps}
                    id="auto-complete"
                    autoComplete
                    // includeInputInList
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Enter your search here to learn about other planets"
                            variant="standard"
                            value={searchQuery}
                            onKeyDown={handleInputKeyDown}
                            onChange={handleInputChange}
                        />
                    )}
                /> */}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '2%',
                        marginBottom: {
                            xs: '20%',
                            sm: '20%',
                            md: '50%',
                            lg: '10%',
                        },
                    }}
                >
                    <section>
                        {isLoading && <Loading />}

                        {data?.collection?.items.map((item, index) => {
                            return (
                                <div key={index}>
                                    <CardItem item={item} />
                                </div>
                            );
                        })}
                    </section>
                </Box>
            </form>
        </>
    );
}
