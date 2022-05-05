import './Translations.scss';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import socket from '../../Socket';
import ACTIONS from '../../Socket/actions';

const { Title } = Typography;

const Translations = () => {
	const navigate = useNavigate();
	const [rooms, updateRooms] = useState([]);

	useEffect(() => {
		socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
			updateRooms(rooms);
		});
	}, []);

	return (
		<div className="translations">
			<Title level={2}>Трансляции</Title>
			<ul>
				{rooms.map((roomID) => {
					return (
						<li key={roomID}>
							{roomID}
							<button
								onClick={() => {
									navigate(`/conference/${roomID}`);
								}}
							>
								Присоединится
							</button>
						</li>
					);
				})}
			</ul>

			<button
				onClick={() => {
					navigate(`/conference/${v4()}`);
				}}
			>
				Создать комнату
			</button>
		</div>
	);
};

export default Translations;
