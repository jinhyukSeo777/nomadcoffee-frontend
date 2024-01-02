import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return <Container>Home</Container>;
};

export default Home;
