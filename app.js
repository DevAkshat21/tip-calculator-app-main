document.addEventListener("DOMContentLoaded", function () {
  const bill = document.getElementById("bill");
  const tipButtons = document.querySelectorAll("button.tip-button"); // only tip buttons
  const people = document.getElementById("people");
  const tipAmount = document.getElementById("tip-amount");
  const total = document.getElementById("total-amount");
  const reset = document.getElementById("reset");
  const customInput = document.getElementById("custom");

  let currentTip = 0;

  // Highlight selected tip button

  tipButtons.forEach((element) => {
    element.addEventListener("click", function () {
      tipButtons.forEach((b) => b.classList.remove("active"));
      element.classList.add("active");
      currentTip = parseFloat(element.dataset.tip);
      customInput.value = ""; // clear custom input if any
      calculate();
    });
  });

  // Custom tip input
  customInput.addEventListener("input", function () {
    tipButtons.forEach((b) => b.classList.remove("active"));
    currentTip = parseFloat(customInput.value) || 0;
    calculate();
  });

  // Live calculation on input change
  bill.addEventListener("input", calculate);
  people.addEventListener("input", calculate);

  // Reset button
  reset.addEventListener("click", function () {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    bill.value = "";
    people.value = "";
    customInput.value = "";
    tipAmount.textContent = "$0.00";
    total.textContent = "$0.00";
    currentTip = 0;
  });

  // Calculate Function
  function calculate() {
    const billValue = parseFloat(bill.value);
    const peopleValue = parseInt(people.value);

    if (billValue > 0 && peopleValue > 0) {
      const tipTotal = (billValue * currentTip) / 100;
      const tipPerPerson = tipTotal / peopleValue;
      const totalPerPerson = (billValue + tipTotal) / peopleValue;

      tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
      total.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
      tipAmount.textContent = "$0.00";
      total.textContent = "$0.00";
    }
  }
});
