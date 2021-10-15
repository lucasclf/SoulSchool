import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  public system:string = 'initial'

  changeSystem(systemMode:String){
    if(systemMode == 'teacher'){
      this.system = 'teacher'
    }else{
      this.system = 'student'
    }

  }
}
