import { ViewChild,Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular13CRUD';
  searching : boolean = true;

  displayedColumns: string[] = ['productName','date', 'category', 'condition', 'price','description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api : ApiService) {

  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent,{
      panelClass: 'app-dialog'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts()
      }
    })
  }

  getAllProducts(){
      this.api.getProduct()
      .subscribe({
        next:(res)=>{
          this.searching=false;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error : (err)=>{
          alert("Error while fetching the records")
        }
      })
  }

  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      panelClass: 'app-dialog',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'Update'){
        this.getAllProducts()
      }
    })
  }
  deleteProduct(id:number){
    if(window.confirm('Are sure you want to delete this item ?')){
      this.api.deleteProduct(id)
      .subscribe({
        next: (res)=>{
            Swal.fire('Removed', 'Record deleted successfully', 'success')
            this.getAllProducts();
        },
        error: ()=>{
          alert('Error while deleting');
        }
      })
    }
     
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

