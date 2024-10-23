import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private router: Router) { }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
