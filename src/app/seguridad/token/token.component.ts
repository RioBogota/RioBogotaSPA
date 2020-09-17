import { AppService } from './../../services/app.service';
import { PrincipalService } from "src/app/services/principal/principal.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-token",
  templateUrl: "./token.component.html",
  styleUrls: ["./token.component.css"],
})
export class TokenComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private principalService: PrincipalService,
    private notification: AppService
  ) {
    this.route.queryParams.subscribe(params => {
      if(params.code) {
        this.principalService.refrescarToken(params.code).subscribe(result => {
          this.notification.success('Token generado exitosamente')
        }, error => {
          this.notification.error('Se genero un error al generar el token');
        })
      }
    })
  }

  ngOnInit() {}
}
