import TopBarWithoutLogout from '../topbarwithoutlogout';
import Footer from '../footer_garden_city';
import { getResouceCategory } from "../../actions/resourceAction";
import React, { useState, useEffect } from 'react';

const Index = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getResouceCategory().then(res => {
            if (res.error) {
                console.log(res.error);
            } else {
                // alert(JSON.stringify(res))
                setCategories(res.categories); // Set the fetched categories data
            }
        });
    };

    return (
        <div className='w-full bg-gray-100 overflow-hidden'>
            <TopBarWithoutLogout />
            <div className="p-8">
                <h1 className="text-[32px] font-semibold text-left ml-6 mb-8">E-resource</h1>
                <div className="flex justify-between p-3 gap-5 overflow-x-auto ">
                    {categories.length > 0 && categories.map((category, index) => (
                        <div key={index} className="min-w-[250px] max-w-[350px]  max-h-[500px] bg-white flex flex-col rounded-lg  p-5">
                            {/* <img
                                src={category.imageUrl} // Dynamically use the image URL from the category data
                                alt={category.name} // Dynamically use the category name as alt text
                                className="w-[80px] h-[80px] mt-10 object-contain mb-4"
                            /> */}
                            <h2 className="text-center font-semibold mb-14 text-2xl">{category.displayName}</h2>
                            <ul className="items-start text-start pl-4 overflow-y-auto max-h-[250px]">
                                {/* {category.details.map((detail, i) => (
                                    <>
                                        <span dangerouslySetInnerHTML={{ __html: decodeURIComponent(detail.Name) }} />
                                    </>
                                ))} */}

                                {category.details.map((detail, i) => (
                                    <div key={i} className="mb-2">
                                        {detail.url && detail.url.trim() !== '' ? (
                                            <a
                                                href={detail.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: decodeURIComponent(detail.Name) }} />
                                            </a>
                                        ) : (
                                            <span dangerouslySetInnerHTML={{ __html: decodeURIComponent(detail.Name) }} />
                                        )}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Index;
