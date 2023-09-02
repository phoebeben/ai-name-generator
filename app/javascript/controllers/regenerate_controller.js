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
    const results = this.#getApiValues();
    const message = fetch('/results/regenerate_results', {
      method: "POST",
      body: JSON.stringify(results)
    }).then(response => {
      if(!response.ok) {
        throw new Error("Response not ok")
      }
      return response.json();
    }).then(data => {
      console.log(data)
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
