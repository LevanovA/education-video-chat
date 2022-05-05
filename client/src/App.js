import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Pages/Main';
import Translations from './Pages/Translations';
import Conference from './Pages/Conference';
import Wrapper from './Components/Wrapper';
import PageContent from './Components/PageContent';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Header>
					<Wrapper>
						<Menu theme="dark" mode="horizontal">
							<Menu.Item key={1}>
								<Link to={'/'}>Главная</Link>
							</Menu.Item>
							<Menu.Item key={2}>
								<Link to={'/translations'}>Все трансляции</Link>
							</Menu.Item>
							<Menu.Item key={3}>
								<Link to={'/conference/1'}>
									Текущая трансляция
								</Link>
							</Menu.Item>
						</Menu>
					</Wrapper>
				</Header>
				<Content>
					<Wrapper>
						<PageContent>
							<Routes>
								<Route path={'/'} element={<MainPage />} />
								<Route
									path={'/translations'}
									element={<Translations />}
								/>
								<Route
									path={'/conference/:id'}
									element={<Conference />}
								/>
							</Routes>
						</PageContent>
					</Wrapper>
				</Content>
				<Footer>
					<Wrapper>Footer</Wrapper>
				</Footer>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
