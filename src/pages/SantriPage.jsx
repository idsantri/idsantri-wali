import { useEffect, useState } from 'react';
import { apiGet } from '../api';
import Notify from '../components/Notify';
import Loading from '../components/Loading';
import { Image } from 'react-bootstrap';
const Dashboard = () => {
	const [objNotify, setObjNotify] = useState({
		message: '',
		title: 'Error',
		code: '',
		isError: true,
		show: false,
		onClose: () =>
			setObjNotify((prevNotify) => ({ ...prevNotify, show: false })),
	});

	const [santri, setSantri] = useState(null);

	useEffect(() => {
		apiGet('/santri')
			.then((res) => {
				// console.log(response.status)
				setSantri(res.data.santri);
			})
			.catch((error) => {
				setObjNotify((prevState) => ({
					...prevState,
					message:
						error.response?.data?.message || 'Terjadi kesalahan',
					show: true,
					code: error.status,
				}));
				// console.error('e', error.response.data.message);
			});
	}, []);

	return (
		<div className="card p-2">
			<Notify {...objNotify} />
			<h2
				style={{
					fontSize: '1.4em',
					textAlign: 'center',
					fontWeight: 300,
				}}
			>
				Data Santri
			</h2>
			{santri ? (
				<>
					<Image
						lazy
						src={santri.image_url}
						thumbnail
						roundedCircle
						style={{
							width: '150px',
							height: '150px',
							objectFit: 'cover',
						}}
						className="d-flex mx-auto"
					/>
					<table className="table mt-4">
						<tbody>
							<tr>
								<td className="fst-italic">ID Santri</td>
								<td className="fw-bold">{santri?.id}</td>
							</tr>
							<tr>
								<td className="fst-italic">Nama</td>
								<td style={{ fontVariant: 'small-caps' }}>
									{santri?.nama}
								</td>
							</tr>
							<tr>
								<td className="fst-italic">Data Akhir</td>
								<td>{santri.data_akhir}</td>
							</tr>
							<tr>
								<td className="fst-italic">Alamat Lengkap</td>
								<td>{`${santri.alamat_lengkap}`}</td>
								{/* <td>{`${santri.jl} ${santri?.desa} ${santri?.kecamatan} ${santri?.kabupaten} ${santri?.provinsi}`}</td> */}
							</tr>
							<tr>
								<td className="fst-italic">Ayah</td>
								<td>{santri.ayah}</td>
							</tr>
							<tr>
								<td className="fst-italic">Ibu</td>
								<td>{santri.ibu}</td>
							</tr>
							<tr>
								<td className="fst-italic">Wali</td>
								<td>{`${santri.wali_nama} (${santri.wali_status}; ${santri.wali_sex}) `}</td>
							</tr>
						</tbody>
					</table>
					{/* <pre>{JSON.stringify(santri, null, 2)}</pre> */}
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Dashboard;
