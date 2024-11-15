import { useState, useContext } from "react";
import SecondTopBar from '../secondtopbar_garden_city';
import Sidebar from './filter';
import List from './list';
import SearchContext from "../../contexts/search/searchContext";
import ErrorBoundary from '../errorBoundary';

const Search = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const { term, setTerm, search, loading, landing, setLanding, data } = useContext(SearchContext);
    const searchClick = async (e) => {

        if (term == "") return;
        e.preventDefault();

        search();
        setLanding(1)

    }
    const buttonsRow1 = [
        { label: "All", count: "14,400+", width: "w-[185px]", id: "row1-0" },
        { label: "Library Books", count: "8,300+", width: "w-[265px]", id: "row1-1" },
        { label: "Periodicals", count: "4,200+", width: "w-[237px]", id: "row1-2" },
        { label: "IR", count: "3,200+", width: "w-[177px]", id: "row1-3" },
    ];

    const buttonsRow2 = [
        { label: "IR", count: "3,200+", width: "w-[177px]", id: "row2-0" },
        { label: "OA", count: "6,300+", width: "w-[177px]", id: "row2-1" },
        { label: "Thesis/Dissertations", count: "3,300+", width: "w-[337px]", id: "row2-2" },
        { label: "E-Resources", count: "+4,500", width: "w-[253px]", id: "row2-3" },
    ];

    return (
        landing == 0 ? <div className="flex flex-col min-h-screen">
            <div className="flex flex-grow bg-white p-0">
                <main className="flex-grow p-0 flex flex-col items-end relative">
                    <img
                        src="/people_reading.png"
                        alt="Knowledge"
                        className="w-[704.91px] h-[470px] object-cover"
                    />
                    <div className="absolute top-12 left-44">
                        <h1 className="text-8xl md:text-8xl  font-light text-black mb-8">
                            Best Source of <br /> Knowledge
                        </h1>
                        <form onSubmit={searchClick}>
                            <div className="flex items-center absolute top-[335px] h-[60px] w-[996px] border text-black bg-white rounded-lg shadow-xl">
                                <input
                                    type="text"
                                    placeholder="Enter search items..."
                                    value={term}
                                    required
                                    onChange={(e) => setTerm(e.target.value)}
                                    className="flex-grow p-4 h-full rounded-l-lg  outline-none border-0 text-subheader"
                                />
                                <button type="submit" className="bg-[#F58220] p-4 rounded-r-lg h-full outline-none border-0" >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-white cursor-pointer "
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-4.35-4.35M18 11a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-16 flex flex-col px-40 justify-center items-center space-y-8   mb-16">
                        <div className="flex space-x-9">
                            {buttonsRow1.map((button) => (
                                <button
                                    key={button.id}
                                    className={`py-8 text-[24px] font-semibold border border-gray-300 rounded-lg text-center flex flex-col items-center justify-center ${selectedButton === button.id
                                        ? "bg-[#F58220] text-white"
                                        : "bg-white text-black border border-gray-300"
                                        } ${button.width} mx-2`}
                                    onClick={() => setSelectedButton(button.id)}
                                >
                                    {button.label}
                                    <span className="text-[24px] mt-2">{button.count}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex space-x-9">
                            {buttonsRow2.map((button) => (
                                <button
                                    key={button.id}
                                    className={`py-8 text-[24px] font-semibold border rounded-lg text-center flex flex-col items-center justify-center ${selectedButton === button.id
                                        ? "bg-[#F58220] text-white"
                                        : "bg-white text-black border-gray-300"
                                        } ${button.width} mx-2`}
                                    onClick={() => setSelectedButton(button.id)}
                                >
                                    {button.label}
                                    <span className="text-[24px] mt-2">{button.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

        </div>
            : <div className="my-3 bg-gray-100">
                <SecondTopBar />
                <div className="flex flex-grow">
                    <aside className="w-1/4 bg-gray-100">
                        <Sidebar />
                    </aside>
                    <main className="w-3/4 px-4 bg-gray-100">


                        {(data.length == 0 && !loading) ? (

                            <h1> Search results not found </h1>
                        )
                            :
                            <ErrorBoundary>
                                <List />
                            </ErrorBoundary>
                        }

                    </main>
                </div>
            </div>

    );
}

export default Search;
