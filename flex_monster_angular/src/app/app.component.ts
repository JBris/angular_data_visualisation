import { Component, ViewChild } from "@angular/core";
import { FlexmonsterPivot } from "ng-flexmonster";
import { Flexmonster } from "ng-flexmonster";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("pivot") pivot: FlexmonsterPivot;
  public pivotReport = {
    dataSource: {
      filename: "https://cdn.flexmonster.com/data/data.csv"
    },
    slice: {
      rows: [
        {
          uniqueName: "Destination",
          filter: {
            measure: {
              uniqueName: "Price",
              aggregation: "sum"
            },
            query: {
              top: 3
            }
          }
        },
        { uniqueName: "Color" },
        { uniqueName: "[Measures]" }
      ],
      columns: [{ uniqueName: "Category" }, { uniqueName: "Country" }],
      measures: [{ uniqueName: "Price", aggregation: "sum" }]
    }
  };

  public licenseKey =
    window.top !== window ||
    window.location.hostname.indexOf("codesandbox.io") >= 0
      ? "Z7AC-XII59E-6Q5C5S-0B3K68-07596N-384Y73-4Z5B2F-633J0J-403Y10-226G0J-0I48"
      : "Z787-XHJ68O-0S701F-6I6F5L-5T0G4H-1F4Q2F-6B4D6M-3E524L-2J112O-096X2G";

  ngOnInit() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => this.onGoogleChartsLoaded());
  }
  onGoogleChartsLoaded() {
    this.googleChartsLoaded = true;
    if (this.pivotTableReportComplete) {
      this.createGoogleChart();
    }
  }

  onPivotReady(pivot: Flexmonster.Pivot): void {
    console.log("[ready] FlexmonsterPivot", this.pivot);
  }

  onCustomizeCell(
    cell: Flexmonster.CellBuilder,
    data: Flexmonster.CellData
  ): void {
    //console.log("[customizeCell] FlexmonsterPivot");
    if (data.isClassicTotalRow) cell.addClass("fm-total-classic-r");
    if (data.isGrandTotalRow) cell.addClass("fm-grand-total-r");
    if (data.isGrandTotalColumn) cell.addClass("fm-grand-total-c");
  }

  pivotTableReportComplete: boolean = false;
  googleChartsLoaded: boolean = false;

  onReportComplete(): void {
    this.pivot.flexmonster.off("reportcomplete");
    this.pivotTableReportComplete = true;
    this.createGoogleChart();
  }

  createGoogleChart() {
    if (this.googleChartsLoaded) {
      this.pivot.flexmonster.googlecharts.getData(
        { type: "pie" },
        data => this.drawChart(data),
        data => this.drawChart(data)
      );
    }
  }

  drawChart(_data: any) {
    console.log("<<<<", this.pivot);
    var data = google.visualization.arrayToDataTable(_data.data);

    var options = {
      //title: "Sales by Countries",
      legend: {
        position: "bottom"
      },
      pieHole: 0.35,
      height: 500,
      width: 800,
      pieSliceBorderColor: "none",
      colors: ["#665c84", "#ff7657", "#ffba5a", "#bb8fa9", "#560764", "#d8cbbb"]
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("googlechart-container-1")
    );
    chart.draw(data, <google.visualization.ColumnChartOptions>options);
  }
}
