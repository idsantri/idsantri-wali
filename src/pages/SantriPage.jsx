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
		<>
			<Notify {...objNotify} />
			<div className="bg-color3">
				<h2
					style={{
						fontSize: '1.4em',
						textAlign: 'center',
						fontWeight: 300,
					}}
					className="m-0 p-2"
				>
					Data Santri
				</h2>
			</div>
			{santri ? (
				<>
					<Image
						lazy="true"
						src={santri.image_url}
						thumbnail
						roundedCircle
						style={{
							width: '150px',
							height: '150px',
							objectFit: 'cover',
						}}
						className="d-flex m-2 mx-auto "
					/>
					<table className="table m-0">
						<tbody>
							<tr>
								<td className="fst-italic fw-light">
									ID Santri
								</td>
								<td className="fw-bold">{santri?.id}</td>
							</tr>
							<tr>
								<td className="fst-italic fw-light">Nama</td>
								<td style={{ fontVariant: 'small-caps' }}>
									{santri?.nama}
								</td>
							</tr>
							<tr>
								<td className="fst-italic fw-light">
									Data Akhir
								</td>
								<td>{santri.data_akhir}</td>
							</tr>
							<tr>
								<td className="fst-italic fw-light">
									Alamat Lengkap
								</td>
								<td>{`${santri.alamat_lengkap}`}</td>
								{/* <td>{`${santri.jl} ${santri?.desa} ${santri?.kecamatan} ${santri?.kabupaten} ${santri?.provinsi}`}</td> */}
							</tr>
							<tr>
								<td className="fst-italic fw-light">Ayah</td>
								<td>{santri.ayah}</td>
							</tr>
							<tr>
								<td className="fst-italic fw-light">Ibu</td>
								<td>{santri.ibu}</td>
							</tr>
							<tr>
								<td className="fst-italic fw-light">Wali</td>
								<td>{`${santri.wali_nama} (${santri.wali_sex}; ${santri.wali_status}) `}</td>
							</tr>
						</tbody>
					</table>
					{/* <pre>{JSON.stringify(santri, null, 2)}</pre> */}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Dashboard;
