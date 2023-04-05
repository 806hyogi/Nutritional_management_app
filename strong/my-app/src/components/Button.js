import React from "react";
import styled from "styled-components/native"
import PropTypes from "prop-types";
import propTypes from "prop-types";


const Container = styled.TouchableOpacity`
  backgroundColor: ${({ theme, disabled }) => (disabled ? theme.grey : theme.main)};
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 6px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Title = styled.Text`
  height: 40px;
  border-radius: 4px;
  line-height: 30px;
  font-size: 18px;
  color: white;
  text-align: center;
  padding: 5px;
`

const Button = ({title, onPress, disabled}) => {
  return (
    <Container onPress={onPress} disabled={disabled}>
      <Title>{title}</Title>
    </Container>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default Button;