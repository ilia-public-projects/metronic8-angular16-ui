import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-table-filter',
    templateUrl: './table-filter.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class TableFilterComponent implements OnInit,OnDestroy {

    @Input() form: NgForm;

    @Output() onReset: EventEmitter<any> = new EventEmitter();
    @Output() onApply: EventEmitter<any> = new EventEmitter();

    public criteriaIsSet = false;
    public subscriptions: Subscription[] = [];

    ngOnInit(): void {
       this.subscriptions.push(this.form.form.valueChanges.subscribe(() => {
            this.criteriaIsSet = (this.form.dirty ?? false);
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public reset() {
        this.form.form.reset();
        this.onReset.emit();
    }

    public apply() {
        this.onApply.emit();
    }
}
