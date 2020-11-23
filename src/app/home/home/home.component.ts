import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';




import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  balance: string;

  private SubScri: Subscription;
  private swal: typeof Swal = Swal;
  constructor(



  ) {

  }

}
