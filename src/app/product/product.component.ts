import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {ServicesService} from '../services.service';
import {ProductModel} from './product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formValue !: FormGroup;
  productModelObj:ProductModel=new ProductModel();
  productData:any=[];
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,private api:ServicesService) { }
  getProduct(){
    this.api.getProduct().subscribe((res: any)=>{
      this.productData=res;
      console.log(this.productData);
    },
      (    err: any)=>{
      console.log(err)
    })
  }
  deleteProduct(product:any){
    this.api.deleteProduct(product.id).subscribe((res: any)=>{
      this.getProduct()
      alert("Data Deleted")
    },
      (    err: any)=>{
      alert("Not Valid")
    })
  }
  addProduct(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postProductDetails(){
    this.productModelObj.course=this.formValue.value.course;
    this.productModelObj.level=this.formValue.value.level;
    this.productModelObj.location=this.formValue.value.location;
    this.productModelObj.startDate=this.formValue.value.startDate;
    this.productModelObj.fee=this.formValue.value.fee;
  

    this.api.postProduct(this.productModelObj).subscribe((res: any)=>{
      console.log(res);
      alert("Data Added");
      this.formValue.reset();
      let canc=document.getElementById("cancel");
      canc?.click();
      this.getProduct();
    },
      (    err: any)=>{
      alert("Not Valid")
    })
  }
  postData(product:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.productModelObj.id=product.id;
    this.formValue.controls['course'].setValue(product.course)
    this.formValue.controls['level'].setValue(product.level)
    this.formValue.controls['location'].setValue(product.location)
    this.formValue.controls['startDate'].setValue(product.startDate)
    this.formValue.controls['fee'].setValue(product.fee)
    
  }
  updateProductDetails(){
    this.productModelObj.course=this.formValue.value.course;
    this.productModelObj.level=this.formValue.value.level;
    this.productModelObj.location=this.formValue.value.location;
    this.productModelObj.startDate=this.formValue.value.startDate;
    this.productModelObj.fee=this.formValue.value.fee;
    this.api.updateProduct(this.productModelObj,this.productModelObj.id).subscribe((res: any)=>{
      alert("Data updated");
      let canc=document.getElementById("cancel");
      canc?.click()
      this.getProduct();
    },
      (    err: any)=>{
      alert("ERROR")
    })
  }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      course:[''],
      level:[''],
      location:[''],
      startDate:[''],
      fee:[''],
      
    })
    this.getProduct();
  }

}