import styled from 'styled-components';

const Container = styled.div`
  height: 30px;
  background: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bolder;
`;
function Announcement() {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
}

export default Announcement;
