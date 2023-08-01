/** @format */

import React, { useState } from "react";
import avatar from "../assets/icons/image0copy.png";
import ps5Icon from "../assets/icons/ps5.png";
import homeIcon from "../assets/icons/home.png";
import speechBubbleIcon from "../assets/icons/speechbubble.png";
import usersIcon from "../assets/icons/users.png";
import settingsIcon from "../assets/icons/settings.png";
import AddGameModal from "../components/AddGameModal";

const Navbar = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const handleOpenModal = () => {
		setModalOpen(true);
	};
	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<nav className='bg-gray-800 p-8 flex items-center justify-between'>
			<div className='flex items-center'>
				<img src={avatar} alt='Logo' className='w-10 h-10 mr-4 rounded-full' />
				<span className='text-white mr-4'>danielbaronreo@gmail.com</span>
				<img src={ps5Icon} alt='PS5 Icon' className='w-10 h-10 rounded-full' />
			</div>
			<div className='flex items-center justify-center flex-grow'>
				<span className='text-white text-3xl font-bold flex-grow-0'>
					SQUAD FINDER
				</span>
			</div>
			<div className='flex items-center'>
				<img src={homeIcon} alt='Home Icon' className='w-10 h-10 mr-4' />
				<img
					src={speechBubbleIcon}
					alt='Speech Bubble Icon'
					className='w-10 h-10 mr-4'
				/>
				<img src={usersIcon} alt='Users Icon' className='w-10 h-10 mr-4' />
				<img src={settingsIcon} alt='Settings Icon' className='w-10 h-10' />
			</div>
			<a
				href='#'
				onClick={handleOpenModal}
				className='text-white text-base ml-4'>
				Search Games
			</a>
			{isModalOpen && <AddGameModal closeModal={handleCloseModal} />}
		</nav>
	);
};

export default Navbar;
