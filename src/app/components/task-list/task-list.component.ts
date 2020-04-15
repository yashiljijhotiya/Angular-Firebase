import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/model/task.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  taskList: MatTableDataSource<any>;
  columnSettings: string[] = ['title', 'state', 'description', 'scheduledDate', 'actions'];
  pageSizeOptions: number[] = [5, 10, 25, 50];

  task: Task[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    protected notificationService: NotificationService,) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getTask().subscribe(data => {
      let list = data.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.taskList = new MatTableDataSource(list);
      this.taskList.sort = this.sort;
      this.taskList.paginator = this.paginator;
    });
  }

  onEdit(rowData) {
    this.taskService.populateFormData(rowData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(TaskFormComponent, dialogConfig);

  }

  onDelete($key) {
    if(confirm('Are you sure you want to delete the task ?')){
      this.taskService.deleteTask($key);
      this.notificationService.delete("Deleted Succesfully");
    }
    
  }

  createNew() {
    this.taskService.inItForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(TaskFormComponent, dialogConfig);
  }


}

