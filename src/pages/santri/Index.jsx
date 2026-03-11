import { useEffect, useState } from 'react';
import AlertNotFound from '../../components/AlertNotFound';
import CardHeader from '../../components/CardHeader';
import apiGet from '@/api/api-get';
import LoadingAbsolute from '../../components/LoadingAbsolute';

export default function Santri() {
	const [santri, setSantri] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
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
				<div className='flex items-center justify-center m-4 avatar'>
					<div className='w-40 rounded-full ring-accent ring-offset-2 ring-offset-base-100 ring-2'>
						<img src={santri.image_url || 'user-default.png'} />
					</div>
				</div>
				<table className='flex justify-center m-0 table-auto table-sm table-pin-rows'>
					<thead></thead>
					<tbody className=''>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>ID Santri</td>
							<td className='font-bold'>{santri?.id}</td>
						</tr>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>Nama</td>
							<td style={{ fontVariant: 'small-caps' }}>{santri?.nama}</td>
						</tr>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>Data Akhir</td>
							<td>{santri.data_akhir}</td>
						</tr>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>Alamat Lengkap</td>
							<td>{`${santri.alamat_lengkap}`}</td>
						</tr>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>Ayah</td>
							<td>{santri.ayah}</td>
						</tr>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>Ibu</td>
							<td>{santri.ibu}</td>
						</tr>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>Wali</td>
							<td>{`${santri.wali_nama} (${santri.wali_sex}; ${santri.wali_status}) `}</td>
						</tr>
						<tr className='border-b border-secondary'>
							<td className='italic font-light'>Telepon Wali</td>
							<td>{`${santri.wali_telepon || '-'}`}</td>
						</tr>
						<tr>
							<td className='italic font-light'>Email Wali</td>
							<td>{`${santri.wali_email || '-'}`}</td>
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
			{isLoading && <LoadingAbsolute />}
			{santri ? <RenderSantri /> : <AlertNotFound />}
		</>
	);
}
