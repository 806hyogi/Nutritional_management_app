import React from 'react';
import styled from 'styled-components/native';
import PropTypes from "prop-types";

// "Container" styled component 정의(View 스타일링) 
const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;


// 이미지를 스타일링한 컴포넌트
const StyledImage = styled.Image`
  backgroundColor: ${({ theme }) => theme.grey};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;


// 이미지 함수형 컴포넌트 정의
const Image = ({ url, imageStyle, rounded }) => {
  return (
    <Container>
      <StyledImage source={{ url: url }} style={imageStyle} rounded={rounded}/>
    </Container>
  );
};



// 이미지 컴포넌트의 propTypes 정의(프롭의 타입 체크)
Image.defaultProps = {
  rounded: false,
}

Image.propTypes = {
  url: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
};

export default Image;