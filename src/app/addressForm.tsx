"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import Form from 'next/form'
import Select from "react-select";

const stateOptions = [
	{value: 'VIC', label: 'Victoria'},
	{value: 'NSW', label: 'New South Wales'},
	{value: 'SA', label: 'South Australia'},
	{value: 'QLD', label: 'Queensland'},
	{value: 'WA', label: 'Western Australia'},
	{value: 'TAS', label: 'Tasmania'},
]

interface FormData {
	postcode: string;
	suburb: string;
	state: string;
}

export default function AddressForm() {

	const [formData, setFormData] = useState<FormData>({
		postcode: "",
		suburb: "",
		state: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const queryParams = new URLSearchParams(formData as any).toString();
		const response = await fetch(`/api/address?${queryParams}`);
		const data = await response.json();
		console.log(data);

		if(data.localities.locality.postcode.toString() === formData.postcode) {
			alert("Valid");
		} else {
			alert("Error");
		}
	};

	return (
		<Form action={""} onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
			<h2 className="text-xl font-bold mb-4">Address Validator</h2>
			<div className="mb-4">
				<label className="block text-sm font-medium">Postcode</label>
				<input
					type="text"
					name="postcode"
					value={formData.postcode}
					onChange={handleChange}
					className="w-full border p-2 rounded mt-1"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium">Suburb</label>
				<input
					type="text"
					name="suburb"
					value={formData.suburb}
					onChange={handleChange}
					className="w-full border p-2 rounded mt-1"
					required
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium">State</label>
				<Select options={stateOptions}/>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
				Submit
			</button>
		</Form>
	);
}