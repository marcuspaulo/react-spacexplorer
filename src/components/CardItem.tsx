import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Grid, styled } from '@mui/material';
import { format } from 'date-fns';

import { Item } from '../models/interfaces';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CardItem(item: Item) {
    const dataItem = item?.item.data[0];
    const dataImage = item?.item;

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ p: 2 }}
            >
                <Card
                    sx={{
                        minWidth: {
                            xs: 300,
                            sm: 400,
                            md: 600,
                            lg: 800,
                            xl: 1000,
                        },
                        maxWidth: {
                            xs: 300,
                            sm: 400,
                            md: 600,
                            lg: 800,
                            xl: 1000,
                        },
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="Nasa"
                            >
                                {dataItem?.title.charAt(0)}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={dataItem?.title}
                        subheader={format(
                            new Date(dataItem?.date_created),
                            'dd/MM/yyyy HH:mm'
                        )}
                    />

                    {dataImage?.links[0].href ? (
                        <CardMedia
                            component="img"
                            // height="400"
                            sx={{
                                minWidth: {
                                    xs: 300,
                                    sm: 400,
                                    md: 600,
                                    lg: 800,
                                    xl: 1000,
                                },
                                maxWidth: {
                                    xs: 300,
                                    sm: 400,
                                    md: 600,
                                    lg: 800,
                                    xl: 1000,
                                },
                            }}
                            image={dataImage?.links[0].href}
                            alt="Image alt"
                        />
                    ) : (
                        <p>No image available</p>
                    )}

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {dataItem?.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography>
                                Keywords:{' '}
                                {dataItem?.keywords?.map((k, index) => (
                                    <span key={index}>{k}; </span>
                                ))}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        </>
    );
}
