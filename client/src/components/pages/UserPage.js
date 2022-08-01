import React from 'react';
import {useParams} from 'react-router-dom';

const UserPage = () => {
	const params = useParams();

	console.log(params);

  return <h1>UserPage</h1>;
};

export default UserPage;
