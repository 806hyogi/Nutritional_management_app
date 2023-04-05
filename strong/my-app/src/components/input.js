// 커스텀 input 컴포넌트
import React, {useState} from 'react'
import styled from 'styled-components/native' // 패키지를 사용하여 스타일링
import PropTypes from 'prop-types'

//  View 컴포넌트 (방향과 너비를 설정)
const Container = styled.View`
  flex-direction: column;
  width: 100%;
`

// TextInput 컴포넌트 (텍스트 입력창의 스타일을 설정)
const StyledTextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.gray,
}))`
  padding: 20px 20px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.text};
`

// 커스텀 input 컴포넌트
const Input = ({
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  placeholder,
  isPassword,
  returnKeyType,
  maxLength
}) => {  // useState를 이용하여 isFocused라는 state를 관리(isFocused는 텍스트 입력 창이 현재 포커싱되어잇는지 나타냄)

  const [isFocused, setIsFocused] = useState(false);

  return(
    <Container>
      <StyledTextInput
        isFocused={isFocused}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
        underlineColorAndroid="transparent"
      />
    </Container>
  );
};

// props의 기본값과 타입을 정의
Input.defaultProps = {
  onBlur: () => {},
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  returnKeyType: PropTypes.oneOf(["done", "next"]),
  maxLength: PropTypes.number,
};

export default Input;
