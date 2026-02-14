import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
// import { FrontNavbar } from '../components/front-navbar/front-navbar';

@Component({
  selector: 'biblioteca-layout.component',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './biblioteca-layout.component.html',
})
export class BibliotecaLayoutComponent { }
