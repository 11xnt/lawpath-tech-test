"use client";

import {signIn} from "next-auth/react";
import Form from "next/form";
import React from "react";
import {Github} from "lucide-react";

export default function LoginForm() {
	return (
		<Form action={""} className="bg-white p-6 rounded-lg shadow-lg w-96">
			<h2 className="text-xl font-bold mb-4 text-center">Log In</h2>
			<button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
					onClick={() => signIn("github")}>
				Sign in with GitHub<Github className="w-5 h-5"/>
			</button>
		</Form>
	)
};