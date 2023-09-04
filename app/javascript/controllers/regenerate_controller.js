import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="regenerate"
export default class extends Controller {
  static targets = ["result"]
  connect() {
    console.log("connected")
  }

  select(e) {
    console.dir(e.srcElement.innerText)
    console.dir(e.srcElement)
    if(e.srcElement.localName === "div") {
      e.srcElement.classList.toggle("outline")
      e.srcElement.classList.toggle("outline-cyan-300")
      e.srcElement.classList.toggle("bg-violet-400")
      e.srcElement.classList.toggle("active")
    };
  }

  regenerateResults() {
    console.log("connected")
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
      console.log(data)
      const paras = document.getElementsByClassName("results")
      const divs = document.getElementsByClassName("divs")
      for (var i = 0; i < paras.length; i++) {
        paras[i].innerText = data[i]
      }
      for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove("outline")
        divs[i].classList.remove("bg-violet-400")
        divs[i].classList.remove("outline-cyan-300")
      }
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
