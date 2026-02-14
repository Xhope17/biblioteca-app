import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BibliotecaLayoutComponent } from "./layouts/biblioteca-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BibliotecaLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblioteca-app';
}
