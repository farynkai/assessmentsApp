import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }

  renderChart(dataset: any) {
    let height = 500;
    let width = 700;
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let bubble = d3.pack()
      .size([width, height])
      .padding(1.5);

    let svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'bubble');

    let nodes = d3.hierarchy(dataset)
      .sum(function (d: any) {
        return d.value;
      });

    let node = svg.selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d.children
      })
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + d.x + "," + d.y + ')';
      }).style('fill', function (d, i: any) {
        return color(i);
      });

    node.append('circle')
      .attr('x', function (d) { return d.x; })
      .attr('y', function (d) { return d.y })
      .attr('r', function (d) {
        return d.r;
      })
      .style('fill', function (d, i: any) {
        return color(i);
      });

    node.append('text')
      .attr('dy', '.10em')
      .style('text-anchor', 'middle')
      .text(function (d: any) {
        return d.data.name.substring(0, d.r / 3);
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', function (d) {
        return d.r / 5;
      })
      .attr('fill', 'white');

    node.append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text(function (d: any) {
        return d.data.value;
      })
      .attr('font-family', 'Gill Sans')
      .attr('font-size', function (d) {
        return d.r / 5;
      })
      .attr('fill', 'white');
  }
}
