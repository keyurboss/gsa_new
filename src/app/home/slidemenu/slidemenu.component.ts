import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

interface MenuItem {
  title: string;
  url: string;
  ref?: boolean;
}
@Component({
  selector: 'app-slidemenu',
  templateUrl: './slidemenu.component.html',
  styleUrls: ['./slidemenu.component.scss'],
})
export class SlidemenuComponent implements OnInit {
  public appPages: MenuItem[] = [
    {
      title: 'My Wallet',
      url: '/wallet',
    },
    {
      title: 'Ride History',
      url: '/ride_history',
    },
    {
      title: 'How to Ride',
      url: '/howto',
      ref: true,
    },
    {
      title: 'Help',
      url: '/wallet',
    },
    {
      title: 'Logout',
      url: '/wallet',
    },
  ];
  public bottomPages: MenuItem[] = [
    {
      title: 'Support',
      url: '/support',
    },
    {
      title: 'Terms & services',
      url: '/terms',
    },
    {
      title: 'Privacy Policy',
      url: '/privacy',
    },
    {
      title: 'Vehicle Usage Agreement',
      url: '/agreement',
    },
  ];
  userName = 'Rider';
  time = 'Evening';
  constructor(private menu: MenuController, private route: Router) {
  
    const temp = new Date();
    if (temp.getHours() > 4 && temp.getHours() < 12) {
      this.time = 'Morning';
    } else if (temp.getHours() < 16) {
      this.time = 'Afternoon';
    } else {
      this.time = 'Evening';
    }

  }

  ngOnInit() { }
  logout() { }
  profileClick() {
    this.route.navigateByUrl('profile');
    this.menu.close();
  }
  itemClick(i: MenuItem) {
    const params: any = {};
    if (i.ref) {
      params.ref = this.route.url.split('?')[0];
    }
    this.route.navigate([i.url], {
      queryParams: params,
    });
  }
}
