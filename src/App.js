import CalculatorView from "./view/CalculatorView.js";
import CalculatorService from "./service/CalculatorService.js";
import StringParserService from "./service/StringParserService.js";

class App {
  constructor() {
    this.view = new CalculatorView();
    this.parserService = new StringParserService();
    this.calculatorService = new CalculatorService(this.parserService);
  }

  async run() {
    try {
      // 안내문 출력
      this.view.printMessage("덧셈할 문자열을 입력해 주세요.");
      
      // 사용자 입력 받기
      const input = await this.view.getInput();
      
      // 계산 수행
      const result = this.calculatorService.calculate(input);
      
      // 결과 출력
      this.view.printResult(result);
    } catch (error) {
      this.view.printError(error.message);
    }
  }
}

export default App;
