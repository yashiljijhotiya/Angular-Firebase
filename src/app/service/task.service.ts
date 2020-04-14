import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  taskList: AngularFireList<any>;

  constructor( private firebase: AngularFireDatabase) { }

  getTask(){
    this.taskList = this.firebase.list('task');
    return this.taskList.snapshotChanges();
  }

  insertTask(task){
    this.taskList.push(task);
  }

  updateTask(task){
   this.taskList.update(task.$key, {

   });
  }

  deleteTask(id){
    this.taskList.remove(id);
  }
}
