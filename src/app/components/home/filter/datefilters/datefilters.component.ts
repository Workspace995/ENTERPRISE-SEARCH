import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-datefilters',
	templateUrl: './datefilters.component.html',
	styleUrls: ['./datefilters.component.css']
})
export class DatefiltersComponent {
	params: any = {};

	constructor(public formatter: NgbDateParserFormatter, private router: Router, private activatedRoute: ActivatedRoute) {
		this.activatedRoute.queryParams.subscribe((params: any) => {
			this.params = Object.assign({}, params);
		});
	}

	onDateSelection(keyValue: any) {
		this.params[keyValue.key] = keyValue.value;
		if(keyValue.value == null) {
			delete this.params[keyValue.key];
		}
		this.updateRoute();
	}

	updateRoute() {
		this.router.navigate([], { queryParams: this.params });
	}
}
