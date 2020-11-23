import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { BasicFunctionsService, PointsDetailsInterface } from 'src/app/services/basic-functions.service';

interface points {
  [key: string]: PointsDetailsInterface;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  balance: string;
  profileDetails: any = {};
  userExtraDetails = [];
  profileDetailsKeys = [];
  TaskList: points = {};
  private SubScri: Subscription;
  private swal: typeof Swal = Swal;
  constructor(private basicFunction: BasicFunctionsService) {
    this.init();
  }
  async init() {
    const profile = await this.basicFunction.getUserDetails();
    const g = Object.assign({}, profile);
    this.userExtraDetails = g.extra;
    this.profileDetails = g;
    this.profileDetailsKeys = Object.keys(this.profileDetails);
    if (this.profileDetailsKeys.indexOf('Name') > -1) {
      this.profileDetailsKeys.splice(
        this.profileDetailsKeys.indexOf('Name'),
        1
      );
    }
    if (this.profileDetailsKeys.indexOf('extra') > -1) {
      this.profileDetailsKeys.splice(
        this.profileDetailsKeys.indexOf('extra'),
        1
      );
    }
    this.TaskList = {};
    let tempPoints = [];
    if (this.basicFunction.PointsDetails.length === 0) {
      tempPoints = await this.basicFunction.getpointsbasicDetails();
    } else {
      tempPoints = this.basicFunction.PointsDetails;
    }
    tempPoints.forEach((i) => {
      this.TaskList[i.id] = i;
    });
  }

}
