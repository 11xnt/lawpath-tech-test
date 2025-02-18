"use client";

import { FormEvent, useState } from "react";
import Form from "next/form";
import Select from "react-select";
import { FormData, Locality, stateOptions } from "@/app/schemas/schemas";
import { FETCH_DATA_QUERY } from "@/app/api/address/query";
import { useLazyQuery } from "@apollo/client";
import Notification from "@/app/components/notification";

export default function DashboardForm() {
	const [formData, setFormData] = useState<FormData>({
		postcode: "",
		suburb: "",
		state: "",
	});

	const [fetchData] = useLazyQuery(FETCH_DATA_QUERY);
	const [notification, setNotification] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | { value: string; name: string } | null
	) => {
		if (!e) return;

		if ("target" in e) {
			const { name, value } = e.target;
			setFormData((prev) => ({ ...prev, [name]: value }));
		} else {
			setFormData((prev) => ({ ...prev, [e.name]: e.value }));
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setNotification("");
		const res = await fetchData({ variables: { q: formData.suburb, state: formData.state } });
		try {
			let localities = await res.data.fetchAddress.localities;

			if (!localities?.locality || Object.keys(localities).length === 0) {
				setNotification(`Error: Suburb ${formData.suburb} does not exist in the state: ${formData.state}`);
				return;
			}
			if (localities.locality.length > 1) {
				const filteredLocality = localities.locality.filter(
					(locality: Locality) => locality.location.toString().toLowerCase() === formData.suburb.toLowerCase()
				);
				localities = filteredLocality[0];
			} else {
				localities = localities.locality;
			}
			if (localities.postcode.toString() === formData.postcode) {
				setNotification("Valid address!");
			} else {
				setNotification(`Error: Postcode ${formData.postcode} does not match suburb: ${formData.suburb}`);
			}
		} catch (error) {
			setNotification("Error: Internal Server Error");
			console.error(error);
		}
	};

	return (
		<Form action={""} onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
			<h2 className="text-xl font-bold mb-4">Address Validator</h2>
			<div className="mb-4">
				<label className="block text-sm font-medium">Postcode</label>
				<input
					type="number"
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
				<Select id={"multi-selector"} options={stateOptions} onChange={handleChange} />
			</div>
			<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
				Submit
			</button>
			{notification && (
				<Notification message={notification} />
			)}
		</Form>
	);
}
