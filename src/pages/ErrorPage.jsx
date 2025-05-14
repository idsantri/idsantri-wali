import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='flex items-center justify-center min-h-screen bg-jingga-400'>
				<div className='mx-auto text-center text-jingga-50'>
					<p className='text-4xl font-bold '>Ups...</p>
					<h1 className='my-4 text-2xl font-light'>Halaman tidak ditemukan!!!</h1>
					<button className='w-20 font-medium rounded-md btn btn-outline btn-sm' onClick={() => navigate(-1)}>
						Kembali
					</button>
				</div>
			</div>
		</>
	);
};
export default ErrorPage;
