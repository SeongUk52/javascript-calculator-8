import CalculatorService from "../src/service/CalculatorService.js";
import StringParserService from "../src/service/StringParserService.js";

describe("CalculatorService", () => {
  let calculatorService;
  let parserService;

  beforeEach(() => {
    parserService = new StringParserService();
    calculatorService = new CalculatorService(parserService);
  });

  test("단일 숫자 계산", () => {
    const result = calculatorService.calculate("5");
    expect(result).toBe(5);
  });

  test("두 숫자의 합 계산", () => {
    const result = calculatorService.calculate("1,2");
    expect(result).toBe(3);
  });

  test("세 숫자의 합 계산", () => {
    const result = calculatorService.calculate("1,2,3");
    expect(result).toBe(6);
  });

  test("콜론 구분자로 계산", () => {
    const result = calculatorService.calculate("1:2:3");
    expect(result).toBe(6);
  });

  test("쉼표와 콜론 혼합 계산", () => {
    const result = calculatorService.calculate("1,2:3");
    expect(result).toBe(6);
  });

  test("커스텀 구분자로 계산", () => {
    const result = calculatorService.calculate("//;\n1;2;3");
    expect(result).toBe(6);
  });

  test("다중 커스텀 구분자로 계산", () => {
    const result = calculatorService.calculate("//;*\n1;2*3");
    expect(result).toBe(6);
  });

  test("커스텀 구분자와 기본 구분자 혼합 계산", () => {
    const result = calculatorService.calculate("//;\n1;2,3:4");
    expect(result).toBe(10);
  });

  test("sumNumbers 메서드 직접 테스트", () => {
    const result = calculatorService.sumNumbers([1, 2, 3, 4]);
    expect(result).toBe(10);
  });

  test("빈 배열 합 계산", () => {
    const result = calculatorService.sumNumbers([]);
    expect(result).toBe(0);
  });
});
