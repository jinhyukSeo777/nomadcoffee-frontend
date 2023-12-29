import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
`;

const Home = () => {
  return <Container>Home</Container>;
};

export default Home;
