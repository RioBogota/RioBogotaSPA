import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends Base implements OnInit {
  public roles: Array<any>;
  constructor(private seguridadService: TokenInterceptorService) { 
    super();
  }

  ngOnInit() {
    this.unsubscribeOndestroy(this.seguridadService.getRoles().subscribe((result) => {
      this.roles = result;
    }, (error) => {
      console.error(error);
    }));
  }

}
