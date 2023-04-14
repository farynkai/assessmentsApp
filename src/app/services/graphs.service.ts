import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Graph } from '../interfaces/graph';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {
  constructor(private httpClient: HttpClient) {}

  getGraph(graph_id: string): Observable<Graph> {
    return this.httpClient.get<Graph>(`${environment.url}userassessments/graph?id=${graph_id}`);
  }
}
