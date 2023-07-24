import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Base } from '../models/interfaces';
import CardItem from './CardItem';
import { Alert, AlertTitle, Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Loading from './Loading';
import ErrorComponent from './ErrorComponent';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('saturn');
    const { data, isLoading, isError } = useSearch(searchQuery);
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
            handleSearch(inputValue);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

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
                        variant="h5"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontStyle: 'bold',
                            color: '#1976d2',
                        }}
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
                        {isError && <ErrorComponent />}

                        {data?.collection?.items.length === 0 && (
                            <Alert severity="info">
                                <AlertTitle>Info</AlertTitle>
                                The result is empty. —{' '}
                                <strong>
                                    The search returned no results. Suggested
                                    searches: Earth, Mars, Saturn, or other
                                    planets.
                                </strong>
                            </Alert>
                        )}

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
