import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  isLoading= true;
  productos: Producto[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadProductos();
   }

  private loadProductos(){
      this.httpClient.get('https://angular-html-eb243.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) =>
      {
        this.productos = resp;
        this.isLoading = false;
      })
  }
}
