import React from 'react';
import TopBarWithoutLogout from './topbarwithoutlogout';
import Footer from './footer_garden_city';

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Bar */}
            <TopBarWithoutLogout />

            {/* Main Content */}
            <div className="flex-1 bg-gray-100">

                {/* Google Map Iframe */}
                <div className="relative mb-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d971.7909727570018!2d77.70645216952012!3d13.025233199205935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae113db3d4cb07%3A0xaea9567ef8f072e3!2sGarden%20City%20University!5e0!3m2!1sen!2sin!4v1722841613943!5m2!1sen!2sin"
                        width="100%"
                        height="650px"
                        style={{ border: '0' }}
                        allowFullScreen
                        loading="lazy"
                        title="Google Map">
                    </iframe>
                </div>

                {/* Flex Box with Content */}
                <div className="flex justify-start" style={{ height: '840px' }}>
                    <div className="flex flex-col justify-start items-start text-left" style={{ width: '836px', backgroundColor: '#FDB46A', padding: '120px', margin: '0' }}>
                        <h1 className='text-black text-3xl font-semibold mb-8'>Garden City University - City Office</h1>

                        <div className="flex items-center mb-8">
                            <img src="/contact/location.png" alt="location" className="w-[77px] h-[81px] mr-4" />
                            <div>
                                <h2 className='text-black text-2xl font-semibold'>Visit Our Campus</h2>
                                <p className='text-black text-xl'>16th KM, Old Madras Road, Bangalore –<br /> 560 049, Karnataka</p>
                            </div>
                        </div>

                        <div className="flex items-center mb-8">
                            <img src="/contact/call.png" alt="call" className="w-[77px] h-[81px] mr-4" />
                            <div>
                                <h2 className='text-black text-2xl font-semibold'>Call Us</h2>
                                <p className='text-black text-xl'>Mobile: +91 90 1992 1992 <br /> Landline: +91 (80) 6648 7600</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <img src="/contact/mail.png" alt="mail" className="w-[77px] h-[81px] mr-4" />
                            <div>
                                <h2 className='text-black text-2xl font-semibold'>Email Us</h2>
                                <p className='text-black text-xl'>pro@gardencity.university</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Flex Box with Form */}
            <div className="absolute right-32 top-[900px] flex justify-end" style={{ height: '622px', width: '490px' }}>
                <div className="flex flex-col justify-start items-start text-left rounded-xl bg-pink-100 shadow-lg p-8" style={{ width: '100%', height: '100%' }}>
                    <h1 className='text-black text-3xl font-semibold mb-4'>Contact Us</h1>
                    <p className='text-black text-xl mb-4'>Lorem ipsum dolor sit amet consectetur. Sit facilisi est lacus nisl et aliquet nulla condimentum.</p>

                    <input type="text" placeholder="Name" className="mb-4 p-2 border rounded-lg border-gray-300 w-full" />
                    <input type="text" placeholder="Contact Number" className="mb-4 p-2 border rounded-lg border-gray-300 w-full" />
                    <input type="email" placeholder="Email ID" className="mb-4 p-2 border rounded-lg border-gray-300 w-full" />
                    <textarea placeholder="Message" className="mb-4 p-2 border rounded-lg border-gray-300 w-full h-32"></textarea>
                    <button className="bg-gradient-to-r from-[#5B1610] to-[#F1801F] rounded-lg text-white px-4 py-2 w-full">Send</button>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Contact;