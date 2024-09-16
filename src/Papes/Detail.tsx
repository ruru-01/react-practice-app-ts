import React, {useEffect, useState} from 'react'
import { Card, Typography, Box, Container, Chip, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { API_BASE_URL } from "../Constants";

interface Post {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: number;
  categories: string[];
  content: string;
}

export const Detail: React.FC = () => {
  const { id } = useParams();
  const [ post, setPosts ] = useState<Post[]>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}/${month}/${day}`;
  };

  // APIでpostsを取得する処理をuseEffectで実行する
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/posts/${id}`)
      const { post } = await res.json()
      setPosts(post)
      setLoading(false)
    }
    fetcher()
  }, [id]);

  if (loading) {
    return <div>読み込み中...</div>
  }

  if (!loading && !post) {
    return <div>記事が見つかりません</div>
  }

  return (
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <Card>
          <CardMedia
              component="img"
              image={post.thumbnailUrl}
              alt={post.title}
          />
        </Card>
        <Box sx={{ padding: '20px' }}>
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
          >
            <Typography sx={{ fontSize: '13px', color: '#888888' }}>
              {formatDate(post.createdAt)}
            </Typography>
            <Box>
              {post.categories.map((category, index) => (
                  <Box key={index} sx={{ mr: 1, display: 'inline-block' }}>
                    <Chip
                        label={category}
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                    />
                  </Box>
              ))}
            </Box>
          </Box>
          <Typography sx={{ fontSize: '24px', padding: '15px 0' }}>
            {post.title}
          </Typography>
          <Typography sx={{ fontSize: '16px' }}>
            {parse(post.content)}
          </Typography>
        </Box>
      </Container>
  );
};