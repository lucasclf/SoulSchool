import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlunosService } from '../alunos/alunos.service';
import { Student } from '../shared/studentModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public studentEnrollment: string
  public studentPassword: string
  public students: Student[] = null
  private unsubscribe$: Subject<any> = new Subject()
  public mode: string = "login"
  public dataStudent: Student

  constructor(private studentService: AlunosService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.studentService.get().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((studs) => this.students = studs)
  }

  logarStudent() {
    this.dataStudent = this.students.find(data => data.enrollment == this.studentEnrollment)
    if(!this.dataStudent){
      this.notify('Usuário não cadastrado')
      this.studentEnrollment='';
      this.studentPassword = '';
    }
    else if (this.dataStudent.password == this.studentPassword) {
      this.changeMode()
      this.studentEnrollment='';
      this.studentPassword = '';
    } else {
      this.notify('Senha inválida')
      this.studentPassword = ''
    }
  }

  notify(msg: string) {
    this.snackbar.open(msg, 'OK', { duration: 3000 })
  }

  changeMode(){
    if(this.mode == 'user'){
      this.mode = 'login'
    }else{
      this.mode = 'user'
    }

  }

}


