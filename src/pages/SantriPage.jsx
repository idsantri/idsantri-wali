import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import CardHeader from '../components/CardHeader';
import apiGet from '../api/api-get';
import AlertNotFound from '../components/AlertNotFound';

const SantriPage = () => {
	const [santri, setSantri] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		apiGet({ endPoint: 'santri' }).then((res) => {
			if (res && res.santri) {
				setSantri(res.santri);
				localStorage.setItem('santri', JSON.stringify(res.santri));
			}
			setIsLoading(false);
		});
	}, []);

	function RenderSantri() {
		return (
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
		);
	}

	return (
		<>
			<CardHeader title='Data Santri' />
			{isLoading ? <Loading /> : santri ? <RenderSantri /> : <AlertNotFound />}
		</>
	);
};

export default SantriPage;
