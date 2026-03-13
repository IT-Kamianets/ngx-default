import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Translate, TranslateService } from 'wacom';

import { translates } from '../../app.translates';
import { environment } from '../../../environments/environment';
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
	private readonly _defaultLanguage = this.resolveDefaultLanguage();

	readonly language = signal<LanguageCode>(this._defaultLanguage);

	init() {
		const stored = this._isBrowser
			? this._doc.defaultView?.localStorage.getItem(this._storageKey)
			: null;
		const language = this.isSupportedLanguage(stored) ? stored : this._defaultLanguage;

		this.setLanguage(language);
	}

	setLanguage(language: LanguageCode) {
		this.language.set(language);
		this._translateService.setMany(this.buildTranslations(language));
		this._doc.documentElement.lang = this.getLanguage(language).htmlLang;

		if (this._isBrowser) {
			this._doc.defaultView?.localStorage.setItem(this._storageKey, language);
		}
	}

	nextLanguage() {
		const languages = this.languages();
		const currentIndex = languages.findIndex((language) => language.code === this.language());
		const nextIndex = (currentIndex + 1) % languages.length;

		this.setLanguage(languages[nextIndex]?.code ?? this._defaultLanguage);
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

	private resolveDefaultLanguage(): LanguageCode {
		return this.isSupportedLanguage(environment.defaultLanguage)
			? environment.defaultLanguage
			: 'en';
	}
}
