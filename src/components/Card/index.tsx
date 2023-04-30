import React from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import Rating from '@mui/material/Rating';
import PetsIcon from '@mui/icons-material/Pets';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import PendingIcon from '@mui/icons-material/Pending';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/joy/CircularProgress';
import Stack from '@mui/material/Stack';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from '@mui/material/Skeleton';

import { postFavorite, deleteFavorite, Cat } from '../../features/cat/catSlice'
import { selectUploadedImages, postImage, deleteImage, selectUploadedStatus, selectUploadedError, cleanErrors } from '../../features/upload/uploadSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import InputBase from '@mui/material/InputBase';

interface CardDetailsProps extends Cat {
    expanded: boolean,
    isFavourite?: boolean,
    favouriteId?: number,
    handleCardClick?: (item: string) => void
}

const CardDetails: React.FC<CardDetailsProps> = ({
    expanded,
    isFavourite,
    handleCardClick = () => { },
    ...data
}) => {
    const dispatch = useAppDispatch();
    const [localFile, setLocalFile] = React.useState<File>()
    const uploads = useAppSelector(selectUploadedImages)
    const uploadStatus = useAppSelector(selectUploadedStatus)
    const uploadError = useAppSelector(selectUploadedError)
    const [loading, setLoading] = React.useState(false)
    const uploadForThisData = uploads.find(f => f.originalImage?.id === data?.image?.id)
    const cardMediaImage = uploadForThisData?.url || data.image?.url
    const hasRequiredProps = Boolean(data.image)

    React.useEffect(() => {
        if (!uploadError) return
        dispatch(cleanErrors())
    }, [])

    const ratings = [
        { key: 'Affection Level', value: data.affection_level },
        { key: 'Child Friendly', value: data.child_friendly },
        { key: 'Dog Friendly', value: data.dog_friendly },
        { key: 'Energy Level', value: data.energy_level },
        { key: 'Adaptability', value: data.adaptability },
    ].filter(item => item.value)

    const handleFavorite = async (event: React.SyntheticEvent) => {
        setLoading(true)
        event.stopPropagation()
        isFavourite
            ? await dispatch(deleteFavorite(Number(data.favouriteId)))
            : await dispatch(postFavorite(String(data.image?.id)))
        setLoading(false)
    }

    const handleSelectNewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if (!files) return
        setLocalFile(files[0])
    }

    const handleUploadImage = () => {
        if (!localFile) {
            return alert('n encontrou localFile para enviar')
        }

        dispatch(postImage({ file: localFile, image: hasRequiredProps ? data.image : undefined }))
    }

    const handleRemoveUploadedImage = () => {
        dispatch(deleteImage(String(uploadForThisData?.id)))
    }

    return (
        <Card sx={{ width: expanded ? '100%' : '270px', cursor: expanded ? 'auto' : 'pointer' }} onClick={() => handleCardClick(data.id)}>
            <Box sx={{ position: 'relative' }}>
            <LazyLoadImage
                src={cardMediaImage}
                width="100%"
                height={expanded ? '500' : '200'}
                placeholder={<Skeleton variant="rectangular" width={270} height={360} />}
                loading="lazy"
                data-testid="lazyloadimage"
                style={{ objectFit: expanded ? 'contain' : 'cover' }}
            />
                {hasRequiredProps && <Stack direction="row" sx={{ position: 'absolute', right: 8, top: 4 }}>
                    <Tooltip title="Favorite" arrow>
                        <IconButton onClick={handleFavorite} aria-label='add to favorites'>
                            {loading
                                ? <PendingIcon fontSize="large" />
                                : <FavoriteIcon color={isFavourite ? 'error' : 'disabled'} fontSize="large" />
                            }
                        </IconButton>
                    </Tooltip>
                </Stack>}
                
            </Box>

            <CardContent>
                <Typography variant='h5' align='center' color='text.secondary'>
                    {data.name}
                </Typography>

                {expanded && <Box textAlign='center' mt={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', maxWidth: '350px', margin: '0 auto' }}>
                    <InputBase disabled={uploadStatus === 'loading'} type="file" name="file" onChange={handleSelectNewImage} />
                    <Button disabled={uploadStatus === 'loading' || !localFile} variant="contained" onClick={handleUploadImage}>
                        {uploadStatus === 'loading'
                            ? <CircularProgress size="sm" />
                            : <Typography variant='button' fontWeight="bold">
                                Upload Image
                            </Typography>
                        }
                    </Button>

                    <Button disabled={uploadStatus === 'loading' || !uploadForThisData} variant="outlined" onClick={handleRemoveUploadedImage}>
                        <Typography variant='button' fontWeight="bold">
                            Remove Uploaded Image
                        </Typography>
                    </Button>
                </Box>}

                {uploadError && expanded && <Alert sx={{ maxWidth: '350px', margin: '16px auto 0' }} severity="error">{uploadError}</Alert>}

                {!expanded && <>
                    <Typography variant='body2' color='text.secondary' noWrap>
                        {data.description}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        <b>Life span:</b> {data.life_span} years
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        <b>Imperial weight:</b> {data.weight?.imperial}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        <b>Origin:</b> {data.origin}
                    </Typography>
                </>}
            </CardContent>

            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        {data.description}
                    </Typography>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        <b>Life span:</b> {data.life_span} years
                    </Typography>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        <b>Imperial weight:</b> {data.weight?.imperial} pounds
                    </Typography>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        <b>Origin:</b> {data.origin}
                    </Typography>
                    <Typography paragraph variant='body1' color='text.secondary'>
                        <b>Temperament:</b> {data.temperament}
                    </Typography>

                    {ratings.length > 0 && ratings.map(rating => (
                        <Typography paragraph key={rating.key}>
                            <Typography component="legend">{rating.key}</Typography>
                            <Rating size="large" icon={<PetsIcon fontSize="inherit" />} emptyIcon={<DoNotDisturbIcon fontSize="inherit" />} name={rating.key} value={rating.value} readOnly />
                        </Typography>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default CardDetails