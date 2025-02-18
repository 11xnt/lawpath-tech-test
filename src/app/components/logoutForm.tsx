"use client";

import {signOut} from "next-auth/react";
import React from "react";

export default function LogoutForm() {
	return (
		<button className="fixed top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
				onClick={() => signOut()}>
			Log out
		</button>
	)
};