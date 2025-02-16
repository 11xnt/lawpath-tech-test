"use client"

import {FormEvent, useState} from "react";
import Form from "next/form";
import Select from "react-select";
import {FormData, stateOptions} from "@/app/schemas/schemas";
import {FETCH_DATA_QUERY} from "@/app/api/address/route";
import {useLazyQuery} from "@apollo/client";

export default function Dashboard() {
	const [formData, setFormData] = useState<FormData>({
		postcode: "",
		suburb: "",
		state: "",
	});

	const [fetchData, {data, loading, error}] = useLazyQuery(FETCH_DATA_QUERY);
	const [notification, setNotification] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { value: string; name: string }) => {
		const {name, value} = "target" in e ? e.target : e;
		setFormData((prev) => ({...prev, [name]: value}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setNotification(null);
		const res = await fetchData({variables: {q: formData.suburb, state: formData.state}});
		let localities = res.data.fetchAddress.localities;

		if(Object.keys(localities).length === 0 && localities.constructor === Object) {
			setNotification("Error: Suburb " + formData.suburb + " does not exist in the state: " + formData.state);
		}
		if (localities.locality.length > 1) {
			const filteredLocality = localities.locality.filter((locality: any) =>
				locality.location.toString().toLowerCase() === formData.suburb.toLowerCase()
			);
			localities = filteredLocality[0];
		} else {
			localities = localities.locality;
		}
		const postcode = localities.postcode
		if(postcode.toString() === formData.postcode) {
			setNotification("Valid address!");
		} else if(localities.postcode !== formData.postcode) {
			setNotification("Error: Postcode " + formData.postcode + " does not match suburb: " + formData.suburb);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">

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

				{notification && (
					<div
						className={`mt-4 p-2 text-white rounded-lg text-center ${
							notification.includes("Error") ? "bg-red-500" : "bg-green-500"
						}`}
					>
						{notification}
					</div>
				)}
			</Form>
		</div>
	);
}