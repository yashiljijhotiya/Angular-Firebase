import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  taskList: AngularFireList<any>;
  stateList: AngularFireList<any>;
  public states = [];
  
  formGroup: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('')
  });

  constructor( private firebase: AngularFireDatabase) {
    this.stateList = this.firebase.list('states');
    this.stateList.snapshotChanges().subscribe( list =>{
      this.states = list.map(item => {
         return {
           $key:item.key,
          ...item.payload.val()
         };
      })
    })
   }

  getTask(){
    this.taskList = this.firebase.list('task');
    return this.taskList.snapshotChanges();
  }

  insertTask(task){
    this.taskList.push({
      title: task.title,
      state: task.state,
      description: task.description,
      date: task.date
    });
  }

  updateTask(task){
   this.taskList.update(task.$key, {
      title: task.title,
      state: task.state,
      description: task.description,
      date: task.date
   });
  }

  deleteTask($key: string){
    this.taskList.remove($key);
  }

  inItForm(){
    this.formGroup.setValue({
      $key: null,
      title: '',
      state: '',
      description: '',
      date: ''
    })

  }

  resetForm(){}

  populateFormData(rowData){
    this.formGroup.setValue(rowData);
  }
}
