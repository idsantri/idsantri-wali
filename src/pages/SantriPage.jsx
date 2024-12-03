import { useEffect, useState } from 'react';
import { apiGet } from '../api';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';
import { notifyError } from '../components/Notify';

const SantriPage = () => {
	const [santri, setSantri] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		apiGet('/santri')
			.then((res) => {
				setSantri(res.data.santri);
				localStorage.setItem('santri', JSON.stringify(res.data.santri));
			})
			.catch((error) => {
				notifyError({ message: error.response?.data?.message || 'Terjadi kesalahan', title: 'Error ' + error?.status || '' });
				// console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<CardHeader title='Data Santri' />
			{isLoading && <Loading style={{ scale: 4 }} />}

			{santri ? (
				<>
					<div className='avatar m-4 flex items-center justify-center'>
						<div className='ring-orange-200 ring-offset-base-100 w-40 rounded-full ring ring-offset-1'>
							<img src={santri.image_url || 'user-default.png'} />
						</div>
					</div>
					<table className='table-sm table-auto table-pin-rows m-0 flex justify-center'>
						<thead></thead>
						<tbody className=''>
							<tr className='border-b border-emerald-300'>
								<td className='italic font-light'>ID Santri</td>
								<td className='font-bold'>{santri?.id}</td>
							</tr>
							<tr className='border-b border-emerald-300'>
								<td className='italic font-light'>Nama</td>
								<td style={{ fontVariant: 'small-caps' }}>{santri?.nama}</td>
							</tr>
							<tr className='border-b border-emerald-300'>
								<td className='italic font-light'>Data Akhir</td>
								<td>{santri.data_akhir}</td>
							</tr>
							<tr className='border-b border-emerald-300'>
								<td className='italic font-light'>Alamat Lengkap</td>
								<td>{`${santri.alamat_lengkap}`}</td>
								{/* <td>{`${santri.jl} ${santri?.desa} ${santri?.kecamatan} ${santri?.kabupaten} ${santri?.provinsi}`}</td> */}
							</tr>
							<tr className='border-b border-emerald-300'>
								<td className='italic font-light'>Ayah</td>
								<td>{santri.ayah}</td>
							</tr>
							<tr className='border-b border-emerald-300'>
								<td className='italic font-light'>Ibu</td>
								<td>{santri.ibu}</td>
							</tr>
							<tr className='border-b border-emerald-300'>
								<td className='italic font-light'>Wali</td>
								<td>{`${santri.wali_nama} (${santri.wali_sex}; ${santri.wali_status}) `}</td>
							</tr>
							<tr>
								<td className='italic font-light'>Telepon</td>
								<td>{`${santri.wali_telepon || '-'}`}</td>
							</tr>
						</tbody>
					</table>
					{/* <pre>{JSON.stringify(santri, null, 2)}</pre> */}
				</>
			) : null}
		</>
	);
};

export default SantriPage;
