import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loader-div">
      <p-progressSpinner></p-progressSpinner>
    </div>
  `,
  styles: [
    `
      .loader-div {
        width: 90vw;
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `
  ]
})
export class LoadingComponent implements OnInit {
  // ?-------------------------------------------------------------------------
  constructor(private router: Router) {}

  // ?-------------------------------------------------------------------------
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('home');
    }, 500);
  }
}
