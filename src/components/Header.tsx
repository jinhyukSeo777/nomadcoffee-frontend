import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";
import { brownColor } from "../color";

const Container = styled.div<{ scrollposition: number }>`
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  color: black;
  background-color: ${({ scrollposition }) =>
    scrollposition >= 100 ? "white" : "inherits"};
  z-index: 99;
`;

const Column = styled.div`
  margin: 0 54px 0 70px;
`;

const LeftSpan = styled.span`
  font-weight: 600;
  font-size: 25px;
  cursor: pointer;
  font-family: "Times New Roman", Times, serif;
  letter-spacing: 1.5px;
`;

const RightSpan = styled.span`
  font-weight: 500;
  font-size: 16px;
  margin-left: 15px;
  cursor: pointer;
  padding: 14px;
  border-radius: 6px;
  color: ${brownColor};
  &:hover {
    background-color: ${brownColor};
    color: white;
  }
`;

const Header = () => {
  // header backgroundColor change
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScrollPosition = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScrollPosition);
  });

  const navigate = useNavigate();

  const onLogoutClicked = () => {
    logUserOut();
    navigate("/");
    window.location.reload();
  };

  return (
    <Container scrollposition={scrollPosition || 0}>
      <Column>
        <LeftSpan onClick={() => navigate("/")}>GOGOcoffee</LeftSpan>
      </Column>
      <Column>
        {isLoggedInVar() ? (
          <RightSpan onClick={() => navigate("/add")}>매장등록</RightSpan>
        ) : null}
        {isLoggedInVar() ? (
          <RightSpan>내 정보</RightSpan>
        ) : (
          <RightSpan onClick={() => navigate("/signup")}>회원가입</RightSpan>
        )}
        {isLoggedInVar() ? (
          <RightSpan onClick={onLogoutClicked}>로그아웃</RightSpan>
        ) : (
          <RightSpan onClick={() => navigate("/login")}>로그인</RightSpan>
        )}
      </Column>
    </Container>
  );
};

export default Header;
