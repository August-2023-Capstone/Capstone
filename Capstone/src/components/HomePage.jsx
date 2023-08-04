/** @format */

import React from "react";
import CreateUserForm from "./CreateUserForm";
import Carousel from "./Carousel";

import HomeCarouselOne from "./HomeCarouselOne";
import ChatBox from "./ChatBox";

const HomePage = () => {
	return (
		<div className='HomePage'>
			{/* <CreateUserForm />  
      <Carousel /> */}
			<h2 className='NewReleases'>New and trending</h2>
			<HomeCarouselOne />
			<h2 className='NewReleases'>Recently released</h2>
			<HomeCarouselOne />
			<ChatBox />
		</div>
	);
};

export default HomePage;
