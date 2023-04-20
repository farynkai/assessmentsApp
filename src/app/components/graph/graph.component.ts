import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

import { GraphsService } from '../../services/graphs.service';
import { UnsubscriberComponent } from '../unsubscriber/unsubscriber.component';
import { ChartService } from '../../services/chart.service';
import { selectUserRole } from '../../store/auth/auth.selectors';
import { UserState } from '../../interfaces/state';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  providers: [TitleCasePipe]
})
export class GraphComponent extends UnsubscriberComponent implements OnInit {
  userRole: string;
  graphId: string;
  view: any = [700, 500];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Traits';
  showYAxisLabel = true;
  yAxisLabel = 'Level';
  data: any = [];

  constructor(
    private route: ActivatedRoute,
    private graphServise: GraphsService,
    private d3PackedBubbleChartService: ChartService,
    private titleCasePipe: TitleCasePipe,
    private store: Store<UserState>
  ) {
    super();
  }
  ngOnInit(): void {
    this.store.select(selectUserRole).pipe(
      takeUntil(this.destroyed$)
    ).subscribe((role) => this.userRole = role);

    this.graphId = this.route.snapshot.params['id'];
    this.graphServise.getGraph(this.graphId).pipe(
      takeUntil(this.destroyed$)
    ).subscribe((graph) => {
      const data = Object.entries(graph.data).map((value) => {
        return { name: this.titleCasePipe.transform(value[0]), value: value[1] };
      })
      if (this.userRole === 'User') {
        const dataset = {
          children: data
        }
        this.d3PackedBubbleChartService.renderChart(dataset);
      }
      if (this.userRole === 'Admin') {
        this.data = data;
      }
    });
  }
}
