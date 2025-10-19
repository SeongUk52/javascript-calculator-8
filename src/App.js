import CalculatorView from "./view/CalculatorView.js";

class App {
  constructor() {
    this.view = new CalculatorView();
  }

  async run() {
    // 안내문 출력
    this.view.printMessage("덧셈할 문자열을 입력해 주세요.");
    
    // 사용자 입력 받기
    const input = await this.view.getInput();
    
    // 임시로 결과 출력 (아직 계산 로직 없음)
    this.view.printResult(0);
  }
}

export default App;
