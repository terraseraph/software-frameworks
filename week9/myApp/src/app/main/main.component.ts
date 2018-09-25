import { Component, OnInit } from '@angular/core';
import {MongoService} from '../mongo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  products : any;
  txt_search : any;
  
  constructor(private mongo : MongoService) { }

  ngOnInit() {
    this.get_all_products();
  }
  
  get_all_products(){
    this.mongo.get_all_products('dat').subscribe((result => this.populate_table(result)));
  }
  
  search(){
    var value = {
      value : `${this.txt_search}`
    }
    this.mongo.search_products(value).subscribe((result => this.populate_table(result)));
  }
  
  update_product(id, name, price, type, description){
    var dat = {
      id : id,
      name : name,
      price : price,
      type : type,
      description : description 
    }
    this.mongo.update_product(dat).subscribe((result => console.log(result)))
  }
  
  remove_product(id){
    console.log('remove', id)
    this.mongo.remove_product(id).subscribe((result => console.log(result)))
  }
  
  populate_table(data){
    data = JSON.parse(data._body)
    this.products = data
    console.log(this.products)
  }

}