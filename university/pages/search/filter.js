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
import TopicsContext from '../../contexts/search/topicContext';
import { AutoComplete } from 'primereact/autocomplete';

const Sidebar = () => {

  const { database, setDatabase, selected } = useContext(DatabaseContext);
  const { pageDetails, setPageDetails } = useContext(PaginationContext);
  const { author, setAuthorData, clearAuthorValues, getCheckedAuthor } = useContext(AuthorContext);
  const { publisher, setPublisher, clearPublisherValues } = useContext(PublisherContext);
  const { itemType, setItemType, clearItemTypeValues } = useContext(ItemTypeContext);

  const { subject, setSubject, clearSubjectValues } = useContext(SubjectContext);
  const { getFacets, search, loading, searchFacets, data } = useContext(SearchContext);
  const { topics, setTopics, clearTopicsValues } = useContext(TopicsContext);
  const { dataType, setDataType, clearDataTypeValues } = useContext(DataTypeContext);
  const { yearFrom, setYearFrom, clearYearFromValues } = useContext(YearFromContext);
  const { journals, setJournals, clearJournalsValues } = useContext(JournalContext);
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
    Topics: false,

  });
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // console.log(JSON.stringify(subject))


  }, [subject]);
  useEffect(() => {
    const updatedSections = [];

    if (database && selected === "All") updatedSections.push(database);
    if (author) updatedSections.push(author);
    if (subject && (selected === "Periodicals" || selected === "OA" || selected === "All")) updatedSections.push(subject);
    //  if (publisher && selected === "OA") updatedSections.push(publisher);
    if (publisher && (selected === "Periodicals" || selected === "OA" || selected === "All")) updatedSections.push(publisher);
    if (itemType && (selected === "OA" || selected === "Library Books")) updatedSections.push(itemType);
    if (dataType && selected === "Periodicals") updatedSections.push(dataType);
    if (yearFrom && selected === "Periodicals") updatedSections.push(yearFrom);
    if (journals && selected === "Periodicals") updatedSections.push(journals);
    if (topics && selected === "Library Books") updatedSections.push(topics);
    // Add more conditions as necessary

    setSections(updatedSections);
  }, [database, author, subject, publisher, itemType, dataType, yearFrom, journals, selected, topics]);
  const handleToggleSection = (section) => {
    // alert(section)
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const handleSearchTermChange = (value, label) => {


    if (label == "Author") {
      setAuthorData((prevState) => ({
        ...prevState,
        searchTerm: value
      }));
    } else if (label == "Item Type") {
      setItemType((prevState) => ({
        ...prevState,
        searchTerm: value
      }));
    } else if (label == "Publisher") {
      setPublisher((prevState) => ({
        ...prevState,
        searchTerm: value
      }));
    } else if (label == "Subject") {
      setSubject((prevState) => ({
        ...prevState,
        searchTerm: value
      }));
    }

  }
  const getSelectedValues = () => {
    let appliedFilters = []
    const authorFilter = author.values.filter(item => item.checked)
    const subjectFilter = subject.values.filter(item => item.checked)
    const publisherFilter = publisher.values.filter(item => item.checked)
    const itemTypeFilter = itemType.values.filter(item => item.checked)
    const yearFromFilter = yearFrom.values.filter(item => item.checked)
    const dataTypeFilter = dataType.values.filter(item => item.checked)
    const journalsFilter = journals.values.filter(item => item.checked)

    if (authorFilter.length > 0) {
      authorFilter.map(filter => {
        const encodedLabel = encodeURIComponent(filter.label);
        const obj = { type: "author", value: `${encodedLabel}` }
        appliedFilters.push(obj)
      });

    }
    if (subjectFilter) {

      subjectFilter.map(filter => {
        const encodedLabel = encodeURIComponent(filter.label);
        const obj = { type: "subject", value: `${encodedLabel}` }
        appliedFilters.push(obj)
      });
    }
    if (publisherFilter) {

      publisherFilter.map(filter => {
        const encodedLabel = encodeURIComponent(filter.label);
        const obj = { type: "publisher", value: `${encodedLabel}` }
        appliedFilters.push(obj)
      });
    }
    if (itemTypeFilter) {

      itemTypeFilter.map(filter => {
        const encodedLabel = encodeURIComponent(filter.label);
        const obj = { type: "itemtype", value: `${encodedLabel}` }
        appliedFilters.push(obj)
      });
    }
    if (yearFrom) {

      yearFromFilter.map(filter => {
        const encodedLabel = encodeURIComponent(filter.label);
        const obj = { type: "yearFrom", value: `${encodedLabel}` }
        appliedFilters.push(obj)
      });
    }
    if (dataType) {

      dataTypeFilter.map(filter => {
        const encodedLabel = encodeURIComponent(filter.label);
        const obj = { type: "datatype", value: `${encodedLabel}` }
        appliedFilters.push(obj)
      });
    }
    if (journals) {

      journalsFilter.map(filter => {
        const encodedLabel = encodeURIComponent(filter.label);
        const obj = { type: "journals", value: `${encodedLabel}` }
        appliedFilters.push(obj)
      });
    }
    return appliedFilters;
  };
  const handleCheckboxChange = (label, optionLabel, disable, e) => {
    if (loading || disable) return;


    let filter = [...getSelectedValues()]
    if (label == "Author") {
      let values = author.values
      setAuthorData((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      const encodedLabel = encodeURIComponent(optionLabel);

      if (e.target.checked) {
        const obj = { type: "author", value: `${encodedLabel}`, displayName: optionLabel }
        filter.push(obj)
      } else {
        filter = filter.filter(
          (f) => !(f.type === "author" && f.value == `${encodedLabel}`)
        );
      }
      search(filter, "author")

    }
    else if (label == "Subject") {

      //   // alert(optionLabel)

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
      if (e.target.checked) {
        const encodedLabel = encodeURIComponent(optionLabel);
        const obj = { type: "subject", value: `${encodedLabel}`, displayName: optionLabel }
        filter.push(obj)
      } else {
        filter = filter.filter(
          (f) => !(f.type === "subject" && f.value == `${encodeURIComponent(optionLabel)}`)
        );
      }
      search(filter, "subject")

    }
    else if (label == "Publisher") {

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
      if (e.target.checked) {
        const encodedLabel = encodeURIComponent(optionLabel);
        const obj = { type: "publisher", value: `${encodedLabel}`, displayName: optionLabel }
        filter.push(obj)
      } else {
        filter = filter.filter(
          (f) => !(f.type === "publisher" && f.value == `${encodeURIComponent(optionLabel)}`)
        );
      }
      search(filter, "publisher")

    }
    else if (label == "Item Type") {

      // alert(optionLabel)

      let values = subject.values

      setItemType((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      if (e.target.checked) {
        const encodedLabel = encodeURIComponent(optionLabel);
        const obj = { type: "itemtype", value: `${encodedLabel}`, displayName: optionLabel }
        filter.push(obj)
      } else {
        filter = filter.filter(
          (f) => !(f.type === "itemtype" && f.value == `${encodeURIComponent(optionLabel)}`)
        );
      }
      search(filter, "itemtype")

    } else if (label == "Year From") {

      // alert(optionLabel)

      let values = subject.values

      setYearFrom((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      if (e.target.checked) {
        const encodedLabel = encodeURIComponent(optionLabel);
        const obj = { type: "yearFrom", value: `${encodedLabel}`, displayName: optionLabel }
        filter.push(obj)
      } else {
        filter = filter.filter(
          (f) => !(f.type === "yearFrom" && f.value == `${encodeURIComponent(optionLabel)}`)
        );
      }
      search(filter, "yearFrom")

    } else if (label == "Data Type") {

      // alert(optionLabel)

      let values = subject.values

      setDataType((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      if (e.target.checked) {
        const encodedLabel = encodeURIComponent(optionLabel);
        const obj = { type: "datatype", value: `${encodedLabel}`, displayName: optionLabel }
        filter.push(obj)
      } else {
        filter = filter.filter(
          (f) => !(f.type === "datatype" && f.value == `${encodeURIComponent(optionLabel)}`)
        );
      }
      search(filter, "datatype")

    } else if (label == "Journals") {

      // alert(optionLabel)

      let values = subject.values

      setJournals((prevState) => ({
        ...prevState,
        values: prevState.values.map((option) =>
          option.label === optionLabel
            ? { ...option, checked: e.target.checked }
            : option
        ),
      }));
      if (e.target.checked) {
        const encodedLabel = encodeURIComponent(optionLabel);
        const obj = { type: "journals", value: `${encodedLabel}`, displayName: optionLabel }
        filter.push(obj)
      } else {
        filter = filter.filter(
          (f) => !(f.type === "journals" && f.value == `${encodeURIComponent(optionLabel)}`)
        );
      }
      search(filter, "journals")

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

      search(filter, "database", null, updatedDatabase)

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

  const handleDropdownSearchFacets = (event, label) => {
    let filter = [...getSelectedValues()]
    let isPageZero = false;
    let betweenData = 0; // Initialize this outside the condition
    let checked = ''
    // Common logic to extract and handle `betweenData`
    if (event.value) {
      let result = event.value.replace(/\(.*\)/, ''); // Remove parentheses
      result = result.trim(); // Clean up white spaces
      // let insideParentheses = event.value.match(/\((.*?)\)/); // Extract content inside parentheses

      // if (insideParentheses) {
      //   betweenData = parseInt(insideParentheses[1], 10); // Parse the value as an integer
      //   if (betweenData < 10) {
      //     isPageZero = true; // Set isPageZero if condition matches
      //   }
      // }
      result = encodeURIComponent(result);
      checked = `${result}`;
    }

    // Label-based logic
    switch (label) {
      case "Author":
        setAuthorData((prevState) => ({
          ...prevState,
          searchTerm: event.value,
        }));

        const obj = { type: "author", value: `${checked}` }
        filter.push(obj)
        search(filter, "author", isPageZero);
        break;

      case "Item Type":
        setItemType((prevState) => ({
          ...prevState,
          searchTerm: event.value,
        }));
        const obj1 = { type: "itemtype", value: `${checked}` }
        filter.push(obj1)
        search(filter, "itemtype", isPageZero);
        break;

      case "Publisher":
        setPublisher((prevState) => ({
          ...prevState,
          searchTerm: event.value,
        }));
        const obj2 = { type: "publisher", value: `${checked}` }
        filter.push(obj2)
        search(filter, "publisher", isPageZero);
        break;
      case "Subject":
        setSubject((prevState) => ({
          ...prevState,
          searchTerm: event.value,
        }));
        const obj3 = { type: "subject", value: `${checked}` }
        filter.push(obj3)
        search(filter, "subject", isPageZero);
        break;
      case "yearFrom":
        setSubject((prevState) => ({
          ...prevState,
          searchTerm: event.value,
        }));
        const obj4 = { type: "yearFrom", value: `${checked}` }
        filter.push(obj4)
        search(filter, "yearFrom", isPageZero);
        break;
      default:
        break;
    }
  };

  const handleSearchFacets = (event, label) => {
    let filter = [...getSelectedValues()]

    searchFacets(event.query, label, filter)


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
                      {(section.label == "Database" && option.count)
                        ?
                        <div className="flex mx-2 bg-black text-white p-1 w-[45px] justify-center rounded-xl text-low">
                          {formatCount(option.count)}
                        </div>
                        :
                        (option.count) && (
                          <div className="flex mx-2 bg-black text-white p-1 w-[45px] justify-center rounded-xl text-low">
                            {formatCount(option.count)}
                          </div>)

                      }

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
                {(section.values.length > 0 &&
                  section.label != 'Database' &&
                  (selected == 'All' || selected == "OA")) && (
                    <AutoComplete
                      className='my-3'
                      placeholder={section.label}
                      value={section.searchTerm}
                      suggestions={section.searchItems}
                      onSelect={(e) => handleDropdownSearchFacets(e, section.label)}
                      completeMethod={(e) => handleSearchFacets(e, section.label)}
                      onChange={(e) => handleSearchTermChange(e.value, section.label)} />
                  )}
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
