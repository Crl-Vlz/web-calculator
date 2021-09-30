var dict = {};

//Dictionary with values of theme 1, default theme

var root = document.querySelector(":root");
var styles = getComputedStyle(root);

var x = "";
var y = "";
var oper = "";
var dotted = false;

var inOp = false;

var showAd = false;

function setStyles1() {
  dict["--main-bg"] = "hsl(222, 26%, 31%)";
  dict["--toggle-bg"] = "hsl(223, 31%, 20%)";
  dict["--keypad-bg"] = "hsl(223, 31%, 20%)";
  dict["--screen-bg"] = "hsl(224, 36%, 15%)";
  dict["--key-sec-bg"] = "hsl(225, 21%, 49%)";
  dict["--key-sec-shadow"] = "hsl(224, 28%, 35%)";
  dict["--key-main-bg"] = "hsl(6, 63%, 50%)";
  dict["--toggle"] = "hsl(6, 63%, 50%)";
  dict["--key-main-shadow"] = "hsl(6, 70%, 34%)";
  dict["--key-bg"] = "hsl(30, 25%, 89%)";
  dict["--key-shadow"] = "hsl(28, 16%, 65%)";
  dict["--key-text"] = "hsl(221, 14%, 31%)";
  dict["--key-sec-text"] = "hsl(0, 0%, 100%)";
  dict["--key-main-text"] = "hsl(0, 0%, 100%)";
  dict["--main-text"] = "hsl(0, 0%, 100%)";
}

function setStyles2() {
  dict["--main-bg"] = "hsl(0, 0%, 90%)";
  dict["--toggle-bg"] = "hsl(0, 5%, 81%)";
  dict["--keypad-bg"] = "hsl(0, 5%, 81%)";
  dict["--screen-bg"] = "hsl(0, 0%, 93%)";
  dict["--key-sec-bg"] = "hsl(185, 42%, 37%)";
  dict["--key-sec-shadow"] = "hsl(185, 58%, 25%)";
  dict["--key-main-bg"] = "hsl(25, 98%, 40%)";
  dict["--toggle"] = "hsl(25, 98%, 40%)";
  dict["--key-main-shadow"] = "hsl(25, 99%, 27%)";
  dict["--key-bg"] = "hsl(45, 7%, 89%)";
  dict["--key-shadow"] = "hsl(35, 11%, 61%)";
  dict["--key-text"] = "hsl(60, 10%, 19%)";
  dict["--key-sec-text"] = "hsl(0, 0%, 100%)";
  dict["--key-main-text"] = "hsl(0, 0%, 100%)";
  dict["--main-text"] = "hsl(60, 10%, 19%)";
}

function setStyles3() {
  dict["--main-bg"] = "hsl(268, 75%, 9%)";
  dict["--toggle-bg"] = "hsl(268, 71%, 12%)";
  dict["--keypad-bg"] = "hsl(268, 71%, 12%)";
  dict["--screen-bg"] = "hsl(268, 71%, 12%)";
  dict["--key-sec-bg"] = "hsl(281, 89%, 26%)";
  dict["--key-sec-shadow"] = "hsl(285, 91%, 52%)";
  dict["--key-main-bg"] = "hsl(176, 100%, 44%)";
  dict["--toggle"] = "hsl(176, 100%, 44%)";
  dict["--key-main-shadow"] = "hsl(177, 92%, 70%)";
  dict["--key-bg"] = " hsl(268, 47%, 21%)";
  dict["--key-shadow"] = "hsl(290, 70%, 36%)";
  dict["--key-text"] = "hsl(52, 100%, 62%)";
  dict["--key-sec-text"] = "hsl(0, 0%, 100%)";
  dict["--key-main-text"] = "hsl(198, 20%, 13%)";
  dict["--main-text"] = "hsl(52, 100%, 62%)";
}

function updateStyles() {
  for (var i in dict) {
    root.style.setProperty(i, dict[i]);
  }
}

function changeStyles() {
  if (rangeInput.value === "0") {
    setStyles1();
  } else if (rangeInput.value === "1") {
    setStyles2();
  } else if (rangeInput.value === "2") {
    setStyles3();
  }
  updateStyles();
}

var rangeInput = document.getElementById("slider");

$("#slider").change(() => {
  $("#slider").attr("value", rangeInput.value);
  changeStyles();
  //window.location.reload(false);
});

function operateBasic(x, y, operand) {
  if (operand === "+") {
    return x + y;
  } else if (operand === "-") {
    return x - y;
  } else if (operand === "x") {
    return x * y;
  } else if (operand === "/") {
    return x / y;
  } else if (operand === "x**y") {
    return x ** y;
  }
}

