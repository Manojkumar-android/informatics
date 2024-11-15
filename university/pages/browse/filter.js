import { useState, useContext, useEffect } from 'react';
import BrowseContext from "../../contexts/browse/browseContext";
import DatabaseContext from "../../contexts/search/databaseContext";
import PaginationContext from "../../contexts/paginationContext";
import AuthorContext from "../../contexts/search/authorContext";
import SubjectContext from "../../contexts/search/subjectContext";
import PublisherContext from '../../contexts/search/publisherContext';
import ItemTypeContext from '../../contexts/search/itemTypeContext';
const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    Database: true,
    Author: false,
    Subject: false,
    Date: false,
    Publisher: false,
    ItemType: false,

  });
  const { database, setDatabase, selected } = useContext(DatabaseContext);
  const { subject, setSubject, clearSubjectValues } = useContext(SubjectContext);
  const { browse, loading } = useContext(BrowseContext);
  const { publisher, setPublisher, clearPublisherValues } = useContext(PublisherContext);
  const [sections, setSections] = useState([]);

  useEffect(() => {

  }, []);
  useEffect(() => {
    const updatedSections = [];

    if (database) updatedSections.push(database);

    // Add more conditions as necessary

    setSections(updatedSections);
  }, [database]);
  const handleToggleSection = (section) => {
    // alert(section)
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const handleCheckboxChange = (label, optionLabel, disable, e) => {
    if (loading || disable) return;

    if (label == "Database") {

      // alert(optionLabel)

      let values = database.values

      setDatabase((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      let updatedDatabase = {
        ...database,
        values: database.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      };

      browse(updatedDatabase, "database")

    }

  }
  const handleClearAll = () => {
    setOpenSections({
      Author: false,
      Subject: false,
      Date: false
    });
  };
  const handleViewMore = (e, href, type) => {
    // alert(href)
    getFacets(href, type)
  }

  // const handleHide = (e, href, type) => {
  //   // alert(href)
  //   if (type == "Author") {
  //     clearAuthorValues()
  //   } else if (type == "Subject") {
  //     clearSubjectValues()
  //   } else if (type == "Publisher") {
  //     clearPublisherValues()
  //   } else if (type == "ItemType") {
  //     clearItemTypeValues()
  //   }
  //   getFacets(href, type)
  // }
  // Function to dynamically manage sections using let
  const getSections = () => {

    return sections;
  };

  // Get the sections dynamically
  // let sections = getSections();
  function formatCount(count) {
    if (!count) return;
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return count.toString();
  }

  return (
    <div className="h-full mt-4 ">

      <div className=" h-full w-full px-4 bg-gray-100">
        {/* Top Part with Filter and Clear All */}
        <div className="bg-[#F58220] text-white p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            <div>Filter</div>
          </div>
          {/* <button className="text-white underline border-0  bg-transparent" onClick={handleClearAll}>
          Clear All
        </button> */}
        </div>
        <div className=" h-full bg-white py-3 ">
          {/* Expandable Sections */}
          {sections.map((section) => (
            <div key={section.label} className="px-4 ">
              <div
                className="flex justify-between items-center text-center cursor-pointer"
                onClick={() =>
                  handleToggleSection(section.label)
                }
              >
                <label className="block items-center text-black ">
                  {section.label}
                </label>
                <span className="text-black font-bold text-xl my-2">
                  {openSections[section.label] ? '-' : '+'}
                </span>
              </div>
              {openSections[section.label] && (
                <>
                  <ul className="px-0  text-[#717171]">
                    {section.values.map((option) => (
                      <li key={option.label} className="mb-2 flex items-center">
                        <input
                          type="checkbox"
                          checked={option.checked}
                          className="mr-2 h-[18px] w-[18px] flex-shrink-0"
                          onChange={(e) => handleCheckboxChange(section.label, option.label, option.disable, e)}
                        />
                        <div className="flex-grow">
                          {option.label}
                        </div>
                        {option.count && <div className="flex mx-2 bg-black text-white p-1 w-[45px] justify-center rounded-xl text-low">
                          {formatCount(option.count)}
                        </div>}
                      </li>
                    ))}
                  </ul>
                  <div className='flex justify-between'>
                    {/* {section.links?.next?.href && (
                    <button
                      onClick={(e) => handleViewMore(e, section.links?.next?.href, section.label)}
                      className='text-blue-500 text-low underline cursor-pointer bg-transparent border-0' >
                      view more</button>

                  )} */}
                    {/* {section.links?.first?.href && (
                    <button
                      onClick={(e) => handleHide(e, section.links?.first?.href, section.label)}
                      className='text-blue-500 text-low underline cursor-pointer bg-transparent border-0' >
                      hide</button>

                  )} */}
                  </div>
                </>
              )}
              <div className='border-b border-gray-300'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
