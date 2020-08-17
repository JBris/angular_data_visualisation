import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Option {
  label: string;
  selected: boolean;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  selectedOption = null;
  message: string = '';
  options: Option[] = [
    {
      label: '14 - 25',
      selected: false,
      value: '14-25',
    },
    { label: '25 - 35', selected: false, value: '25-35' },
    {
      label: '35 - 45',
      selected: false,
      value: '35-45',
    },
    {
      label: '45 - 60',
      selected: false,
      value: '45-60',
    },
    { label: '60 and above', selected: false, value: '60+' },
  ];
  censusData = {
    '14-25': 0,
    '25-35': 0,
    '35-45': 0,
    '45-60': 0,
    '60+': 0,
  };

  takeVote(index) {
    const selectedOption = this.options[index];
    if (!selectedOption.selected) {
      this.http
        .post('http://localhost:4000/vote', selectedOption)
        .subscribe((res: Option) => {
          const options = this.options.map(
            (option, i) => (index === i ? { ...res } : { ...option })
          );
          this.options = [...options];
          this.selectedOption = res.value;
        });
    }
    else{
      this.message = "You've already placed a vote";
    }
  }

  onNewEntry(data) {
    this.censusData[data.value] += 1;
  }

  ngOnInit() {}
}