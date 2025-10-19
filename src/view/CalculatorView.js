import { MissionUtils } from "@woowacourse/mission-utils";

class CalculatorView {
  async getInput() {
    return await MissionUtils.Console.readLineAsync();
  }

  printMessage(message) {
    MissionUtils.Console.print(message);
  }

  printResult(result) {
    MissionUtils.Console.print(`결과 : ${result}`);
  }

  printError(errorMessage) {
    MissionUtils.Console.print(errorMessage);
  }
}

export default CalculatorView;
