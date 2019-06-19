import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0; // start with the second one
        }),
        map((data: number) => {
          return `Round ${data + 1}`;
        })
      ).subscribe(data => {
        console.log(data);
      }, error => {
        console.error(error);
        alert(error.message);
      }, () => {
        console.log('COMPLETED!');
      });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }

}
// errors cancel observables and doesnt 'complete' them;
