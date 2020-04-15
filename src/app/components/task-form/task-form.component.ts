import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {


  constructor(
    protected taskService: TaskService,
    protected notificationService: NotificationService,
    private dialogRef: MatDialogRef<TaskFormComponent>) { }

    // states = [
    //   {id: 1, value: 'Created'},
    //   {id: 2, value: 'In Progress'},
    //   {id: 3, value: 'TODO'},
    //   {id: 4, value: 'Completed'}
    // ]

  ngOnInit(): void {
    this.taskService.getTask();
  }

  onSubmit(){
    if(this.taskService.formGroup.valid){
      if(!this.taskService.formGroup.get('$key').value){
        this.taskService.insertTask(this.taskService.formGroup.value);
      }
      else{
        this.taskService.updateTask(this.taskService.formGroup.value);
      }
     
      this.taskService.resetForm();
      this.taskService.inItForm();
      this.notificationService.success('Submitted Succesfully!');
    }
    this.onClose();
  }

  onClear(){
    this.taskService.formGroup.reset();
    this.taskService.inItForm();
  }

  onClose(){
    this.taskService.resetForm();
    this.taskService.inItForm();
    this.dialogRef.close();
  }

}
