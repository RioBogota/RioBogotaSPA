import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent extends Base implements OnInit {
  panelOpenState = false;
  public componentes: any;
  constructor(private principalService: PrincipalService) {
    super();
    this.unsubscribeOndestroy(this.principalService.getSiteMap().subscribe(result => {
      this.componentes = result;
    }));
  }

  ngOnInit() {
  }

}
