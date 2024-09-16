import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Link } from '@mui/material';


export const Header: React.FC = () => {
  return (
      <AppBar
          position="static"
          sx={{
            backgroundColor: '#262626',
            mb: 5,
            boxShadow: 'none',
          }}
      >
        <Toolbar
            sx={{
              justifyContent: 'space-between',
            }}
        >
          <Link
              href="/"
              sx={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
          >
            Blog
          </Link>
          <Box>
            <Link
                href="/contact"
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
            >
              お問い合わせ
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
  );
};