import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from '../navigation.service';
import {Router} from '@angular/router';
import {StoreService} from '../store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private navService: NavigationService, private router: Router, private store: StoreService) { }

  ngOnInit(): void {
  }

  navigate(way: string) {
    switch (way) {
      case 'prev':
        this.router.navigate(this.navService.getPrev());
        break;
      case 'next':
        if (this.navService.isSection()) {
          this.store.handleSectionSubmit();
        }
        if (this.navService.isJaw()) {
          this.store.handleJawSubmit();
        }
        this.router.navigate(this.navService.getNext());
        break;
      case 'skip':
        this.router.navigate(this.navService.getSkip());
        break;
    }

  }
}
