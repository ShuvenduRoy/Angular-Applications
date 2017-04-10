import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "./services/firebase.services";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent implements OnInit{
  business: any;
  categories: any;
  appState: string;
  activeKey: string;

  constructor(private _firebaseService: FirebaseService){

  }

  ngOnInit(): void {
    this._firebaseService.getBusiness().subscribe(business => {
      this.business = business;
    });

    this._firebaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

  }

  changeState(state, key:null){
    console.log('changing state to : '+state)
    if(key){
      console.log('changing key to : ' + key)
      this.activeKey = key;
    }
    this.appState = state;
  }

  filterCategory(category){
    console.log(category);
  }

  addBusiness(
    category: string,
    city: string,
    company: string,
    description: string,
    email: string,
    phone: string,
    state: string,
    zipcode: string,
  ){

    var created_at = new Date().toString();

    var newBusiness = {
      category: category,
      city: city,
      company: company,
      description: description,
      email: email,
      phone: phone,
      state: state,
      zipcode: zipcode,
      created_at: created_at
    }

    this._firebaseService.addBusiness(newBusiness);

    this.changeState('default', null);
  }

}
