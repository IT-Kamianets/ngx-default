import {
	Component,
	Input,
	ContentChildren,
	OnInit,
	Output,
	QueryList,
	AfterContentInit,
	EventEmitter,
	ContentChild
} from '@angular/core';
import {
	CellDirective,
	SortDirective,
	ActionsDirective,
	CustomEditDirective
} from './table.directive';
import { Router } from '@angular/router';
import { StoreService } from 'wacom';

@Component({
	selector: 'wtable',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentInit {
	constructor(private _router: Router, private _store: StoreService) {}

	tableId =
		'table_' +
		this._router.url
			.split('/')
			.filter((p) => p && p.length !== 24)
			.join('/');

	@Input() config: any = {};

	@Input() columns: any = [];

	@Input() rows: any = [];

	@Input() value = '_id';

	@Input() title = '';

	@ContentChildren(CellDirective) cell: QueryList<CellDirective>;

	@ContentChildren(SortDirective) sortHeaders: QueryList<SortDirective>;

	@ContentChild(ActionsDirective, { static: false }) action: any;

	@ContentChild(CustomEditDirective, { static: false }) editForm: any;

	now = Date.now();
	refresh() {
		this.now = Date.now();
	}

	searchShow = false;
	searching_text = '';
	filter_filter = '';
	@Output() onSearch = new EventEmitter();
	private _search_timeout: any;
	searching() {
		setTimeout(() => {
			if (!this.config.globalSearch) {
				this.filter_filter = this.searching_text;
			}
		}, 100);
		clearTimeout(this._search_timeout);
		this._search_timeout = setTimeout(this.searching.bind(this), 2000);
	}
	search() {
		clearTimeout(this._search_timeout);
		setTimeout(() => {
			if (!this.config.globalSearch) {
				this.filter_filter = this.searching_text;
			}

			this.refresh();
		}, 100);
		this.onSearch.emit(this.searching_text);
	}

	select_page_size = false;

	custom_cell: any = {};

	sort_type: any = {};

	sortable: any = {};

	ngOnInit(): void {
		this.default_config();

		for (let i = 0; i < this.columns.length; i++) {
			if (typeof this.columns[i] === 'string') {
				this.columns[i] = {
					title: this.columns[i],
					field: this.columns[i]
				};
			}
		}

		this._store.get(this.tableId + 'perPage', (perPage) => {
			if (perPage) {
				this.changePerPage(Number(perPage));
			}
		});
	}

	default_config(): void {
		if (!this.config.pageSizeOptions) {
			this.config.pageSizeOptions = [1, 10, 20, 50];
		}

		if (!this.config.perPage) {
			this.config.perPage = -1;
		}

		if (!this.config.page) {
			this.config.page = 1;
		}

		if (!this.config.searchable) {
			this.config.searchable = false;
		}

		if (typeof this.config.allDocs !== 'boolean') {
			this.config.allDocs = true;
		}
	}

	ngAfterContentInit(): void {
		for (let i = 0; i < this.sortHeaders.toArray().length; i++) {
			this.sortable[this.sortHeaders.toArray()[i].cell] = true;
		}

		for (let i = 0; i < this.cell.toArray().length; i++) {
			const cell = this.cell.toArray()[i];

			this.custom_cell[cell.cell] = cell.template;
		}

		const interval = setInterval(() => {
			this.refresh();
		}, 1000);
		setTimeout(() => {
			clearInterval(interval);
		}, 20000);
	}

	next(): void {
		if (
			typeof this.config.paginate === 'function' ||
			this.config.page * this.config.perPage < this.rows.length
		) {
			this.config.page += 1;
		}

		if (typeof this.config.paginate === 'function') {
			this.config.paginate(this.config.page);
		}

		this.refresh();
	}

	previous(): void {
		if (this.config.page > 1) {
			this.config.page -= 1;

			if (typeof this.config.paginate === 'function') {
				this.config.paginate(this.config.page);
			}

			this.refresh();
		}
	}

	changePerPage(row: any): void {
		this.config.perPage = row;

		if (typeof this.config.setPerPage === 'function') {
			this.config.setPerPage(this.config.perPage);
		}

		this.config.page = 1;

		if (typeof this.config.paginate === 'function') {
			this.config.paginate(this.config.page);
		}

		this._store.set(this.tableId + 'perPage', row.toString());

		if ((this.config.page - 1) * this.config.perPage > this.rows.length) {
			this.lastPage();
		}

		this.select_page_size = false;

		this.refresh();
	}

	lastPage(): void {
		this.config.page = Math.ceil(this.rows.length / this.config.perPage);
	}

	isLast(): boolean {
		return (
			(this.rows &&
				this.config.page ==
					Math.ceil(this.rows.length / this.config.perPage)) ||
			false
		);
	}

	sort(column: any): void {
		if (this.sort_type.title != column.title) {
			this.sort_type = {};
		}

		if (this.sortable[column.field]) {
			this.sort_type = {
				title: column.field,
				direction:
					(typeof this.sort_type.direction != 'string' && 'asc') ||
					(this.sort_type.direction == 'asc' && 'desc') ||
					undefined
			};
		}
	}
}
