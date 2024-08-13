import TopBarWithoutLogout from './topbarwithoutlogout';
import SecondTopBar from './secondtopbar_garden_city';
import Microcontroller from './search/list';
import Search from './search';
import Footer from './footer_garden_city';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">


            <TopBarWithoutLogout />
            <Search />
            <Footer />

        </div >
    );
}