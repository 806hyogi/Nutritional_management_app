// 이메일 주소가 올바른 형식인지 확인
export const validateEmail = (email) => {
  const regex =
  /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

// 문자열에서 모든 공백을 제거하는데 사용
export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, "");
};