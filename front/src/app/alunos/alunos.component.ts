import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Student } from '../shared/studentModel';
import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  studentName: string = ''
  studentEnrollment: string = ''
  studentNote: [string, number][]  = [
    ['Quimica', 0],
    ['Português', 0],
    ['Matematica', 0]
  ]
  studentPassword: string = ''

  students: Student[] = null

  private unsubscribe$: Subject<any> = new Subject()

  constructor(private studentService: AlunosService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.studentService.get().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((studs) => this.students = studs)
  }

  save() {
    this.studentService.add({
      name: this.studentName,
      enrollment: this.studentEnrollment,
      grade: this.studentNote,
      password: this.studentPassword
    }).subscribe(
      (stud) => {
        this.notify('INSERIDO COM SUCESSO!')
      },
      (err) => {
        console.error(err)
      }
    )
  this.clearFields()
  }

  clearFields() {
    this.studentName = ''
    this.studentEnrollment = ''
    this.studentNote = [
      ['Quimica', 0],
      ['Português', 0],
      ['Matematica', 0]
    ]
    this.studentPassword = ''
  }

  cancel(){
    this.clearFields();
  }

  notify(msg: string) {
    this.snackbar.open(msg, 'OK', {duration: 3000})
  }

  ngOnDestroy(){
    this.unsubscribe$.next()
  }
}


