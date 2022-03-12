import React from 'react';
import styled from 'styled-components';
import { Search } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';

import { mobile } from '../responsive';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled.div`
  height: 60px;

  ${mobile({ heigh: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: '50px' })}
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  ${mobile({ fontSize: '24px' })}
`;
const Center = styled.div`
  flex: 2;
  ${mobile({ flex: 1 })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: 'center', flex: 3 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })};
  cursor: pointer;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();

  const redirectToHomepage = () => {
    navigate('/');
  };

  const redirectToCartPage = () => {
    navigate('/cart');
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search"></Input>
            <Search style={{ color: 'grey' }}></Search>
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={redirectToHomepage}>Fassy.</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem onClick={() => redirectToCartPage()}>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon color="action" />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
