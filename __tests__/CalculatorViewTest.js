import CalculatorView from "../src/view/CalculatorView.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("CalculatorView", () => {
  test("입력 받기 테스트", async () => {
    const inputs = ["1,2,3"];
    mockQuestions(inputs);

    const view = new CalculatorView();
    const result = await view.getInput();

    expect(result).toBe("1,2,3");
  });

  test("메시지 출력 테스트", () => {
    const logSpy = getLogSpy();
    const view = new CalculatorView();

    view.printMessage("덧셈할 문자열을 입력해 주세요.");

    expect(logSpy).toHaveBeenCalledWith("덧셈할 문자열을 입력해 주세요.");
  });

  test("결과 출력 테스트", () => {
    const logSpy = getLogSpy();
    const view = new CalculatorView();

    view.printResult(6);

    expect(logSpy).toHaveBeenCalledWith("결과 : 6");
  });

  test("에러 메시지 출력 테스트", () => {
    const logSpy = getLogSpy();
    const view = new CalculatorView();

    view.printError("[ERROR] 음수는 입력할 수 없습니다.");

    expect(logSpy).toHaveBeenCalledWith("[ERROR] 음수는 입력할 수 없습니다.");
  });
});
