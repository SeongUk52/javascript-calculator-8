import StringParserService from "../src/service/StringParserService.js";
import ValidationService from "../src/service/ValidationService.js";

describe("StringParserService", () => {
  let parserService;
  let validationService;

  beforeEach(() => {
    validationService = new ValidationService();
    parserService = new StringParserService(validationService);
  });


  test("쉼표로 구분된 숫자들 파싱", () => {
    const result = parserService.parseNumbers("1,2,3");
    expect(result).toEqual([1, 2, 3]);
  });

  test("콜론으로 구분된 숫자들 파싱", () => {
    const result = parserService.parseNumbers("1:2:3");
    expect(result).toEqual([1, 2, 3]);
  });

  test("쉼표와 콜론이 섞인 숫자들 파싱", () => {
    const result = parserService.parseNumbers("1,2:3");
    expect(result).toEqual([1, 2, 3]);
  });


  test("세미콜론 커스텀 구분자 파싱", () => {
    const result = parserService.parseNumbers("//;\n1;2;3");
    expect(result).toEqual([1, 2, 3]);
  });

  test("별표 커스텀 구분자 파싱", () => {
    const result = parserService.parseNumbers("//*\n1*2*3");
    expect(result).toEqual([1, 2, 3]);
  });

  test("하이픈 커스텀 구분자 파싱", () => {
    const result = parserService.parseNumbers("//-\n1-2-3");
    expect(result).toEqual([1, 2, 3]);
  });

  test("잘못된 커스텀 구분자 형식 시 에러 발생", () => {
    expect(() => {
      parserService.parseNumbers("//;1;2;3");
    }).toThrow("[ERROR] 잘못된 커스텀 구분자 형식입니다.");
  });

  test("커스텀 구분자에 공백이 포함된 경우", () => {
    const result = parserService.parseNumbers("//;\n 1 ; 2 ; 3 ");
    expect(result).toEqual([1, 2, 3]);
  });

  test("커스텀 구분자와 기본 구분자 혼합 사용", () => {
    const result = parserService.parseNumbers("//;\n1;2,3:4");
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test("여러 커스텀 구분자 사용", () => {
    const result = parserService.parseNumbers("//;*\n1;2*3");
    expect(result).toEqual([1, 2, 3]);
  });

  test("여러 커스텀 구분자와 기본 구분자 혼합", () => {
    const result = parserService.parseNumbers("//;*\n1;2*3,4:5");
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

});
