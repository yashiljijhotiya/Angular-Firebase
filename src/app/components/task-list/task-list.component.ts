import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from 'src/app/model/task.model';

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

  constructor(private taskService: TaskService) {

    for(var i = 0; i < 50; i++){
      var t = new Task();
        t.id = `${i}`;
        t.title = `Task ${i}`;
        t.state =  'pending';
        t.description =  `task ${i} desc`,
        t.scheduledDate =  '14-Apr-20'
        this.task.push(t);
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // this.taskService.getTask().subscribe(data => {
    //   let list = data.map(item => {
    //     return {
    //       $key: item.key,
    //       ...item.payload.val()
    //     };
    //   });
    //   this.taskList = new MatTableDataSource(this.task);
    //   this.taskList.sort = this.sort;
    //   this.taskList.paginator = this.paginator;
    // });
    this.taskList = new MatTableDataSource(this.task);
    this.taskList.sort = this.sort;
    this.taskList.paginator = this.paginator;
  }

  onEdit(rowData) {
    

  }

  onDelete(rowData) {
    console.log(rowData);
   }


}

// export interface Element {
//   position: number;
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// const ELEMENT_DATA: Element[] = [
//   {position: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com'},
//   {position: 1, firstName: 'Mike', lastName: 'Hussey', email: 'mike@gmail.com'},
//   {position: 1, firstName: 'Ricky', lastName: 'Hans', email: 'ricky@gmail.com'},
//   {position: 1, firstName: 'Martin', lastName: 'Kos', email: 'martin@gmail.com'},
//   {position: 1, firstName: 'Tom', lastName: 'Paisa', email: 'tom@gmail.com'}
// ];
