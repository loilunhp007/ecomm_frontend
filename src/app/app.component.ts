import { Component } from '@angular/core';
import { faCoffee,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clothing-store';
  faCoffee = faCoffee;
  faTrash=faTrash;
  faEdit = faEdit;
}