function checkIfOperand(operand) {
  if (operand === "+") {
    oper = "+";
    return true;
  } else if (operand === "-") {
    oper = "-";
    return true;
  } else if (operand === "x") {
    oper = "x";
    return true;
  } else if (operand === "/") {
    oper = "/";
    return true;
  } else if (operand === "=") {
    return true;
  } else if (operand === "x**y") {
    oper = "x**y";
    return true;
  }
  return false;
}

function checkIfFun(operand) {
  if (operand === "DEL") {
    return true;
  } else if (operand === "RESET") {
    return true;
  }
  return false;
}

function convertToID(key) {
  switch (key) {
    case "1":
      return "one";
    case "2":
      return "two";
    case "3":
      return "three";
    case "4":
      return "four";
    case "5":
      return "five";
    case "6":
      return "six";
    case "7":
      return "seven";
    case "8":
      return "eight";
    case "9":
      return "nine";
    case "0":
      return "zero";
    case ".":
      return "dot";
    case "+":
      return "sum";
    case "-":
      return "min";
    case "/":
      return "d";
    case "=":
      return "Eq";
    case "RESET":
      return "RES";
    default:
      return key;
  }
}

function operate(key) {
  var ident = convertToID(key);
  if (ident === "RESET") ident = "RES";
  var cl = "pressedCalc";
  if (ident === "Eq") cl = "pressedEq";
  if (ident === "DEL" || ident === "RES") cl = "pressedSec";
  document.getElementById(ident).classList.add(cl);
  setTimeout(() => {
    document.getElementById(ident).classList.remove(cl);
  }, 200);
  var isOperand = checkIfOperand(key);
  if (checkIfFun(key)) {
    if (key === "RESET") {
      x = "";
      y = "";
      $(".result").text("0");
      inOp = false;
    } else {
      if (inOp) {
        y = "";
        $(".result").text("0");
      } else {
        x = "";
        $(".result").text("0");
      }
    }
  } else {
    if (!dotted || key !== ".") {
      if (!isOperand && !inOp) {
        if (key === "0" && $(".result").text()==="0") {
          $(".result").text("0");
        } else {
          if (x.length < 14) x += key;
          $(".result").text(x);
        }
      } else if (!isOperand && inOp) {
        if (key === "0" && $(".result").text()==="0") {
          $(".result").text("0");
        } else {
          if (y.length < 14) y += key;
          $(".result").text(y);
        }
      } else if (isOperand && !inOp) {
        if (key !== "=") {
          $(".result").text("0");
          inOp = true;
        } else {
          if (x.length >= 1) $(".result").text(x);
          else $(".result").text("0");
          x = "";
        }
        dotted = false;
      } else if (isOperand && inOp) {
        x = String(operateBasic(Number(x), Number(y), oper)).substring(0, 14);
        y = "";
        $(".result").text(x);
        if (key === "=") {
          x = "";
          inOp = false;
        }
        dotted = false;
      }
      if (key === ".") dotted = true;
    }
  }
}

function advancedOperation(x, key) {
  switch (key) {
    case "sin":
      return Math.sin(x);
    case "cos":
      return Math.cos(x);
    case "tan":
      return Math.tan(x);
    case "x**2":
      return x ** 2;
    case "sqrt":
      return Math.sqrt(x);
  }
}

function operateAv(key) {
  document.getElementById(key).classList.add("pressedCalc");
  setTimeout(() => {
    document.getElementById(key).classList.remove("pressedCalc");
  }, 200);
  if (!inOp) {
    x = String(advancedOperation(Number(x), key)).substring(0, 14);
    $(".result").text(x);
  } else {
    y = String(advancedOperation(Number(y), key)).substring(0, 14);
    $(".result").text(y);
  }
}

document.querySelectorAll(".btn-calc").forEach((element) => {
  element.addEventListener("click", () => {
    var key = element.textContent;
    operate(key);
  });
});

document.querySelectorAll(".btn-ad-calc").forEach((element) => {
  element.addEventListener("click", () => {
    var key = element.textContent;
    if (key === "x**y") operate(key);
    else operateAv(key);
  });
});

document.querySelectorAll(".btn-show").forEach((element) => {
  element.addEventListener("click", () => {
    if (showAd) {
      document.querySelector("#av-Keys").classList.add("hidden");
      $("#show").text("Show");
      showAd = false;
    } else {
      document.querySelector("#av-Keys").classList.remove("hidden");
      $("#show").text("Hide");
      showAd = true;
    }
  });
});

function validateKeypress(key) {
  switch (key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case "+":
    case "-":
    case "/":
    case "*":
    case "c":
    case "d":
    case "e":
    case "\n":
    case ".":
      return true;
    default:
      return false;
  }
}

$(document).keydown((event) => {
  if (validateKeypress(event.key)) {
    var ky = event.key;
    if (ky === "\n" || ky === "e") ky = "=";
    if (ky === "*") ky = "x";
    if (ky === "d") ky = "DEL";
    if (ky === "c") ky = "RESET";
    operate(ky);
  }
});
