import { Component, ViewChild} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import{ NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule,RouterModule,NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
