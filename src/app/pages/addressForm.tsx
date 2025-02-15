"use client"

import {FormEvent, useState} from "react";
import Form from "next/form";
import Select from "react-select";
import { FormData, stateOptions } from "@/app/schemas/schemas";
import {FETCH_DATA_QUERY} from "@/app/api/address/route";
import {useLazyQuery} from "@apollo/client";

export default function AddressForm() {

	const [formData, setFormData] = useState<FormData>({
		postcode: "",
		suburb: "",
		state: "",
	});

	const [fetchData, { data, loading, error }] = useLazyQuery(FETCH_DATA_QUERY);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { value: string; name: string }) => {
		const { name, value } = "target" in e ? e.target : e;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Submitting with variables:", formData);
		const res = await fetchData({variables: {q: formData.suburb, state: formData.state}});
		console.log(res.data.fetchAddress.localities);

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
				<Select options={stateOptions}
						onChange={handleChange}/>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
				Submit
			</button>
		</Form>
	);
}