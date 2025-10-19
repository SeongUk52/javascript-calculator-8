class CalculatorService {
  constructor(parserService) {
    this.parserService = parserService;
  }

  calculate(input) {
    // 문자열을 숫자 배열로 파싱
    const numbers = this.parserService.parseNumbers(input);
    
    // 숫자들의 합 계산
    return this.sumNumbers(numbers);
  }

  sumNumbers(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
}

export default CalculatorService;
