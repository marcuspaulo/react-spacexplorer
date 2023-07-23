import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Base } from '../models/interfaces';
import CardItem from './CardItem';
import { Box, TextField } from '@mui/material';
import ErrorComponent from './ErrorComponent';
import Loading from './Loading';
import { useState } from 'react';

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
            queryFn: async () => {
                const { data } = await axios.get<Base>(
                    `${baseUrl}/search?q=${queryParam}&page=2&page_size=5`
                );
                return data;
            },
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    if (isError || data === undefined) {
        return <ErrorComponent />;
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
                <TextField
                    sx={{ minWidth: '56%' }}
                    label="Enter your search here to learn about other planets"
                    variant="standard"
                    focused
                    value={inputValue}
                    onKeyDown={handleInputKeyDown}
                    onChange={handleInputChange}
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
                }}
            >
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
