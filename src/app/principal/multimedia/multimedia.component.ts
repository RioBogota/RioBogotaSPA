import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeScript, DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Base } from 'src/app/shared/base';
export interface DialogData {
  imagen: string;
}

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css']
})

export class MultimediaComponent extends Base implements OnInit {

  public id: string;
  public urlSegura: SafeScript;
  public imagenes: any[] = [{
    url: '/assets/temp/Fondo 2.jpg'
  },
  {
    url: '/assets/temp/Fondo 5.jpg'
  },
  {
    url: '/assets/temp/Fondo 6.jpg'
  },
  {
    url: '/assets/temp/Fondo 7.jpg'
  },
  {
    url: '/assets/temp/Fondo 9.jpg'
  },
  {
    url: '/assets/temp/Fondo.jpg'
  },
  {
    url: '/assets/temp/RB1.jpg'
  },
  {
    url: '/assets/temp/RB2.jpg'
  },
  {
    url: '/assets/temp/RB3.jpg'
  },
  {
    url: '/assets/temp/San_Nicolas_Soacha.jpg'
  }];
  
  
  // public video1: SafeScript = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/watch?v=iythxyxoWcg');
  public videos: SafeScript[] = [
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/iythxyxoWcg') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/B7w25QCefLY') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/e61r6w-MTeg') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/k4NgeraTV4o') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/ZmZFI6CEfcw') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/1yzf7Y7DHsU') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Cp9ex-nJqxg') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/QUShstBnST8') },
    { url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/MCJEKbBioB0') }
  ];

  constructor(private router: ActivatedRoute, private sanitizer: DomSanitizer, public dialog: MatDialog) { 
    super();
  }

  openDialog(imagen:string): void {
    const dialogRef = this.dialog.open(ImagenesModal, {
      width: '800px',
      data: {imagen:imagen}
    });
  }
  
  ngOnInit() {
    this.unsubscribeOndestroy(this.router.params.subscribe(result => {
      this.id = result.id;
    }, error => {
      console.error(error);
    }));
  }

}

@Component({
  selector: 'imagenes-modal',
  templateUrl: 'imagenes-modal.html',
})
export class ImagenesModal {
  
  constructor(
    public dialogRef: MatDialogRef<ImagenesModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
