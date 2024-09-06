import TopBarWithoutLogout from '../topbarwithoutlogout';
import Footer from '../footer_garden_city';

const Index = () => {
    const resource = []
    return (
        <>
            <TopBarWithoutLogout />
            <div className="p-8">
                <h1 className="text-[32px] font-semibold text-left ml-6 mb-8">E-resource</h1>
                <div className="flex justify-between p-3 gap-6">
                    {/* Flex Box 1 */}
                    <div className="w-[318px] h-[536px] bg-white flex flex-col rounded-lg items-center p-4">
                        <img src="/resource/koha.png" alt="Koha" className="w-[80px] h-[80px] mt-10 object-contain mb-4" />
                        <h2 className="text-center font-semibold mb-14 text-2xl">Koha</h2>
                        <ul className="list-disc text-left pl-4">
                            <li className="mb-8 ">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                        </ul>
                    </div>

                    {/* Flex Box 2 */}
                    <div className="w-[318px] h-[536px] bg-white flex rounded-lg flex-col items-center p-4">
                        <img src="/resource/jgate.png" alt="J-Gate" className="w-[90px] h-[90px] mt-10 object-contain mb-4" />
                        <h2 className="text-center font-semibold mb-14 text-2xl">J-Gate</h2>
                        <ul className="list-disc text-left pl-4">
                            <li className="mb-8 ">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                        </ul>
                    </div>

                    {/* Flex Box 3 */}
                    <div className="w-[318px] h-[536px] bg-white rounded-lg flex flex-col items-center p-4">
                        <img src="/resource/dspace.png" alt="DSpace" className="w-[80px] h-[80px] mt-10 object-contain mb-4" />
                        <h2 className="text-center font-semibold mb-14 text-2xl">DSpace</h2>
                        <ul className="list-disc text-left pl-4">
                            <li className="mb-8 ">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                        </ul>
                    </div>

                    {/* Flex Box 4 */}
                    <div className="w-[318px] h-[536px] bg-white flex rounded-lg flex-col items-center p-4">
                        <img src="/resource/others.png" alt="Others" className="w-[80px] h-[80px] mt-10 object-contain mb-4" />
                        <h2 className="text-center font-semibold mb-14 text-2xl">Others</h2>
                        <ul className="list-disc text-left pl-4">
                            <li className="mb-8 ">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                            <li className="mb-8">Lorem ipsum dolor sit amet</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}
export default Index;

