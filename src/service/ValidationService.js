class ValidationService {
  validateInput(input) {
    // null, undefined만 검증 (빈 문자열은 허용)
    if (input === null || input === undefined) {
      throw new Error("[ERROR] 입력값이 없습니다.");
    }
  }

  validateNumbers(numbers) {
    for (const num of numbers) {
      // 숫자가 아닌 값 검증
      if (Number.isNaN(num)) {
        throw new TypeError("[ERROR] 숫자가 아닌 값이 포함되어 있습니다.");
      }
      
      // 음수 검증
      if (num < 0) {
        throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
      }
      
      // 0 검증 (양수는 0 포함 안 됨)
      if (num === 0) {
        throw new Error("[ERROR] 0은 입력할 수 없습니다.");
      }
    }
  }

  validateCustomDelimiterFormat(input) {
    if (input.startsWith("//")) {
      const lines = input.split("\n");
      if (lines.length !== 2) {
        throw new Error("[ERROR] 잘못된 커스텀 구분자 형식입니다.");
      }
    }
  }
}

export default ValidationService;
