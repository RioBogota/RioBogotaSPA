import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends Base implements OnInit {
  public roles: Array<any>;
  constructor(private seguridadService: TokenInterceptorService, private appService: AppService) {
    super();
  }

  ngOnInit() {
    this.unsubscribeOndestroy(this.seguridadService.getRoles().subscribe((result) => {
      let obj = this.seguridadService.groupBy(result, ['idRol']);
      this.roles = Object.values(obj);
    }, (error) => {
      this.appService.error('Se produjo un error al consultar los roles')
      console.error(error);
    }));
  }

}
