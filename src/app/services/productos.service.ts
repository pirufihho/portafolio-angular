import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  isLoading= true;
  productos: Producto[] = [];
  productosFilered: Producto[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadProductos();
   }

  private loadProductos(){

      return new Promise((resolve,reject) =>{
        this.httpClient.get('https://angular-html-eb243.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) =>
        {
          this.productos = resp;
          this.isLoading = false;
          resolve();
        })  
      });
  }

  public getProducto(id: string){
    return this.httpClient.get(`https://angular-html-eb243.firebaseio.com/productos/${id}.json`)
  }

  public searchProduct(product: string){
    //cargar productos
    if(this.productos.length===0){
      this.loadProductos().then(()=>{
        //ejecutar despues de tener los productos
        this.filterProduct(product);
      })
    }else{
      this.filterProduct(product);
    }


  }

  private filterProduct(product: string){
    this.productosFilered = [];
    product = product.toLocaleLowerCase();

    this.productos.forEach(element => {
      if(element.categoria.toLocaleLowerCase().indexOf(product) >=0 ||
       element.titulo.toLocaleLowerCase().indexOf(product) >=0){
        this.productosFilered.push(element);
      }
    });
  }
}
