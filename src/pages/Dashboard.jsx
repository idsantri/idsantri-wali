import { useEffect, useState } from 'react';
import { apiGet } from '../api';

const Dashboard = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		apiGet('/santri')
			.then((res) => {
				// console.log(response.status)
				setData(res.data);
			})
			.catch((err) => console.error('e', err.response.data.message));
	}, []);

	return (
		<div>
			<h1>Dashboard</h1>
			{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
		</div>
	);
};

export default Dashboard;
