import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/entity/category';
import { Inventory } from 'src/app/entity/inventory';
import { Product } from 'src/app/entity/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ql-sanpham',
  templateUrl: './ql-sanpham.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class QlSanphamComponent implements OnInit {
  searchText;
  p:number=1
  selectedProduct : Product
  isToggle:boolean = true;
  isToggle2:boolean = true;
  files:Array<File>=[]
  files2:Array<File>=[]
  imageName:Array<string>=[]
  selectedFile:File;
  selectedFile2:File;
  imageName2:Array<string>=[]
  imgURL:any;
  imgURL2:any;
  categories:Array<Category>
  addForm:FormGroup
  cateLoad:Category
  faCoffee = faCoffee;
  faTrash=faTrash;
  faEdit = faEdit;
  constructor(private productService:ProductService,
    private formBuilder:FormBuilder,
    private categoryService:CategoryService,
    private httpClient:HttpClient,
    private route:Router) { }
  @Input()
  product:Product
  products:Array<Product>=[];
  selectedCate=1;
  datePickerConfig = {
    format: 'YYYY-MM-DD',
    monthFormat: 'MMM, YYYY',
    startDate: '01.01.2012',
  }
  updateForm = this.formBuilder.group({
    SProductName: ['', Validators.required],
    SProductPrice: ['', Validators.pattern('[0-9]')],
    SProductDiscount :['',Validators.required],
    SProductQuantity:['', Validators.required],
    SProductInfo: ['', Validators.required],
    SProductImage: [''],
    SProductCate:['',Validators.required],
    SProductFromDate:[''],
    SProductToDate:[''],
    SProductID:[''],
  });
  type:number
  delRole:boolean=false;
  ngOnInit(): void {
    
    this.getCategories();
    this.getProduct();
    this.cateLoad = new Category();
    this.addForm = this.formBuilder.group({
      AProductName: ['', Validators.required],
      AProductPrice: ['', Validators.pattern('[0-9]')],
      AProductDiscount :['',Validators.required],
      AProductQuantity:['', Validators.required],
      AProductInfo: ['', Validators.required],
      AProductImage: [''],
      AProductCate:['',Validators.required],
      AProductFromDate:[''],
      AProductToDate:[''],
  
    });
    this.type = this.getFirstNumberFromString(JSON.parse(sessionStorage.getItem('type'))) 
    
  }
  getFirstNumberFromString(s:string){
    let a:number = Number(s.replace( /[^\d].*/, '' ))
    return a ; // creates array from matches
  }
  editRoleCheck():any{
    if(this.type==1||this.type==4){
      this.popup_updateProduct();
      
      return true;
    }else{
      alert("You dont have permission to do this");
      return false;
    }
  }
  addRoleCheck(){
    if(this.type==1||this.type==4){
      this.popup_themsp()
      return true;
    }else{
      alert("You dont have permission to do this");
      return false;
    }
  }
  deleteRoleCheck(){
      if(this.type==1||this.type==4){
        this.delRole=true;
      }else{
        alert("You dont have permission to do this");
        return false;
      }
  }
  

  public popup_themsp(){
    
      this.isToggle = !this.isToggle
    
    console.log(this.isToggle);
  }
  public popup_updateProduct(){
    
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
  getProduct(){
    this.productService.getProducts().subscribe(Response =>{
        this.products = Response;
        for(let i=0;i<this.products.length;i++){
          this.products[i].imagesArray = Response[i].images;
        } 
       
        console.log(this.products);
    },(error)=>{
      alert("empty products")
    })
  }
  deleteProduct(product:Product){
   if(this.delRole==true){
    if(product.inventory!=null ){
      if(confirm("Are you sure to delete "+product.productName)) {
        this.productService.deleteInventory(product.productID).subscribe(Response=>{
          if(Response.result =="success"){
            console.log(Response)
            this.productService.deleteProduct(product.productID).subscribe(
              Response2=>{
                console.log(Response2)
                this.reloadCurrentRoute()
              }
            )
            
          }
          else{
            alert("Error");  
          }
        })
        
      }
    }
    else{
      this.productService.deleteProduct(product.productID).subscribe(
        Response=>{
          this.reloadCurrentRoute()
        }
      )
    }
    
   }
  }
  public onFileChanged(event) {
    //Select File
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {   
                  let k:File=event.target.files[i];
                 this.files.push(k); 
      }
      console.log(this.files)
  }
    
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile)
    reader.onload = (event2)=>{
      this.imgURL = reader.result
    }
  }
  //add product
  get AProductInfo() {
    return this.addForm.get('AProductInfo');
  }
  get AProductName() {
    return this.addForm.get('AProductName');
  }
  get AProductPrice() {
    return this.addForm.get('AProductPrice');
  }

  get AProductQuantity() {
    return this.addForm.get('AProductQuantity');
  }
  get AProductImage() {
    return this.addForm.get('AProductImage');
  }
  get AProductDiscount() {
    return this.addForm.get('AProductDiscount');
  }
  get AProductFromDate(){
    return this.addForm.get('AProductFromDate');
  }
  get AProductToDate(){
    return this.addForm.get('AProductToDate');
  }

  
  addProduct(){
    this.product = new Product();
    const uploadData = new FormData();
    let cate = new Category()
    cate = this.categories.find(x=>x.cateID==this.selectedCate)
    console.log(cate.tenloai);
    /*this.files.forEach(ele=>{   
      const random = Math.floor(Math.random() * (9999 - 1000));
      
      this.imageName.push(ele.name+random+'')
      i++
    })*/
    let date= new Date();
    const day=date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    let i=1;
    if(this.files.length!=0){
      this.files.forEach(e=>{
        console.log(e.type)
        let imgName=year+"_"+month+"_"+day+"_"+hour+"_"+minutes+"_"+second+"_"+i;
        uploadData.append('imageFile',e, imgName+".png");
        this.imageName.push(imgName+".png")
        i++;
      })
     
    }
    
       
        console.log(this.AProductName.value)
        this.product.productID="P_"
        this.product.productName = this.AProductName.value;
        this.product.price = this.AProductPrice.value;
        this.product.percent_discount =this.AProductDiscount.value;
        this.product.state=0;
        this.product.special_from_time=this.AProductFromDate.value
        this.product.special_to_time = this.AProductToDate.value;
        this.product.info = this.AProductInfo.value+'';
        this.product.images = "["
        for(let j=0;j<this.imageName.length;j++){
          if(j==(this.imageName.length-1)){
            this.product.images+="'"+this.imageName[j]+"'"
          }
          else{
            this.product.images+="'"+this.imageName[j]+"'"+","
          }
         
        }

        this.product.images+="]"
        this.product.category = cate;
          if(this.product.special_from_time>this.product.special_to_time&&(this.product.special_from_time <= date)&&this.product.special_to_time<=date){
            alert("ngày bắt đầu phải lớn hơn ngày kết thúc");
          }
          else{
            this.httpClient.post('http://localhost:8090/products/upload',uploadData,{ observe : "response"}).subscribe(
              (Response)=>{
                if(Response.status === 200){
                  this.productService.addProduct(this.product).subscribe(
                    (response)=>{
                      //this.route.navigate(['admin','product']);
                      let inventory = new Inventory;
                      let product3:Product = response
                      inventory.wareid=1;
                      inventory.product = product3;
                      inventory.product.images = this.product.images
                      inventory.quantity=0;
                      console.log(inventory)
                      this.productService.addInventory(inventory).subscribe(Response4=>{
                        alert("Add product success");
                        this.reloadCurrentRoute();
                      })
                     
                    },
                    (error)=>{ 
                      console.log(this.product)
                    }
              
                  ),
                  (error)=>{
                    console.log(this.product)
                  }
                console.log('Image upload Sucess');
                }
            },    
                ),
                (error)=>{
                    console.log(error);
                    console.log(this.product);
                    alert(this.product)
                    alert(this.product);
                }    
            
          }
        

    

  }
   validatorsChanged() {
    console.log('Change date'+this.AProductFromDate.value);
  }
  validatorsChanged2() {
    console.log('Change date'+this.AProductToDate.value);
  }
  selectedLoaiSp(event){
    console.log("gg")
    this.selectedCate= event.target.value
  console.log( event.target.value);
  }
  //add product end
  //update product start
  get SProductInfo() {
    
    return this.updateForm.get('SProductInfo');
  }
  get SProductName() {
    return this.updateForm.get('SProductName');
  }
  get SProductPrice() {
    return this.updateForm.get('SProductPrice');
  }

  get SProductQuantity() {
    return this.updateForm.get('SProductQuantity');
  }
  get SProductImage() {
    return this.updateForm.get('SProductImage');
  }
  get SProductDiscount() {
    return this.updateForm.get('SProductDiscount');
  }
  get SProductFromDate(){
    return this.updateForm.get('SProductFromDate');
  }
  get SProductToDate(){
    return this.updateForm.get('SProductToDate');
  }
  get SProductID(){
    return this.updateForm.get('SProductID');
  }
  
  displayProduct(product:Product){
     this.SProductID.setValue ( product.productID)
    this.SProductName.setValue( product.productName)
    this.SProductInfo.setValue( product.info)
    this.SProductPrice.setValue( product.price)
    this.SProductDiscount.setValue(product.percent_discount)
    this.SProductFromDate.setValue(product.special_from_time)
    this.SProductToDate.setValue(product.special_to_time)
    this.cateLoad =product.category;
    this.imgURL2="../../../../assets/images/products/"+ product.images[0]
  }
  public onFileChanged2(event) {
    //Select File
    if (event.target.files && event.target.files[0]) {
      let filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
             this.files2.push(event.target.files[i]);                      
      }
  }
    if(event.target.files[0]!=null){
      this.selectedFile2 = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile2)
      reader.onload = (event2)=>{
        this.imgURL2 = reader.result
      }
    }
   
  }
  selectedLoaiSp2(event){
    console.log("gg")
    if(this.cateLoad.cateID !=event.target.value){
      this.cateLoad = this.categories.find(x=>x.cateID==event.target.value)
      console.log(this.cateLoad.tenloai)
    }
  
  }
  updateProduct()
  {
        let product2= new Product() 
        this.productService.getProductByID(this.SProductID.value).subscribe(Response=>{
            product2=Response
            product2.imagesArray = Response.images;
            product2.productName=this.SProductName.value;
            product2.info=this.SProductInfo.value
            product2.price= this.SProductPrice.value
            product2.percent_discount = this.SProductDiscount.value
            product2.special_from_time = this.SProductFromDate.value
            product2.special_to_time = this.SProductToDate.value
            product2.category = this.cateLoad;
            let date= new Date();
            const day=date.getDate();
            const month = date.getMonth()+1;
            const year = date.getFullYear();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            const second = date.getSeconds();
            let imgName=year+"_"+month+"_"+day+"_"+hour+"_"+minutes+"_"+second;
            const uploadData2 = new FormData();
            if(this.selectedFile2!=null){
              
                let date= new Date();
                const day=date.getDate();
                const month = date.getMonth()+1;
                const year = date.getFullYear();
                const hour = date.getHours();
                const minutes = date.getMinutes();
                const second = date.getSeconds();
                let i=1;
                  this.files2.forEach(e=>{
                    let imgName=year+"_"+month+"_"+day+"_"+hour+"_"+minutes+"_"+second+"_"+i;
                    uploadData2.append('imageFile', e, imgName+".png");
                    this.imageName2.push(imgName+".png")
                    i++;
                  })
                  if(this.files2.length>1){
                  product2.images = "["
                  for(let j=0;j<this.imageName2.length;j++){
                    if(j==(this.imageName2.length-1)){
                      product2.images+="'"+this.imageName2[j]+"'"
                    }
                    else{
                      product2.images+="'"+this.imageName2[j]+"'"+","
                    }
                  
                  }

                  product2.images+="]"  
              }
              else{
                if(this.imageName2.length==1){
                  product2.images = "["+"'"+this.imageName2[0]+"'"+"]"
                }
              }
              this.httpClient.post('http://localhost:8090/products/upload',uploadData2,{ observe : "response"}).subscribe(
                (Response)=>{
                  if(Response.status === 200){
                    this.productService.updateProduct(product2).subscribe(
                      (response)=>{
                        
                        this.reloadCurrentRoute()
                      },
                      (error)=>{ 
                        console.log(error)
                       
                      }
                
                    )
    
                  }
              })
            }else{
              let k:any = [];
              k=product2.imagesArray;
              let imag:Array<string> = k;
             product2.images = "["
             for(let j=0;j<imag.length;j++){
               if(j==(imag.length-1)){
                 product2.images+="'"+imag[j]+"'"
               }
               else{
                 product2.images+="'"+imag[j]+"'"+","
               }
             
             }
         
             product2.images+="]"  
             console.log(product2.percent_discount)
              this.productService.updateProduct(product2).subscribe(
                Response=>{
                  console.log(Response)
                  this.reloadCurrentRoute()
                },
                error=>{console.log(error)
                  }
              )
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
  //update product end
  statusProduct(product:Product){
    let k:any = [];
     k=product.imagesArray;
     let imag:Array<string> = k;
    product.images = "["
    for(let j=0;j<imag.length;j++){
      if(j==(imag.length-1)){
        product.images+="'"+imag[j]+"'"
      }
      else{
        product.images+="'"+imag[j]+"'"+","
      }
    
    }

    product.images+="]"  
        if(product.state == 1){
          product.state=0
          
         
           // product.images = "["+"'"+imgName+"'"+"]"
          this.productService.updateProduct(product).subscribe(
            Response1=>{
              this.reloadCurrentRoute();
            }
          )
        }
        else{
          if(product.state == 0){
            product.state= 1
          this.productService.updateProduct(product).subscribe(
            Response1=>{
              this.reloadCurrentRoute();
            }
          )
          }
        }
    
}
}
