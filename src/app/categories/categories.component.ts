import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

//import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

    categoryArray:any[]=[];
    formCategory!: string;
    formStatus: string = "Add";
    categoryId!: string;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
    console.log(val);
    this.categoryArray = val;
    })
  }

  onSubmit(formData: any) {
    // console.log(formData.value);  this data show in console

    let categorydata: Category = {
      category: formData.value.category
    };

    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categorydata);
      formData.reset();
    }
    else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,categorydata);
      formData.reset();
      this.formStatus = 'Add';
    }

    //for reset the data 

    //  let subCategoryData = {
    //   subCategory: 'subCategory1'
    // }
    // // console.log(categorydata)
    // this.afs.collection('categories1').add(categorydata).then(docref =>{
    //   console.log(docref);

    //   // this.afs.doc('categories/${docref.id}').collection('subcategories').add(subCategoryData)
    //     this.afs.collection('categories1').doc(docref.id).collection('subcategories').add(categorydata).then(docref1 =>{
    //     console.log(docref1);

    //     //subcollection level query
    //     //this.afs.doc('categories/${docRef.id}/subcategories/$docref1.id').collection('subcategories').add(subCategoryData)

    //     this.afs.collection('category').doc(docref.id).collection('subcategories').doc(docref1.id).collection('subcategories').add(subCategoryData).then(docref2 =>{
    //       console.log('Second levele Subcategory Saved Successfully')
    //     })
    //   })
    // })
    // .catch(err => {console.log(err)})
  }
    onEdit(category:any,id:any){
    // console.log(category);
    this.formCategory = category;
    this.formStatus =  'Edit';
    this.categoryId = id;
    }

    onDelete(id: any)
    {
        this.categoryService.deleteData(id)
    }
 }
