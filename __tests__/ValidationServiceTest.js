import ValidationService from "../src/service/ValidationService.js";

describe("ValidationService", () => {
  let validationService;

  beforeEach(() => {
    validationService = new ValidationService();
  });

  describe("validateInput", () => {
    test("빈 문자열은 통과", () => {
      expect(() => {
        validationService.validateInput("");
      }).not.toThrow();
    });

    test("공백 문자열은 통과", () => {
      expect(() => {
        validationService.validateInput("   ");
      }).not.toThrow();
    });

    test("null 검증", () => {
      expect(() => {
        validationService.validateInput(null);
      }).toThrow("[ERROR] 입력값이 없습니다.");
    });

    test("undefined 검증", () => {
      expect(() => {
        validationService.validateInput(undefined);
      }).toThrow("[ERROR] 입력값이 없습니다.");
    });

    test("유효한 입력은 통과", () => {
      expect(() => {
        validationService.validateInput("1,2,3");
      }).not.toThrow();
    });
  });

  describe("validateNumbers", () => {
    test("음수 검증", () => {
      expect(() => {
        validationService.validateNumbers([1, -2, 3]);
      }).toThrow("[ERROR] 음수는 입력할 수 없습니다.");
    });

    test("NaN 검증", () => {
      expect(() => {
        validationService.validateNumbers([1, NaN, 3]);
      }).toThrow("[ERROR] 숫자가 아닌 값이 포함되어 있습니다.");
    });

    test("유효한 숫자들은 통과", () => {
      expect(() => {
        validationService.validateNumbers([1, 2, 3]);
      }).not.toThrow();
    });

    test("0은 에러", () => {
      expect(() => {
        validationService.validateNumbers([0, 1, 2]);
      }).toThrow("[ERROR] 0은 입력할 수 없습니다.");
    });
  });

  describe("validateCustomDelimiterFormat", () => {
    test("잘못된 커스텀 구분자 형식", () => {
      expect(() => {
        validationService.validateCustomDelimiterFormat("//;1;2;3");
      }).toThrow("[ERROR] 잘못된 커스텀 구분자 형식입니다.");
    });

    test("올바른 커스텀 구분자 형식은 통과", () => {
      expect(() => {
        validationService.validateCustomDelimiterFormat("//;\n1;2;3");
      }).not.toThrow();
    });

    test("기본 구분자는 통과", () => {
      expect(() => {
        validationService.validateCustomDelimiterFormat("1,2,3");
      }).not.toThrow();
    });
  });
});
