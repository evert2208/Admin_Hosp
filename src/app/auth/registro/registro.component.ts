import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: [ './registro.component.css'
  ]
})
export class RegistroComponent {

  public formSubmmited = false;

  public registreForm = this.fb.group({
    nombre: ['hola', Validators.required],
    email: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],
  },{
    validators: this.passwordsIguales('password', 'password2')
  } );

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  crearUsuario() {
    this.formSubmmited=true;
    //console.log(this.registreForm.value);

    if(this.registreForm.invalid) {
     return;
    }

    //realizar creacion de usuario
    this.usuarioService.crearUsuario(this.registreForm.value).subscribe(resp=> {
       //Navegar al Dashboard
       this.router.navigateByUrl('/');
    }, (err)=> {
      // si sucede un error
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  campoNoValido(campo: string): boolean{

    if (this.registreForm.get(campo)?.invalid && this.formSubmmited) {
      return true;
    }else {
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.registreForm.get('password')?.value;
    const pass2 = this.registreForm.get('password2')?.value;
    if ((pass1 !== pass2) && this.formSubmmited) {
      return true;
    }else {
      return false;
    }
  }

  aceptarTerminos(){
    return !this.registreForm.get('terminos')?.value && this.formSubmmited;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup)=> {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value===pass2Control?.value) {
        pass2Control?.setErrors(null);
      }else {
        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }

}
