import React from 'react';
import TopBarWithoutLogout from './topbarwithoutlogout';
import Footer from './footer_garden_city';

const About = () => {

    return (
        <div className="p-4">
            <TopBarWithoutLogout />

            {/* Top Bar */}


            <div className="bg-gray-100 text-black flex flex-col items-center space-y- p-4">

                <div className="flex w-full">

                    <main className="px-4 bg-gray-100 w-full">

                        <div className="containr mx-ato">
                            {/* Top Image with Text */}
                            <div className=" mb-8">
                                <img src="/about/gardencity about.png" alt="Top" className="w-full h-[497px]" />
                                <div className=" inset-0 flex items-center justify-center">
                                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl mb-40 font-bold">About Garden City University</h1>
                                </div>
                            </div>

                            {/* Four Images */}
                            <div className=" grid grid-cols-4 gap-4 px-24 mb-8 -mt-40">
                                <img src="/about/gardencity com1.png" alt="Image 1" className="w-[251px] h-[278px]" />
                                <img src="/about/gardencity com2.png" alt="Image 2" className="w-[251px] h-[278px]" />
                                <img src="/about/gardencity com3.png" alt="Image 3" className="w-[251px] h-[278px]" />
                                <img src="/about/gardencity com4.png" alt="Image 4" className="w-[251px] h-[278px]" />
                            </div>

                            {/* Section with Heading, Image, and Description */}
                            <div className="flex flex-col lg:flex-row px-2">
                                <div className="lg:w-1/3">
                                    <h2 className="text-2xl font-bold mb-4">What makes us distinctive?</h2>
                                    <div className="mb-11">
                                        <img src="/about/gardencity student.png" alt="Distinctive" className="w-[433px] h-[191px]" />
                                    </div>
                                    <p className="text-xl mb-11">
                                        The university has established strong partnerships with various industries, which allows students to gain practical experience in their fields of study.
                                        These collaborations also help students acquire the skills and knowledge required to succeed in the workforce after graduation.
                                    </p>
                                </div>
                                <div className="w-full grid grid-cols-2 gap-4 mt-8 lg:mt-0 lg:ml-8">
                                    <img src="/about/gardencity det1.png" alt="Side Image 1" className="w-[396px] h-[310px]" />
                                    <img src="/about/gardencity det2.png" alt="Side Image 2" className="w-[396px] h-[310px]" />
                                    <img src="/about/gardencity det3.png" alt="Side Image 3" className="w-[396px] h-[310px]" />
                                    <img src="/about/gardencity det4.png" alt="Side Image 4" className="w-[396px] h-[310px]" />
                                </div>
                            </div>

                            {/* Vision and Mission Section */}
                            <div className="flex flex-col lg:flex-row px-2 mt-8">
                                <div className="lg:w-1/2 ">
                                    <img src="/about/gardencity vision.png" alt="Vision" className="w-[385px] h-[385px] mb-4" />
                                    <img src="/about/gardencity mission.png" alt="Mission" className="w-[385px] h-[385px]" />
                                    <p className="text-xl mt-5">
                                        The Trust began its operations with Garden City College of Science and Management Studies
                                        which has an “A – Grade”, the highest conferred to an educational institution, when assessed
                                        by the National Assessment and Accreditation Council (NAAC) – the premier accreditation body
                                        under the UGC consecutively in three cycles of accreditation. The legacy of Garden City
                                        University comes from the Garden City Group of Institutions established in 1992.
                                        In 2013, the Government of Karnataka passed the “Garden City University Act”, taking into consideration
                                        the merits of the Garden City Education Trust. The Garden City University Act received the assent of
                                        the Governor of Karnataka on 26th March 2013 and was published in the Karnataka Gazette on 12th April
                                        2013. A new university campus is being developed in a lush green area spread over 50 acres of land,
                                        adjacent to the Volvo manufacturing plant. This is a part of the 150 acres township envisaged by
                                        Dr Joseph V G which would have Knowledge Parks, IT and BT Parks, Hotels and Convention Halls,
                                        Shopping Malls and Residential areas.Our vision and belief that social development is an avenue
                                        for nation building, is inculcated through our approach and our policies.
                                    </p>
                                </div>
                                <div className="lg:w-1/2 flex flex-col justify-between">
                                    <h2 className="text-2xl font-bold">History of <br /> Garden City University</h2>
                                    <div>
                                        <img src="/about/gardencity history.png" alt="History" className="ml-36 w-[433px] h-[191px]" />
                                    </div>
                                    <p className="text-xl">
                                        Garden City Education Trust was established in 1992 by Dr. Joseph V.G. with the support of like-minded educationists like Prof. Shivarudrappa – former Dean,
                                        Karnataka University, Dr. Hanumanthappa – former Vice Chancellor, Bangalore University, Prof V.B. Coutinho – former Vice Chancellor, Gulbarga University and
                                        Prof. Rame Gowda – former Vice Chancellor of the Karnataka State Open University. The Trust was established to set up centres for educational excellence that
                                        would accept only qualitative practices nurturing students with value-based education.
                                    </p>

                                    <div>
                                        <img src="/about/gardencity student2.png" alt="History" className="ml-36 w-[433px] h-[632px] mt-5" />
                                    </div>
                                </div>

                            </div>
                            <button
                                style={{
                                    background: 'linear-gradient(90deg, #5B1610 0%, #F1801F 100%)',
                                    color: 'white',
                                    width: '303px',
                                    height: '52px',
                                    fontSize: 'lg',
                                    borderRadius: '25px'
                                }}
                                className="mt-8"
                            >
                                Read about GCU Concept
                            </button>
                        </div>
                    </main>
                </div>
            </div>








            <Footer />
        </div>

    );
};

export default About;