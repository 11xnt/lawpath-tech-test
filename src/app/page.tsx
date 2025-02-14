"use client";

import {useState} from "react";
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

export default function Home() {
	const [formData, setFormData] = useState<FormData>({
		postcode: "",
		suburb: "",
		state: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("Form submitted successfully!");
	};

    return (
		<Form action={"/api"} onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
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
