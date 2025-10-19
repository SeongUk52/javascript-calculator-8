class StringParserService {
  static BASIC_DELIMITER_PATTERN = /[,:]/;

  constructor(validationService) {
    this.validationService = validationService;
  }

  parseNumbers(input) {
    this.validationService.validateInput(input);
    
    if (input.trim() === "") {
      return [0];
    }
    
    this.validationService.validateCustomDelimiterFormat(input);
    this.validationService.validateDelimiters(input);
    
    if (input.startsWith("//")) {
      return this.parseWithCustomDelimiter(input);
    }
    
    const numbers = input.split(StringParserService.BASIC_DELIMITER_PATTERN);
    const parsedNumbers = this.convertToNumbers(numbers);
    this.validationService.validateNumbers(parsedNumbers);
    
    return parsedNumbers;
  }

  parseWithCustomDelimiter(input) {
    const { delimiterLine, numbersLine } = this.validationService.parseCustomDelimiterInput(input);
    
    if (delimiterLine.length > 1) {
      return this.parseWithMultipleCustomDelimiters(delimiterLine, numbersLine);
    }
    
    return this.parseWithSingleCustomDelimiter(delimiterLine, numbersLine);
  }

  parseWithSingleCustomDelimiter(delimiter, numbersLine) {
    const customNumbers = numbersLine.split(delimiter);
    const allNumbers = [];
    
    for (const part of customNumbers) {
      allNumbers.push(...part.split(StringParserService.BASIC_DELIMITER_PATTERN));
    }
    
    return this.convertToNumbers(allNumbers);
  }

  parseWithMultipleCustomDelimiters(delimiterLine, numbersLine) {
    const delimiters = delimiterLine.split('');
    let numbers = [numbersLine];
    
    for (const delimiter of delimiters) {
      const newNumbers = [];
      for (const number of numbers) {
        newNumbers.push(...number.split(delimiter));
      }
      numbers = newNumbers;
    }
    
    const allNumbers = [];
    for (const number of numbers) {
      allNumbers.push(...number.split(StringParserService.BASIC_DELIMITER_PATTERN));
    }
    
    return this.convertToNumbers(allNumbers);
  }

  convertToNumbers(numberStrings) {
    return numberStrings.map(str => Number.parseInt(str.trim()));
  }
}

export default StringParserService;
