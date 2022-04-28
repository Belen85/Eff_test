"use strict";

console.log("js works");

const oppoStatus = [
  {
    K_OPPO_STATUS: 1,
    STATUS: "1. Initial Contact",
    SUCCESS: 0,
  },
  {
    K_OPPO_STATUS: 2,
    STATUS: "2. Demonstration",
    SUCCESS: 25,
  },
  {
    K_OPPO_STATUS: 3,
    STATUS: "3. Proposal",
    SUCCESS: 50,
  },
  {
    K_OPPO_STATUS: 4,
    STATUS: "4. Negotiation",
    SUCCESS: 75,
  },
  {
    K_OPPO_STATUS: 5,
    STATUS: "5. Order",
    SUCCESS: 100,
  },
];

const Module = class {
  constructor() {}
  start() {
    ///////////////////////////////////////////////////
    //Page dynamics
    ///////////////////////////////////////////////////

    //1.Check oppoStatus object in the console
    console.log(oppoStatus);

    //2.Select elements from the DOM
    const select = document.querySelector("select");
    const input = document.querySelector("input");
    const form = document.querySelector("form");
    const btn = document.querySelector("button");
    const output = document.querySelector(".output");
    console.log(select, input, form, btn, output);

    //2.Load the <select> options with the contents of the global oppoStatus array.
    oppoStatus.forEach((el) => {
      const { K_OPPO_STATUS, STATUS, SUCCESS } = el;
      console.log(K_OPPO_STATUS, STATUS, SUCCESS);
      let string = `<option value=${K_OPPO_STATUS}>${STATUS}</option>`;
      select.insertAdjacentHTML("afterbegin", string);
    });

    //3.When status is changed, set the associated value of success (e.g. status 4 sets success=75)
    const handleChange = (e) => {
      e.preventDefault();
      console.log("change");
      const option = select.options[select.selectedIndex].value;
      console.log(typeof option, option);
      const associatedValueSuccess = oppoStatus.find((el) => {
        return el.K_OPPO_STATUS === Number(option);
      }).SUCCESS;
      console.log(associatedValueSuccess);
      input.value = `${associatedValueSuccess}`;
    };

    select.addEventListener("change", handleChange);

    //4. On form submit, output the form element values as JSON string. We want to see the values, not the text. {"status":3,"success":50}
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
      const stringJson = {};
      const option = select.options[select.selectedIndex].value;
      const associatedValueSuccess = oppoStatus.find((el) => {
        return el.K_OPPO_STATUS === Number(option);
      }).SUCCESS;
      // console.log(option, associatedValueSuccess);
      stringJson["status"] = Number(option);
      stringJson["success"] = Number(associatedValueSuccess);
      console.log(stringJson);
      output.textContent = JSON.stringify(stringJson);
    };

    form.addEventListener("submit", handleSubmit);

    ///////////////////////////////////////////////////
    //Basic styling
    ///////////////////////////////////////////////////
    //1.Right align the success value
    input.style.textAlign = "center";

    //2.Display the Submit button in it's own box. Add some spacing around the element.
    const divButton = document.createElement("div");
    input.after(divButton);
    divButton.prepend(btn);
    btn.style.margin = "5px";

    //3. Set a mono-space font on the output <div> so we have a better view on the generated JSON output.
    output.style.fontFamily = "monospace";
  }
};

const main = new Module();
main.start();
