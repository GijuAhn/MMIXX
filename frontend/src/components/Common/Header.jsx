import styled from "styled-components";
import { DefaultBtn } from ".";

const Header = ({ title, description }) => {
  return (
    <Wrapper>
      <HeaderTitle>
        {title}
      </HeaderTitle>
      <HeaderDesc>
        {description}
      </HeaderDesc>
      <DefaultBtn>실험용</DefaultBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid blue;
  justify-content: start;
  padding: 10px;
`
const HeaderTitle = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: ${({theme}) => theme.palette.secondary}
`

const HeaderDesc = styled.p`
`

export default Header;