import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    taskService: TaskService) { }

  ngOnInit(): void {
    
  }

  private inItForm(){
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      state: ['', Validators.required],
      description: ['', Validators.required],
      scheduledDate: ['', Validators.required]

    });
  }

  onSubmit(){
    console.log('test');

  }

  mapDataToForm(data){}

  mapDataFromForm(data){}

}
