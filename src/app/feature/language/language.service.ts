import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Translate, TranslateService } from 'wacom';

import { translates } from '../../app.translates';
import { LANGUAGES } from './language.const';
import { LanguageOption } from './language.interface';
import { LanguageCode } from './language.type';

@Injectable({ providedIn: 'root' })
export class LanguageService {
	private readonly _doc = inject(DOCUMENT);
	private readonly _translateService = inject(TranslateService);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _storageKey = 'app-language';

	readonly languages = signal<LanguageOption[]>(LANGUAGES);

	readonly language = signal<LanguageCode>('en');

	init(): void {
		const stored = this._isBrowser
			? this._doc.defaultView?.localStorage.getItem(this._storageKey)
			: null;
		const fallback = this._doc.documentElement.lang === 'uk' ? 'ua' : 'en';
		const language = this.isSupportedLanguage(stored) ? stored : fallback;

		this.setLanguage(language);
	}

	setLanguage(language: LanguageCode): void {
		this.language.set(language);
		this._translateService.setMany(this.buildTranslations(language));
		this._doc.documentElement.lang = this.getLanguage(language).htmlLang;

		if (this._isBrowser) {
			this._doc.defaultView?.localStorage.setItem(this._storageKey, language);
		}
	}

	nextLanguage(): void {
		const languages = this.languages();
		const currentIndex = languages.findIndex((language) => language.code === this.language());
		const nextIndex = (currentIndex + 1) % languages.length;

		this.setLanguage(languages[nextIndex]?.code ?? 'en');
	}

	getLanguage(code: LanguageCode): LanguageOption {
		return this.languages().find((language) => language.code === code) ?? this.languages()[0]!;
	}

	private buildTranslations(language: LanguageCode): Translate[] {
		if (language === 'en') {
			return [];
		}

		return Object.entries(translates).flatMap(([sourceText, translationMap]) => {
			const text = translationMap[language];

			return text ? [{ sourceText, text }] : [];
		});
	}

	private isSupportedLanguage(value: string | null | undefined): value is LanguageCode {
		return this.languages().some((language) => language.code === value);
	}
}
