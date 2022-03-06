import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faLock, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/entity/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-ql-danhmuc',
  templateUrl: './ql-danhmuc.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class QlDanhmucComponent implements OnInit {
  isToggle:boolean=true;
  isToggle2:boolean=true;
  categories:Array<Category>
  selectedCate:Category;
  constructor(private categoryService:CategoryService,
    private formBuilder:FormBuilder,
    private route:Router) { }
  faTrash=faTrash
  faEdit = faEdit
  faLock= faLock
  faUnlock=faUnlock
  stt:number
  addCate= this.formBuilder.group({
    cateName:['',Validators.required],
  })
  updateCate= this.formBuilder.group({
    cateID:['',Validators.required],
    cateName2:['',Validators.required],
  })
  searchText;
  p:number=1
  type:number
  ngOnInit(): void {
    this.getCategories()
    this.type = this.getFirstNumberFromString(JSON.parse(sessionStorage.getItem('type')))
  }
  public popup_themsp(){
    
    this.isToggle = !this.isToggle
  
  console.log(this.isToggle);
}
public popup_themsp2(){
    
  this.isToggle2 = !this.isToggle2

console.log(this.isToggle2);
}
getCategories(){
  this.categoryService.getCategories().subscribe(Response=>{
    this.categories = Response;
    console.log(Response)
  },(error)=>{
    console.log(error)
  });
  
}
getFirstNumberFromString(s:string){
  let a:number = Number(s.replace( /[^\d].*/, '' ))
  return a ; // creates array from matches
}
addCateCheck(){
  if(this.type==4||this.type==1){
    this.popup_themsp()
  }else{
    alert("you are not allowed")
  }

}
deleteCateCheck(cate:Category){
  if(this.type==4||this.type==1){
    this.deleteCate(cate);
  }else{
    alert("you are not allowed")
  }
}
get cateName(){
  return this.addCate.get("cateName")
}
get cateName2(){
  return this.updateCate.get("cateName2")
}
get cateID(){
  return this.updateCate.get("cateID")
}

 addCategory(){
   let cate = new Category();
   cate.tenloai = this.cateName.value;
   cate.trangthai= 0;
   this.categoryService.addCategory(cate).subscribe(Response=>{
     alert("thêm thành công");
     this.reloadCurrentRoute();
     console.log(Response);
   })
 }
 displayCate(cate:Category){
   this.stt= cate.cateID
  this.cateID.setValue(cate.cateID);
   this.cateName2.setValue(cate.tenloai);
   this.selectedCate = cate;
 }
 updateCategory(){
    this.selectedCate.tenloai = this.cateName2.value;
    this.categoryService.updateCategory(this.selectedCate).subscribe(Response=>{
      alert("Sửa thành công")
      this.reloadCurrentRoute();
      console.log(Response);
    })

 }
 HideCategory(cate:Category){
  if(cate.trangthai == 1){
    cate.trangthai=0
    this.categoryService.updateCategory(cate).subscribe(
      Response1=>{
        console.log(Response1)
        this.reloadCurrentRoute();
      }
    )
  }
  else{
    if(cate.trangthai == 0){
      cate.trangthai= 1
    this.categoryService.updateCategory(cate).subscribe(
      Response1=>{
        console.log(Response1)
        this.reloadCurrentRoute();
      }
    )
    }
  }

}
deleteCate(cate:Category){
  this.categoryService.deleteCategory(cate.cateID).subscribe(Response=>{
    let result = Response.result;
    if(result=="success"){
      alert("Xóa thành công")
      this.reloadCurrentRoute();
    }else{
      console.log(Response)
      alert("Xóa thất bại")
      this.reloadCurrentRoute();
    }
  })
}
reloadCurrentRoute() {
  let currentUrl = this.route.url;
  this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.route.navigate([currentUrl]);
      console.log(currentUrl);
  });
}
}
