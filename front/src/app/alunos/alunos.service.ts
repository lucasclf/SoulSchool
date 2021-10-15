import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, delay} from 'rxjs/operators'
import { Student } from '../shared/studentModel';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  
  readonly url = 'http://localhost:4242/students'

  private studentSubject$: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>(null)

  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Student[]> {
    if (!this.loaded) {
      this.http.get<Student[]>(this.url).pipe(
        tap((studs) => console.log(studs)),
        delay(1000)
      ).subscribe(this.studentSubject$)
      this.loaded = true
    }
    return this.studentSubject$.asObservable()
  }

  add(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student).pipe(
      tap((stud: Student) => this.studentSubject$.getValue().push(stud))
    )
  }

}
