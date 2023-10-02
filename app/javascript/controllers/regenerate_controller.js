import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="regenerate"
export default class extends Controller {
  static targets = ["result"]

  select(e) {
    if(e.srcElement.localName === "div") {
      e.srcElement.classList.toggle("outline")
      e.srcElement.classList.toggle("outline-cyan-300")
      e.srcElement.classList.toggle("bg-violet-400")
      e.srcElement.classList.toggle("active")
      e.srcElement.classList.toggle("inactive")
    };
  }

  regenerateResults() {
    const results = { values: this.#getApiValues() };
    const input = { input: document.getElementById("input").innerText};
    const requestData = { results, input }
    const message = fetch('/results/regenerate_results', {
      method: "POST",
      body: JSON.stringify(requestData)
    }).then(response => {
      if(!response.ok) {
        throw new Error("Response not ok")
      }
      return response.json();
    }).then(data => {
      const active = document.getElementsByClassName("divs")
      const divs = document.getElementsByClassName("inactive")
      for (var i = 0; i < divs.length; i++) {
        divs[i].childNodes[1].innerText = data[i]
      };
    })
  }

  #getApiValues() {
    const results = document.getElementsByClassName("active")
    const apiValues = [];
    for (var i = 0; i < results.length; i++) {
      apiValues.push(results[i].innerText)
    }
    return apiValues;
  }
}
