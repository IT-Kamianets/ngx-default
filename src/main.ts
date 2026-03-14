import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { appConfig } from './app/app.config';
import { Company } from './app/feature/company/company.interface';
import { CompanyService } from './app/feature/company/company.service';
import { Item } from './app/feature/item/item.interface';
import { ItemService } from './app/feature/item/item.service';
import { environment } from './environments/environment';

const loadBootstrapConfig = async (): Promise<{ company?: Company; items?: Item[] } | null> => {
	try {
		const response = await fetch(
			`${environment.apiUrl}/api/regionit/bootstrap/${environment.companyId}`,
		);

		if (!response.ok) {
			return null;
		}

		return (await response.json()) as { company?: Company; items?: Item[] };
	} catch {
		return null;
	}
};

loadBootstrapConfig()
	.then(async (config) => {
		const appRef = await bootstrapApplication(App, appConfig);

		if (config?.company) {
			appRef.injector.get(CompanyService).company.set(config.company);
		}

		if (Array.isArray(config?.items)) {
			appRef.injector.get(ItemService).items.set(config.items);
		}
	})
	.catch((err) => {
		console.error(err);
	});
