import { BrowserRouter } from '@micra/react-router-web-router';
import { HomePageRoute } from 'pages/Home/route';

const router = use<BrowserRouter>('Router');

router.view(HomePageRoute);
