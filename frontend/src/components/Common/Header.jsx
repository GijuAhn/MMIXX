import styled from "styled-components";

const Header = ({ title, desc }) => {
  return (
    <Wrapper>
      <p>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  padding: 30px 40px 30px;
`
const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: ${({theme}) => theme.palette.secondary};
  letter-spacing: -1px;
  font-weight: bold;
  margin-right: 0.5rem;
`

const Desc = styled.span`
  position: relative;
  top: -1px;
  letter-spacing: -0.09rem;
  font-weight: 200;
`

export default Header;