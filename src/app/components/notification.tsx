"use client";

const Notification = ({message} : {message: string} ) => {
	return (
		<div
			id={"notification"}
			className={`mt-4 p-2 text-white rounded-lg text-center ${
				message.includes("Error")  ? "bg-red-500" : "bg-green-500"
			}`}
		>
			{message}
		</div>
	);
};

export default Notification;