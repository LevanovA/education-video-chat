import './Conference.scss';
// import socket from '../../Socket';
import { useParams } from 'react-router-dom';
import useWebRTC, { LOCAL_VIDEO } from '../../Hooks/useWebRTC';

const Conference = () => {
	const { id: roomID } = useParams();

	const { clients, provideMediaRef } = useWebRTC(roomID);

	console.log(clients);

	return (
		<div className="translations">
			{clients.map((clientID) => {
				return (
					<div key={clientID}>
						<video
							ref={(instance) => {
								provideMediaRef(clientID, instance);
							}}
							autoPlay
							playsInline
							muted={clientID === LOCAL_VIDEO}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Conference;
