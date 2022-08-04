import { Component, NgZone, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
declare var google:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef | any;
  public formSubmmited = false;
  public auth2: any;

  public loginForm = this.fb.group({

    email: [localStorage.getItem('email')|| '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recordarme: [false]

  } );

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }



  ngOnInit(): void {
   //this.renderButton();
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '528107972060-56320ejf6jl32r49abdidcitlqnsgf1r.apps.googleusercontent.com',
      callback: (response:any)=> this.handleCredentialResponse(response)
  });

  google.accounts.id.renderButton(
      document.getElementById("buttonDiv"), {
        //this.googleBtn.nativeElement, {
          theme: "outline",
          size: "large"
      } // customization attributes
  );
  }

  handleCredentialResponse(response:any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
    .subscribe(resp => {
      this.router.navigateByUrl('/');
    })
  }


  login(){

    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
      if(this.loginForm.get('recordarme')?.value){
        localStorage.setItem('email', this.loginForm.get('email')?.value );
      }else {
        localStorage.removeItem('email');
      }

       //Navegar al Dashboard
       this.router.navigateByUrl('/');

    }, (err)=> {
      Swal.fire('Error', err.error.msg, 'error');

    });

  }




  // renderButton() {
  //   gapi.signin2.render('my-signin2', {
  //     'scope': 'profile email',
  //     'width': 240,
  //     'height': 50,
  //     'longtitle': true,
  //     'theme': 'dark',

  //   });
  //   this.startApp();
  // }

  // async startApp() {

  //   await this.usuarioService.googleInit();
  //   this.auth2 = this.usuarioService.auth2;
  //   this.attachSignin(document.getElementById('my-signin2'));

  // };

  // attachSignin(element:any) {

  //   this.auth2.attachClickHandler(element, {},
  //       (googleUser:any)=> {
  //         const id_token = googleUser.getAuthResponse().id_token;
  //         //console.log(id_token);
  //         this.usuarioService.loginGoogle(id_token).subscribe(resp => {

  //                     //Navegar al Dashboard
  //                     this.ngZone.run(()=>{
  //                       this.router.navigateByUrl('/');
  //                     })
  //         });

  //       }, (error:any)=> {
  //         alert(JSON.stringify(error, undefined, 2));
  //       });
  // }
}
