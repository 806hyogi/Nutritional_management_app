import React from "react";
import styled from "styled-components/native" // react-native 스타일 관리 패키지
import PropTypes from "prop-types"; // react 컴포넌트 props에 대한 유효성검사
import propTypes from "prop-types"; // =


// 버튼을 눌렀을 때 색상이 변화되는 시각적 변화를 주는 버튼
const Container = styled.TouchableOpacity`
  backgroundColor: ${({ theme, disabled }) => (disabled ? theme.grey : theme.main)};
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 6px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;


// Text 컴포넌트를 스타일링
const Title = styled.Text`
  height: 40px;
  border-radius: 4px;
  line-height: 30px;
  font-size: 18px;
  color: white;
  text-align: center;
  padding: 5px;
`


// Button 함수형 컴포넌트 정의
const Button = ({title, onPress, disabled}) => {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <Title>{title}</Title>
    </Container>
  )
}


// Button 컴포넌트의 prop의 타입을 체크
Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default Button;