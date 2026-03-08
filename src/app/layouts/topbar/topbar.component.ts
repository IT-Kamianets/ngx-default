import { DOCUMENT, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	computed,
	inject,
	signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-topbar',
	imports: [NgOptimizedImage, RouterLink],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
	private readonly modeStorageKey = 'app-mode';
	private readonly document = inject(DOCUMENT);
	private readonly platformId = inject(PLATFORM_ID);
	private readonly isBrowser = isPlatformBrowser(this.platformId);
	private readonly rootElement = this.document.documentElement ?? null;

	protected readonly mode = signal<'light' | 'dark'>(this.getInitialMode());
	protected readonly toggleIcon = computed(() =>
		this.mode() === 'dark' ? 'light_mode' : 'dark_mode',
	);
	protected readonly toggleLabel = computed(() =>
		this.mode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
	);

	protected toggleMode(): void {
		const nextMode = this.mode() === 'dark' ? 'light' : 'dark';
		this.mode.set(nextMode);
		this.applyMode(nextMode);
	}

	private getInitialMode(): 'light' | 'dark' {
		const storedMode = this.getStoredMode();
		if (storedMode) {
			this.applyMode(storedMode);
			return storedMode;
		}

		const activeMode = this.rootElement?.getAttribute('data-mode');
		if (activeMode === 'dark' || activeMode === 'light') {
			return activeMode;
		}

		this.applyMode('light');
		return 'light';
	}

	private applyMode(mode: 'light' | 'dark'): void {
		this.rootElement?.setAttribute('data-mode', mode);
		if (this.isBrowser) {
			this.document.defaultView?.localStorage.setItem(this.modeStorageKey, mode);
		}
	}

	private getStoredMode(): 'light' | 'dark' | null {
		if (!this.isBrowser) {
			return null;
		}

		const storedMode = this.document.defaultView?.localStorage.getItem(this.modeStorageKey);
		return storedMode === 'dark' || storedMode === 'light' ? storedMode : null;
	}
}
