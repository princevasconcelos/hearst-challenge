import React from 'react' 
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

interface Weight {
    imperial: string
}

interface Image {
    url: string
}

interface CardDetailsProps {
    isSimple: boolean
    image: Image,
    name: string,
    description: string,
    weight: Weight,
    life_span: string,
    origin: string
}


const CardDetails: React.FC<CardDetailsProps> = ({ isSimple, image, name, description, life_span, weight, origin }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card sx={{ width: 345 }}>
            <Box sx={{ position: 'relative' }}>
                <IconButton aria-label='add to favorites' sx={{ position: 'absolute', right: 8, top: 4 }}>
                        <FavoriteIcon />
                    </IconButton>
                <CardMedia
                    component='img'
                    height='194'
                    image={image.url}
                    alt={name}
                />
            </Box>

            <CardContent>
                <Typography variant='h4' align='center' color='text.secondary'>
                    {name}
                </Typography>
                {<Typography variant='body2' color='text.secondary' noWrap>
                    {description}
                </Typography>}
                <Typography variant='body2' color='text.secondary'>
                    Life span: {life_span} years
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Imperial weight: {weight.imperial}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Origin: {origin}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more details'
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        {description}
                    </Typography>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        Life span: {life_span} years
                    </Typography>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        Imperial weight: {weight.imperial}
                    </Typography>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        Origin: {origin}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default CardDetails