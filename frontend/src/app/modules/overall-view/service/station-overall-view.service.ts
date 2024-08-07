import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {stationViewModel} from "../../station/store/stationView.model";
import {stationOverallViewModel} from "../store/stationOverallView.model";

@Injectable({
  providedIn: 'root'
})
export class StationOverallViewService {
  private API_URL= environment.API_URL;
  constructor(private http:HttpClient) {}

  getStationOverallView():Observable<stationOverallViewModel[]>{
    return this.http.get<stationOverallViewModel[]>(this.API_URL + "/station/overall")
  }
}
