import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  subscription: Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagenesPorPagina = 30;
  paginaActual = 1;
  calcularTotalPaginas = 0;

  constructor(private _imagenService: ImagenService) {
    this.subscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.listImagenes = [];
      this.paginaActual = 1;
      this.loading = true;
      this.termino = data;
      this.obtenerImagenes();
    })
   }

  ngOnInit(): void {
  }

  obtenerImagenes(){
   
    this._imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(data => {
      this.loading = false;

      if(data.hits.length === 0){
        this._imagenService.setError('Opss... no encontramos ningun resultado');
        return;
      }  
    this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);      
      
      this.listImagenes = data.hits;

    }, error => {
      this.loading = false;
      this._imagenService.setError('Opss... ocurrio un error inesperado');
    });

  }

  paginaAnterior(){
    this.paginaActual --;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaPosterior(){
    this.paginaActual ++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass(){
    return this.paginaActual === 1 ? false : true;
  }

  paginaPosteriorClass(){
    return this.paginaActual === this.calcularTotalPaginas ? false : true;
  }


  /**********************************************************************************************
  
                                  13/09/2021 DÍA 256 DEL AÑO
                                ¡¡¡ FELIZ DÍA DEL PROGRAMADOR !!!
  
  ***********************************************************************************************/

  isProggramersDay(): boolean{
    const PROGRAMMERS_DAY = Math.pow(2,8);
    const FIRST_DAY_OF_YEAR = new Date('01/01/2021');
    const TODAY = new Date();
    const MILISECONDS_X_DAY = 1000 * 60 * 60 * 24;

    const DAYS = Math.round((TODAY.getTime() - FIRST_DAY_OF_YEAR.getTime()) / MILISECONDS_X_DAY); 

    if(DAYS === PROGRAMMERS_DAY){
      alert("FELIZ DÍA DEL PROGRAMADOR!!!");
      return true;
    }
    return false;
  }

}
