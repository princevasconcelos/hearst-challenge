import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

interface FavoriteButtonProps {
    isActive: boolean,
    className: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isActive, ...rest }) => (
    <IconButton disableRipple={true} color={isActive ? 'error' : 'default'} {...rest}>
        {isActive ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
)

export default FavoriteButton