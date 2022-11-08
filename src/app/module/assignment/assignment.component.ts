import { Component ,OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

interface Country {
  name: String,
  capital: String,
  subregion: String,
  population: Number
}

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  countries: Country[];
  search: any;
  currentPage: number = 1;
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.apiGetCountry().subscribe(result => {
      this.countries = result;
    });
  }
  
  apiGetCountry(){
    return this.httpClient.get<Country[]>('https://restcountries.com/v3.1/all').pipe(
      map((response:any) => {
          return response.map(e => {
            return { 
              name: e.name.common, 
              capital: e.capital, 
              population: e.population, 
              subregion: e.subregion
            };
          })
      })
    );
  }
}