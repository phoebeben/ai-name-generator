import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="button-click"
export default class extends Controller {
  static targets = ["submit", "input"]

  connect() {
    console.dir(this.inputTarget.innerText)
  }

  button() {
    console.dir(this.inputTarget.value)
  }
}
