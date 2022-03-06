import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { Inventory } from 'src/app/entity/inventory';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-qlkho',
  templateUrl: './qlkho.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class QlkhoComponent implements OnInit {

  constructor(private productService:ProductService,
    private route:Router) { }
  inventories:Array<Inventory>=[]
  p:number=1
  searchText;
  ngOnInit(): void {
    this.getInventory();
  }
  getInventory(){
    this.productService.getInventory().subscribe(Response=>{
      this.inventories = Response;
      console.log(this.inventories)
    })
  }
  public onChange(event:Event,inven:Inventory): void {
    const input = event.target as HTMLInputElement;
    let input2 = Number(input.value);
    console.log(input.value);
    console.log(inven);
    if(inven.quantity>=0 && input2>=0){
        this.productService.updateInventory(inven.product.productID,input2).subscribe(Response=>{
          alert("update success")
        })
    }
    
    }
    reloadCurrentRoute() {
      let currentUrl = this.route.url;
      this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
          console.log(currentUrl);
      });
    }
}
