import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng-lts/api';
import { ApiService } from './services/api.service';
import { TaskEntityService } from './store/task-entity.service';
import { UserEntityService } from './store/user-entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mini-task-mgr-devza';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
