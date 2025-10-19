class StringParserService {
  parseNumbers(input) {
    // 커스텀 구분자 처리
    if (input.startsWith("//")) {
      return this.parseWithCustomDelimiter(input);
    }
    
    // 기본 구분자(쉼표, 콜론) 처리
    const numbers = input.split(/[,:]/);
    
    // 문자열을 숫자로 변환
    return this.convertToNumbers(numbers);
  }

  parseWithCustomDelimiter(input) {
    // "//구분자\n숫자들" 또는 "//구분자1구분자2\n숫자들" 형식 파싱
    const lines = input.split("\n");
    if (lines.length !== 2) {
      throw new Error("[ERROR] 잘못된 커스텀 구분자 형식입니다.");
    }
    
    const delimiterLine = lines[0].substring(2); // "//" 제거
    const numbersLine = lines[1];
    
    // 여러 커스텀 구분자 처리 (예: //;* -> 세미콜론과 별표)
    if (delimiterLine.length > 1) {
      return this.parseWithMultipleCustomDelimiters(delimiterLine, numbersLine);
    }
    
    // 단일 커스텀 구분자 처리
    return this.parseWithSingleCustomDelimiter(delimiterLine, numbersLine);
  }

  parseWithSingleCustomDelimiter(delimiter, numbersLine) {
    // 커스텀 구분자와 기본 구분자(쉼표, 콜론) 모두 사용
    const customNumbers = numbersLine.split(delimiter);
    const allNumbers = [];
    
    for (const part of customNumbers) {
      // 각 부분에서 기본 구분자로도 분리
      const basicNumbers = part.split(/[,:]/);
      allNumbers.push(...basicNumbers);
    }
    
    return this.convertToNumbers(allNumbers);
  }

  parseWithMultipleCustomDelimiters(delimiterLine, numbersLine) {
    // 여러 커스텀 구분자로 분리 (예: //;* -> [;, *])
    const delimiters = delimiterLine.split('');
    let numbers = [numbersLine];
    
    // 각 구분자로 순차적으로 분리
    for (const delimiter of delimiters) {
      const newNumbers = [];
      for (const number of numbers) {
        newNumbers.push(...number.split(delimiter));
      }
      numbers = newNumbers;
    }
    
    // 기본 구분자(쉼표, 콜론)로도 추가 분리
    const allNumbers = [];
    for (const number of numbers) {
      allNumbers.push(...number.split(/[,:]/));
    }
    
    return this.convertToNumbers(allNumbers);
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
