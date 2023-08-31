import { Controller } from "@hotwired/stimulus"
import Swal from 'sweetalert2';

// Connects to data-controller="form-submit"
export default class extends Controller {
  connect() {
    console.log("connected")
  }

  popper() {
    window.Swal = Swal;
    Swal.fire(
      'Submitted!',
      'Generating your results ...',
      'success'
    )
  }
}
