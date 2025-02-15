export interface FormData {
	postcode: string;
	suburb: string;
	state: string;
}

export const stateOptions = [
	{value: 'VIC', label: 'Victoria', name: "state"},
	{value: 'NSW', label: 'New South Wales', name: "state"},
	{value: 'SA', label: 'South Australia', name: "state"},
	{value: 'QLD', label: 'Queensland', name: "state"},
	{value: 'WA', label: 'Western Australia', name: "state"},
	{value: 'TAS', label: 'Tasmania', name: "state"},
]