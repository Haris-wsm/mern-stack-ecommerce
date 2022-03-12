import React from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Category from '../components/Category';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const Home = () => {
  return (
    <Container>
      <Announcement></Announcement>
      <Navbar />
      <Slider />
      <Category />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Home;
