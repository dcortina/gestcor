
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { Producto } from '../modelos/producto';




class ProductosDataSource extends DataSource<Producto> {
  private _dataStream = new ReplaySubject<Producto[]>();

  constructor(initialData: Producto[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Producto[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Producto[]) {
    this._dataStream.next(data);
  }
}
