/** @format */

import React from "react";
import CreateUserForm from "./CreateUserForm";
import Carousel from "./Carousel";
import ChatBox from "./ChatBox";

const HomePage = () => {
	return (
		<div>
			<CreateUserForm />
			<Carousel />
			<ChatBox />
		</div>
	);
};

export default HomePage;
