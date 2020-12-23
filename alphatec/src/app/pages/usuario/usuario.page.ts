import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService, Usuario } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  usuario: string;
  nombre: string;
  
  constructor(private us: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    this.nombre = localStorage.getItem('nombre');
  }
  salir(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('nombre');
    localStorage.removeItem('usuarioId');
    
    this.router.navigateByUrl('/login',{skipLocationChange:true});
  }

}
