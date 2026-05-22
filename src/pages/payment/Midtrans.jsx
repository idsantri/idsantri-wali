import { useEffect } from 'react';
import { midtrans } from '../../models/payment';

const Midtrans = () => {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
		script.setAttribute('data-client-key', 'Mid-client-iYnCvu9vvxMfCaML');
		script.async = true;

		document.head.appendChild(script);

		return () => {
			document.head.removeChild(script);
		};
	}, []);

	const handlePayment = async () => {
		// This function would typically call your backend to create a payment transaction
		// and then use the Midtrans SDK to process the payment.
		const data = await midtrans({
			amount: 100000, // Example amount
			order_id: 'ORDER-12345', // Example order ID
		});
		// console.log(data);
		window.snap.pay(data.token, {
			onSuccess: function (result) {
				console.log('Payment successful:', result);
			},
			onError: function (error) {
				console.error('Payment error:', error);
			},
			onClose: function () {
				console.log('Payment closed');
			},
			onPending: function (result) {
				console.log('Payment pending', result);
			},
		});
	};
	return (
		<div>
			<h1>Midtrans Payment</h1>
			<p>This is a simple Midtrans payment page.</p>
			<button className='btn btn-primary' onClick={handlePayment}>
				Pay with Midtrans
			</button>
			{/* In a real application, you would integrate the Midtrans SDK here */}
		</div>
	);
};

export default Midtrans;
