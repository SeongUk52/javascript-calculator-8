class ValidationService {
  // 상수 정의
  static ERROR_MESSAGES = {
    NO_INPUT: "[ERROR] 입력값이 없습니다.",
    INVALID_NUMBER: "[ERROR] 숫자가 아닌 값이 포함되어 있습니다.",
    NEGATIVE_NUMBER: "[ERROR] 음수는 입력할 수 없습니다.",
    ZERO_NUMBER: "[ERROR] 0은 입력할 수 없습니다.",
    INVALID_DELIMITER_FORMAT: "[ERROR] 잘못된 커스텀 구분자 형식입니다.",
    INVALID_DELIMITER: "[ERROR] 잘못된 구분자입니다."
  };

  static BASIC_DELIMITER_PATTERN = /^[0-9,\s:]+$/;

  // 유틸리티 메서드들
  normalizeInput(input) {
    return input.replaceAll("\\n", "\n");
  }

  parseCustomDelimiterInput(input) {
    const normalizedInput = this.normalizeInput(input);
    const lines = normalizedInput.split("\n");
    return {
      lines,
      delimiterLine: lines[0]?.substring(2) || "",
      numbersLine: lines[1] || ""
    };
  }

  validateInput(input) {
    if (input === null || input === undefined) {
      throw new Error(ValidationService.ERROR_MESSAGES.NO_INPUT);
    }
  }

  validateNumbers(numbers) {
    for (const num of numbers) {
      if (Number.isNaN(num)) {
        throw new TypeError(ValidationService.ERROR_MESSAGES.INVALID_NUMBER);
      }
      if (num < 0) {
        throw new Error(ValidationService.ERROR_MESSAGES.NEGATIVE_NUMBER);
      }
      if (num === 0) {
        throw new Error(ValidationService.ERROR_MESSAGES.ZERO_NUMBER);
      }
    }
  }

  validateCustomDelimiterFormat(input) {
    if (input.startsWith("//")) {
      const { lines } = this.parseCustomDelimiterInput(input);
      if (lines.length !== 2) {
        throw new Error(ValidationService.ERROR_MESSAGES.INVALID_DELIMITER_FORMAT);
      }
    }
  }

  validateDelimiters(input) {
    if (input.trim() === "") {
      return;
    }
    
    if (input.startsWith("//")) {
      this.validateCustomDelimiterNumbers(input);
      return;
    }
    
    if (!ValidationService.BASIC_DELIMITER_PATTERN.test(input)) {
      throw new Error(ValidationService.ERROR_MESSAGES.INVALID_DELIMITER);
    }
  }

  validateCustomDelimiterNumbers(input) {
    const { lines, delimiterLine, numbersLine } = this.parseCustomDelimiterInput(input);
    
    if (lines.length !== 2) {
      return;
    }
    
    const customDelimiters = delimiterLine.split('').map(d => `\\${d}`).join('');
    const customValidPattern = new RegExp(`^[0-9,\\s:${customDelimiters}]+$`);
    
    if (!customValidPattern.test(numbersLine)) {
      throw new Error(ValidationService.ERROR_MESSAGES.INVALID_DELIMITER);
    }
  }
}

export default ValidationService;
