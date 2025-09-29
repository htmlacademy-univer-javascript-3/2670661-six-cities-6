import {Place} from '../entities/place/model/types.ts';
import {MainPage} from '../pages/main-page/main-page.tsx';

type AppProps = {
  places: Place[];
};

export const App = ({places}: AppProps) => <MainPage places={places}/>;
