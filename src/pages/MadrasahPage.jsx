import { useEffect, useState } from 'react';
import { apiGet } from '../api';
import useNotify from '../hooks/use-notify';
import Notify from '../components/Notify';
import Loading from '../components/Loading';
import { Accordion, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function KelasPage() {
	const { objNotify, setObjNotify } = useNotify();
	const santri = JSON.parse(localStorage.getItem('santri'));
	const [kelas, setKelas] = useState(null);
	useEffect(() => {
		apiGet('/kelas')
			.then((res) => {
				setKelas(res.data.kelas);
			})
			.catch((error) => {
				setObjNotify((prevNotify) => ({
					...prevNotify,
					message: error.response?.data?.message || 'Terjadi kesalahan',
					show: true,
					code: error.status,
				}));
			});
	}, [setObjNotify]);

	return (
		<div>
			<Notify {...objNotify} />
			<div className='bg-color3'>
				<h2
					style={{
						fontSize: '1.4em',
						textAlign: 'center',
						fontWeight: 300,
					}}
					className='m-0 p-2'
				>
					Riwayat Kelas
				</h2>
			</div>
			{kelas ? (
				<>
					<Card className='my-2 bg-color2 text-center'>
						<Card.Body className='p-2 fw-bold'>{santri.nama}</Card.Body>
					</Card>
					<Accordion className='mt-2'>
						{kelas.map((k) => (
							<Accordion.Item eventKey={k.id} key={k.id}>
								<Accordion.Header className=''>
									<div className='fw-light'>
										{k.th_ajaran_h} | {k.tingkat_id} | {k.kelas}
									</div>
								</Accordion.Header>
								<Accordion.Body className='d-flex gap-2 justify-content-start p-2'>
									<Button className='' as={Link} to='/kelas/id/nilai' variant='outline-primary'>
										Nilai
									</Button>
									<Button className='' as={Link} to='/kelas/id/absensi' variant='outline-success'>
										Absensi
									</Button>
								</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>

					{/* <pre className='mt-3'>{JSON.stringify(kelas, null, 2)}</pre> */}
				</>
			) : (
				<Loading />
			)}
		</div>
	);
}
export default KelasPage;
