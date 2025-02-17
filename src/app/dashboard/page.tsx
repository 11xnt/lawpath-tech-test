"use client";

import dynamic from "next/dynamic";

const DashboardForm = dynamic(() => import("@/app/components/dashboardForm"), { ssr: false });

export default function Dashboard() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<DashboardForm />
		</div>
	);
}