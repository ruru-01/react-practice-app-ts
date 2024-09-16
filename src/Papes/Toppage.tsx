import React, {useEffect, useState} from 'react';
import { Card, CardContent, Typography, Grid2, Box, Container, Chip, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { API_BASE_URL } from "../constants";

interface Posts {
  id: number;
  title: string;
  createdAt: number;
  categories: string[];
  content: string;
}

export const Toppage = () => {
  const [ posts, setPosts ] = useState<Posts[]>([]);
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
      const res = await fetch(`${API_BASE_URL}/posts`)
      const { posts } = await res.json()
      setPosts(posts)
      setLoading(false)
    }
    fetcher()
  }, []);

  if (loading) {
    return <div>読み込み中...</div>
  }

  if (!loading && !posts.length) {
    return <div>記事が見つかりません</div>
  }

  return (
      <Container maxWidth="md" sx={{ pb: 5 }}>
        <Grid2 container direction="column" spacing={5}>
          {posts.map((post) => (
              <Grid2 key={post.id}>
                <CardActionArea component={Link} to={`/posts/${post.id}`}>
                  <Card
                      sx={{
                        boxShadow: 'none',
                        border: '1px solid #e0e0e0',
                        pr: 10
                      }}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                            sx={{
                              fontSize: '13px',
                              color: '#888888'
                            }}
                        >
                          {formatDate(post.createdAt)}
                        </Typography>
                        <Box>
                          {post.categories.map((category, index) => (
                              <Box key={index} sx={{ mr: 1, display: 'inline-block' }}>
                                <Chip
                                    label={category}
                                    key={index}
                                    color="primary"
                                    variant="outlined"
                                    sx={{ borderRadius: 1 }}
                                />
                              </Box>
                          ))}
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: '24px' }}>{post.title}</Typography>
                      <Typography
                          sx={{
                            pt: 2,
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                          }}
                      >
                        {parse(post.content)}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid2>
          ))}
        </Grid2>
      </Container>
  );
};