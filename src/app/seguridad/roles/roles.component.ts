import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  public roles: Array<any>;
  constructor(private seguridadService: TokenInterceptorService) { }

  ngOnInit() {
    this.seguridadService.getRoles().subscribe((result) => {

      this.roles = result;
    }, (error) => {
      console.error(error);
    });
  }

}
