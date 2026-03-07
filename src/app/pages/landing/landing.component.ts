import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { marked } from 'marked';

@Component({
	templateUrl: './landing.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
	private _httpClient = inject(HttpClient);

	html = signal('');

	constructor() {
		this._httpClient
			.get('/README.md', { responseType: 'text' })
			.subscribe((content) => this.html.set(marked.parse(content) as string));
	}
}
