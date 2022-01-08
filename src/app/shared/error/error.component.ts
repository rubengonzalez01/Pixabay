import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  texto = '';
  mostrar = false;
  subscription: Subscription;

  constructor(private _imagenService: ImagenService) { 
    this.subscription = this._imagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.texto = data;
    });
  }

  ngOnInit(): void {
  }

  mostrarMensaje(){
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
