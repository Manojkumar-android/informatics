import { useState, useContext, useEffect } from 'react';
import SearchContext from "../../contexts/search/searchContext";
import DatabaseContext from "../../contexts/search/databaseContext";
import PaginationContext from "../../contexts/paginationContext";
import AuthorContext from "../../contexts/search/authorContext";
import SubjectContext from "../../contexts/search/subjectContext";
import PublisherContext from '../../contexts/search/publisherContext';
import ItemTypeContext from '../../contexts/search/itemTypeContext';
import DataTypeContext from '../../contexts/search/dataTypeContext';
import YearFromContext from '../../contexts/search/yearFromContext';
import JournalContext from '../../contexts/search/journalContext';

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    Database: true,
    Author: false,
    Subject: false,
    Date: false,
    Publisher: false,
    DataType: false,
    YearFrom: false,
    ItemType: false,
    Journals: false,

  });
  const { database, setDatabase, selected } = useContext(DatabaseContext);
  const { author, setAuthorData, clearAuthorValues, getCheckedAuthor } = useContext(AuthorContext);
  const { pageDetails, setPageDetails } = useContext(PaginationContext);
  const { subject, setSubject, clearSubjectValues } = useContext(SubjectContext);
  const { getFacets, search, loading } = useContext(SearchContext);
  const { publisher, setPublisher, clearPublisherValues } = useContext(PublisherContext);
  const { dataType, setDataType, clearDataTypeValues } = useContext(DataTypeContext);
  const { yearFrom, setYearFrom, clearYearFromValues } = useContext(YearFromContext);
  const { itemType, setItemType, clearItemTypeValues } = useContext(ItemTypeContext);
  const { journals, handleJournalsResponse, clearJournalsValues } = useContext(JournalContext);

  const [sections, setSections] = useState([]);

  useEffect(() => {
    // console.log(JSON.stringify(subject))

  }, [subject]);
  useEffect(() => {
    const updatedSections = [];

    if (database && selected === "All") updatedSections.push(database);
    if (author) updatedSections.push(author);
    if (subject) updatedSections.push(subject);
    //  if (publisher && selected === "OA") updatedSections.push(publisher);
    if (publisher) updatedSections.push(publisher);
    if (itemType && selected === "OA") updatedSections.push(itemType);
    if (dataType && selected === "Periodicals") updatedSections.push(dataType);
    if (yearFrom && selected === "Periodicals") updatedSections.push(yearFrom);
    if (journals && selected === "Periodicals") updatedSections.push(journals);
    // Add more conditions as necessary

    setSections(updatedSections);
  }, [database, author, subject, publisher, itemType, dataType, yearFrom, journals, selected]);
  const handleToggleSection = (section) => {
    // alert(section)
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const handleCheckboxChange = (label, optionLabel, disable, e) => {
    if (loading || disable) return;

    if (label == "Author") {
      let values = author.values
      const foundOption = values.find((option) => option.label === optionLabel);

      setAuthorData((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      // const author = getCheckedAuthor()\
      let filter = ""
      if (e.target.checked) {
        filter = `${optionLabel},equals`

      }
      search(filter, "author")
      //    alert(optionLabel)

    } else if (label == "Subject") {

      // alert(optionLabel)

      let values = subject.values
      const foundOption = values.find((option) => option.label === optionLabel);

      setSubject((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      // const author = getCheckedAuthor()\
      let filter = ""
      if (e.target.checked) {
        const encodedFSubject = encodeURIComponent(optionLabel);

        filter = `${encodedFSubject},equals`

      }
      search(filter, "subject")

    } else if (label == "Publisher") {

      // alert(optionLabel)

      let values = subject.values
      const foundOption = values.find((option) => option.label === optionLabel);

      setPublisher((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      // const author = getCheckedAuthor()\
      let filter = ""
      if (e.target.checked) {
        const encodedFSubject = encodeURIComponent(optionLabel);

        filter = `${encodedFSubject},equals`

      }
      search(filter, "publisher")

    } else if (label == "Item Type") {

      // alert(optionLabel)

      let values = subject.values
      const foundOption = values.find((option) => option.label === optionLabel);

      setItemType((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      // const author = getCheckedAuthor()\
      let filter = ""
      if (e.target.checked) {
        const encodedFSubject = encodeURIComponent(optionLabel);

        filter = `${encodedFSubject},equals`

      }
      search(filter, "itemtype")

    } else if (label == "Database") {

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

      search(updatedDatabase, "database")

    }

  }

  const handleViewMore = (e, href, type) => {
    // alert(href)
    getFacets(href, type)
  }

  const handleHide = (e, href, type) => {
    // alert(href)
    if (type == "Author") {
      clearAuthorValues()
    } else if (type == "Subject") {
      clearSubjectValues()
    } else if (type == "Publisher") {
      clearPublisherValues()
    } else if (type == "ItemType") {
      clearItemTypeValues()
    }
    getFacets(href, type)
  }
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
    <div className="max-h-lvh w-full px-4 bg-gray-100">
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
      <div className=" bg-white py-3">
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
                <ul className="px-0  text-[#717171] max-h-[350px] overflow-y-scroll">
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
                  {section.links?.next?.href && (
                    <button
                      onClick={(e) => handleViewMore(e, section.links?.next?.href, section.label)}
                      className='text-blue-500 text-low underline cursor-pointer bg-transparent border-0' >
                      view more</button>

                  )}
                  {section.links?.first?.href && (
                    <button
                      onClick={(e) => handleHide(e, section.links?.first?.href, section.label)}
                      className='text-blue-500 text-low underline cursor-pointer bg-transparent border-0' >
                      hide</button>

                  )}
                </div>
              </>
            )}
            <div className='border-b border-gray-300'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
