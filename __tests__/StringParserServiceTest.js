import StringParserService from "../src/service/StringParserService.js";

describe("StringParserService", () => {
  let parserService;

  beforeEach(() => {
    parserService = new StringParserService();
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

});
