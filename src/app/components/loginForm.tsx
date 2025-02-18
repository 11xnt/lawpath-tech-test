"use client";

import {signIn} from "next-auth/react";
import Form from "next/form";
import React, {useState} from "react";
import {Github} from "lucide-react";
import Notification from "@/app/components/notification";
import {Spinner} from "@heroui/spinner";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isGitHubLoading, setIsGitHubLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				setError("Error: Invalid credentials. Please try again.");
			} else if (result?.ok) {
				window.location.href = "/";
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg w-96">
			<Form action={""} onSubmit={handleSubmit}>
				<h2 className="text-xl font-bold mb-4 text-center">Log In</h2>
				<div>
					<label className="block text-sm font-medium">Email:</label>
					<input
						className="w-full border p-2 rounded mt-1"
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Password:</label>
					<input
						className="w-full border p-2 rounded mt-1"
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<br/>
				<button
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
					type="submit">Sign in with Credentials
					{isLoading && (
						<Spinner color="default" size="sm" labelColor="foreground" />
					)}
				</button>
				<br/>
			</Form>
			<button
				className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
				onClick={() => {
					setIsGitHubLoading(true);
					signIn("github").then(() => setIsGitHubLoading(false))
				}}>
				Sign in with GitHub
				<Github className="w-5 h-5"/>
				{isGitHubLoading && (
					<Spinner color="default" size="sm" labelColor="foreground" />
				)}
			</button>
			{error &&
				<Notification message={error}/>
			}
		</div>
	)
};