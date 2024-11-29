import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className='min-h-screen bg-jingga-400 flex items-center justify-center'>
				<div className='text-center mx-auto text-jingga-50'>
					<p className=' text-4xl font-bold'>Ups...</p>
					<h1 className='text-2xl font-light my-4'>Halaman tidak ditemukan!!!</h1>
					<button className='btn btn-outline font-medium btn-sm rounded-md w-20' onClick={() => navigate(-1)}>
						Kembali
					</button>
				</div>
			</div>
		</>
	);
};
export default ErrorPage;
