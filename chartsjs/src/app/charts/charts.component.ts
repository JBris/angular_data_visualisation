import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PusherService } from '../pusher.service';
import { Option } from '../app.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(private pusher: PusherService) {}

  @Input() censusData = {};
  @Output() newEntry: EventEmitter<Option> = new EventEmitter();

  chartType = 'pie';
  chartData = [];
  chartLabels = [];
  totalPopulation = 0;
  under35 = 0;
  between35and60 = 0;
  above60 = 0;

  computeData() {
    this.chartData = Object.values(this.censusData);
    this.chartLabels = Object.keys(this.censusData);
    this.totalPopulation = this.getTotalPopulation();
    this.under35 = Math.round(this.getPopulationUnder35());
    this.between35and60 = Math.round(this.getPopulationBetween35and60());
    this.above60 = Math.round(this.getPopulationAbove60());
  }

  getTotalPopulation() {
    const values: number[] = Object.values(this.censusData);
    return values.reduce((defaultValue, val) => defaultValue + val, 0);
  }

  getPopulationUnder35() {
    const total = this.getTotalPopulation();
    const populationUnder35 = Object.keys(this.censusData).reduce(
      (initVal, val) => {
        if (val === '14-25' || val === '25-35') {
          return initVal + this.censusData[val];
        }
        return initVal;
      },
      0
    );
    return populationUnder35 / total * 100;
  }

  getPopulationBetween35and60() {
    const total = this.getTotalPopulation();
    const populationBetween35and60 = Object.keys(this.censusData).reduce(
      (initVal, val) => {
        if (val === '35-45' || val === '45-60') {
          return initVal + this.censusData[val];
        }
        return initVal;
      },
      0
    );
    return populationBetween35and60 / total * 100;
  }

  getPopulationAbove60() {
    const total = this.getTotalPopulation();
    const above60 = Object.keys(this.censusData).reduce((initVal, val) => {
      if (val === '60+') {
        return initVal + this.censusData[val];
      }
      return initVal;
    }, 0);
    return above60 / total * 100;
  }

  ngOnInit() {
    this.computeData();
    const channel = this.pusher.init();
    channel.bind('new-entry', (data: Option) => {
      this.newEntry.emit(data);
      this.computeData();
    });
  }
}