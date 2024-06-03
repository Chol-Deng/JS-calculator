function calculator(input) {

  // convert Roman numerals to Arabic numerals
  function romanToArabic(roman) {
    const romanNumeralMap = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        //'D': 500,
        //'M': 1000
    };

    let arabic = 0;
    let prevValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
        const currentValue = romanNumeralMap[roman[i]];

        if (currentValue < prevValue) {
            arabic -= currentValue;
        } else {
            arabic += currentValue;
        }

        prevValue = currentValue;
    }

    return arabic;
  }

  // convert Arabic numerals to Roman numerals
  function arabicToRoman(arabic) {
    const romanNumeralMap = [
      /* I commented out these lines because the result of max input of (10 * 10) or (X * X) does not exceed 100
      { arabic_num: 1000, roman_num: "M" },
      { arabic_num: 900, roman_num: "CM" },
      { arabic_num: 500, roman_num: "D" },
      { arabic_num: 400, roman_num: "CD" },
      */
      { arabic_num: 100, roman_num: "C" },
      { arabic_num: 90, roman_num: "XC" },
      { arabic_num: 50, roman_num: "L" },
      { arabic_num: 40, roman_num: "XL" },
      { arabic_num: 10, roman_num: "X" },
      { arabic_num: 9, roman_num: "IX" },
      { arabic_num: 5, roman_num: "V" },
      { arabic_num: 4, roman_num: "IV" },
      { arabic_num: 1, roman_num: "I" }
    ];

    let roman = "";

    for (let i = 0; i < romanNumeralMap.length; i++) {
      while (arabic >= romanNumeralMap[i].arabic_num) {
        roman += romanNumeralMap[i].roman_num;
        arabic -= romanNumeralMap[i].arabic_num;
      }
    }

    return roman;
  }

  // check if the input string is a Roman numeral
  function isRoman(numeral) {
    const romanNumeralMap = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romanNumeralMap.includes(numeral);
  }

  // check if the input string is an Arabic numeral
  function isArabic(numeral) {
    const arabicNumeralMap = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    return arabicNumeralMap.includes(numeral);
  }

  // Split input into parts
  const parts = input.split(" ");
  if (parts.length !== 3) throw new Error("Error");

  const [firstOperand, operator, secondOperand] = parts;

  // check if both operands are either Arabic or Roman numerals
  let num1, num2;
  let result;
  if (isArabic(firstOperand) && isArabic(secondOperand)) {
      num1 = parseInt(firstOperand);
      num2 = parseInt(secondOperand);
  } else if (isRoman(firstOperand) && isRoman(secondOperand)) {
      num1 = romanToArabic(firstOperand);
      num2 = romanToArabic(secondOperand);
  } else {
      throw new Error("Error");
  }

  if (num1 < 1 || num1 > 10 || num2 < 1 || num2 > 10) {
      throw new Error("Error");
  }

  // Arithmetic operations
  switch (operator) {
      case "+":
          result = num1 + num2;
          break;
      case "-":
          result = num1 - num2;
          break;
      case "*":
          result = num1 * num2;
          break;
      case "/":
          result = Math.floor(num1 / num2);
          break;
      default:
          throw new Error("Error");
  }

  // Return the result in the appropriate format
  if (isRoman(firstOperand)){
      if (result < 1) return ""; 
      return arabicToRoman(result) || "";
  } else {
      return result.toString();
  }
}

// Examples of usage:
console.log(calculator("V + V"));

