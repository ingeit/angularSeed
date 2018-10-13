import { Component, OnInit } from '@angular/core';
import { EstablecimientosService } from '../establecimientos.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-establecimiento-lista',
  templateUrl: './establecimiento-lista.component.html',
  styleUrls: ['./establecimiento-lista.component.css']
})
export class EstablecimientoListaComponent {
  sortName = null;
  sortValue = null;
  establecimientos: any;
  displayData: any;

  searchTermEstablecimiento: any;

  // MODAL
  modal: boolean;
  establecimiento: any;
  tituloModal: string;

  constructor(
    private establecimientoSrv: EstablecimientosService,
    private message: NzMessageService
  ) {
    this.listarEstablecimientos();
  }

  listarEstablecimientos() {
    this.establecimientoSrv.listar()
      .then(res => {
        console.log('TCL: EstablecimientoListaComponent -> listarEstablecimientos -> res', res);
        this.establecimientos = res.respuesta;
        this.establecimientos.map(item => {
          item.textoBusqueda = `${item.cue} ${item.nombre}`
        })
        this.displayData = [...this.establecimientos];
      })
      .catch(err => {
        console.log('TCL: EstablecimientoListaComponent -> listarEstablecimientos -> err', err);

      })
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (true);
    const data = this.establecimientos.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[this.sortName] > b[this.sortName] ? 1 : -1) : (b[this.sortName] > a[this.sortName] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  filtrarEstablecimientos() {
    if (this.establecimientos != null) {
      if (this.displayData == null) {
        this.listarEstablecimientos();
      }
      if (this.searchTermEstablecimiento.length > 0) {
        this.displayData = this.establecimientos.filter((item) => {
          return item.textoBusqueda.toLowerCase().indexOf(this.searchTermEstablecimiento.toLowerCase()) > -1;
        });
      } else {
        this.displayData = this.establecimientos.filter((item) => {
          return item.nombre.toLowerCase().indexOf('') > -1;
        });
      }
    }
  }

  deshabilitar(establecimiento) {
    this.establecimientoSrv.deshabilitar(establecimiento.idEstablecimientoEducativo)
      .then(res => {
        establecimiento.estado = 'B';
        this.message.success('Establecimiento deshabilitado correctamente', { nzDuration: 3500 })

      })
      .catch(err => {
        if (err.status >= 500) {
          this.message.error('Problemas de conexion con el servidor. Intente nuevamente mas tarde', { nzDuration: 5000 })
        } else {
          this.message.warning(err.error, { nzDuration: 5000 })
        }
      })
  }

  habilitar(establecimiento) {
    this.establecimientoSrv.habilitar(establecimiento.idEstablecimientoEducativo)
      .then(res => {
        establecimiento.estado = 'A';
        this.message.success('Establecimiento habilitado correctamente', { nzDuration: 3500 })

      })
      .catch(err => {
        if (err.status >= 500) {
          this.message.error('Problemas de conexion con el servidor. Intente nuevamente mas tarde', { nzDuration: 5000 })
        } else {
          this.message.warning(err.error, { nzDuration: 5000 })
        }
      })
  }

  // MODAL EDITAR CREAR
  crear() {
    this.tituloModal = 'Nuevo establecimiento';
    this.establecimiento = null;
    this.modal = true;
  }
  
  editar(establecimiento) {
    this.tituloModal = 'Editar establecimiento';
    this.establecimiento = establecimiento;
    this.modal = true;
  }
  
  cerrarModal(){
    this.establecimiento = null;
    this.modal = false;
  }

  modalEvent(evento) {
    // if (evento.fin) {
    //   if (evento.modificado) {
    //     this.personasListar();
    //     this.showMessage('success', 'Persona creada con exito');
    //   } else {
    //     this.showMessage('info', 'No se detectaron cambios');
    //   }
    //   this.cerrarModal();
    // }
  }



}
