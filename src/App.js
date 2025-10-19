import CalculatorView from "./view/CalculatorView.js";
import CalculatorService from "./service/CalculatorService.js";
import StringParserService from "./service/StringParserService.js";
import ValidationService from "./service/ValidationService.js";

class App {
  constructor() {
    this.view = new CalculatorView();
    this.validationService = new ValidationService();
    this.parserService = new StringParserService(this.validationService);
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
      throw error; // 에러를 다시 throw하여 테스트에서 catch할 수 있도록
    }
  }
}

export default App;
