import { PostModel } from '$models/post';
import { Favorite, FavoriteOutlined } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Link,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export type PostProps = PostModel & {
  isFav?: boolean;
  toggleFav?: () => void;
};

export const Post: React.FC<PostProps> = ({
  category,
  content,
  image,
  userId,
  user,
  isFav,
  toggleFav,
}) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={user?.picture} sx={{ textTransform: 'uppercase' }}>
            {user?.name[0]}
          </Avatar>
        }
        title={user?.name}
        subheader={`@${user?.username} | ${category}`}
      />
      <CardMedia component='img' height='200' image={image} alt={content} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={toggleFav}>{isFav ? <Favorite /> : <FavoriteOutlined />}</IconButton>
      </CardActions>
    </Card>
  );
};
