class StringParserService {
  parseNumbers(input) {
    // 쉼표와 콜론을 구분자로 사용하여 분리
    const numbers = input.split(/[,:]/);
    
    // 문자열을 숫자로 변환
    return this.convertToNumbers(numbers);
  }

  convertToNumbers(numberStrings) {
    return numberStrings.map(str => {
      const trimmed = str.trim();
      const num = Number.parseInt(trimmed);
      return num;
    });
  }
}

export default StringParserService;
