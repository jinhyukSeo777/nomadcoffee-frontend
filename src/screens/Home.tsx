import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUser from "../useUser";

const SEE_COFFEESHOPS_MUTATION = gql`
  mutation SeeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      latitude
      longitude
      user {
        id
        name
      }
      categories {
        id
        name
      }
      photos {
        id
        url
      }
    }
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px 90px 0 90px;
`;

const GirdBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  grid-auto-rows: 250px;
  grid-gap: 70px;
`;

const CoffeeShopBox = styled.div`
  cursor: pointer;
  box-shadow: 10px 5px 5px #c09255;
  :hover {
    div {
      opacity: 1;
    }
  }
`;

const Photo = styled.div<{ url: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-position: center;
`;
const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  background-color: #8d632c;
  color: white;
  font-size: 17px;
  font-weight: 600;
`;

const Home = () => {
  const [page, setPage] = useState(1);
  const [coffeeShops, setCoffeeShops] = useState([]);
  const navigate = useNavigate();
  const { data } = useUser();

  const onCompleted = (data: any) => {
    const { seeCoffeeShops } = data;
    setCoffeeShops(seeCoffeeShops);
  };
  const [seeCoffeeShops] = useMutation(SEE_COFFEESHOPS_MUTATION, {
    onCompleted,
  });
  useEffect(() => {
    seeCoffeeShops({ variables: { page } });
  }, [page]);

  const onclicked = (id: number, userId: number) => {
    if (data?.myProfile.id === userId) {
      navigate(`/shop/${id}`);
    }
  };

  const onPageclicked = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {coffeeShops ? (
        <Container>
          <GirdBox>
            {coffeeShops?.map((value: any, index: number) => (
              <CoffeeShopBox
                key={index}
                onClick={() => onclicked(value.id, value.user.id)}
              >
                <Photo url={value.photos[0].url}></Photo>
                <Name>
                  <span>{value.name}</span>
                  <span>
                    {value.categories.map((v: any, i: number) => (
                      <span key={i}>{v.name}</span>
                    ))}
                  </span>
                </Name>
              </CoffeeShopBox>
            ))}
          </GirdBox>
        </Container>
      ) : null}
    </>
  );
};

export default Home;
