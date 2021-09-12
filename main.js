const app = () => {
  // DOM elements
  const form = document.forms[0];
  const passwordLength = document.getElementById("pass-len");
  const letters = document.getElementById("letters");
  const lettersCase = document.getElementById("letters-case");
  const lettersCaseParent = document.querySelector(".select");
  const numbers = document.getElementById("numbers");
  const symbols = document.getElementById("symbols");
  const password = document.getElementById("answer");
  const copy = document.getElementById("copy");
  const copySpan = document.querySelector("#copy span");

  // Add disabeld theme to the letter case select if the letter checkbox is not selected.
  letters.onclick = function () {
    if (!this.checked) {
      Array.from(lettersCaseParent.children).forEach((child) => {
        child.style.color = "grey";
        child.style.cursor = "no-drop";
        if (child === lettersCase) {
          child.disabled = "true";
        }
      });
    } else {
      Array.from(lettersCaseParent.children).forEach((child) => {
        child.style.color = "#212529";
        child.style.cursor = "default";
        if (child === lettersCase) {
          child.removeAttribute("disabled");
          child.style.cursor = "pointer";
        }
      });
    }
  };

  form.onsubmit = (e) => {
    e.preventDefault();

    // Empty the previous password
    password.value = "";

    // Password components
    const lettersLower = "abcdefghijklmnopqrstuvwxyz",
      lettersUpper = lettersLower.toUpperCase(),
      numsStr = "0123456789",
      symbolsStr = "!@#$%^&*()_+=?/><.,\\'\"`";

    let userSelect = "";

    if (letters.checked || numbers.checked || symbols.checked) {
      // Check if letters are checked and chose what passwords components to use in the useSelect
      if (letters.checked) {
        if (lettersCase.value.toLowerCase() === "both") {
          userSelect += lettersLower + lettersUpper;
        } else if (lettersCase.value.toLowerCase() === "lower") {
          userSelect += lettersLower;
        } else {
          userSelect += lettersUpper;
        }
      }

      // Check if numbers are checked
      if (numbers.checked) {
        userSelect += numsStr;
      }

      // Check if symbols are checked
      if (symbols.checked) {
        userSelect += symbolsStr;
      }

      let randomBoundry = userSelect.length;

      for (let i = 0; i < passwordLength.value; i++) {
        password.value += userSelect[Math.floor(Math.random() * randomBoundry)];
      }
    } else alert("You Should Choose What Your Password Should Contain");

    // Copy password to clipboard
    copy.onclick = (event) => {
      event.preventDefault();
      password.select();
      password.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(password.value);
      copySpan.textContent = "Copied to clipboard";
    };
    copy.addEventListener("mouseleave", () => {
      copySpan.textContent = "Copy to clipboard";
    });
  };
};

app();
