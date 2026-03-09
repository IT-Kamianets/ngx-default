import { Company } from '../app/feature/company/company.interface';
import { Item } from '../app/feature/item/item.interface';

export const environment: {
	apiUrl: string;
	appVersion: string;
	production: boolean;
	companyId: string;
	company: Company;
	items: Item[];
} = {
	apiUrl: 'https://api.webart.work',
	appVersion: '1.0.0',
	production: true,
	items: [],
	companyId: 'demo',
	company: {
		_id: '',
		name: '',
	},
};
