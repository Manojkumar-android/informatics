import {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext
} from "react";
import { getSearchData, getFacetsData, getFacetsSearch, getKohaData }
    from "../../actions/searchAction";
const SearchContext = createContext(); // Create a context object to share the state between Components
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
export const SearchContextProvider = ({ children }) => {
    const [term, setTerm] = useState('');
    const [call, setCall] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { database, setDatabase, handleDatabaseCount, logos } = useContext(DatabaseContext);
    const { handleAuthorSearchResponse, handleAuthorResponse, clearAuthorValues, getCheckedAuthor } = useContext(AuthorContext);
    const { pageDetails, setPageDetails } = useContext(PaginationContext);
    const { handleSubjectSearchResponse, handleSubjectResponse, clearSubjectValues } = useContext(SubjectContext);
    const { handlePublisherSearchResponse, handlePublisherResponse, clearPublisherValues } = useContext(PublisherContext);
    const { handleDataTypeResponse, clearDataTypeValues } = useContext(DataTypeContext);
    const { handleYearFromResponse, clearYearFromValues } = useContext(YearFromContext);
    const { handleTopicsResponse, clearTopicsValues } = useContext(TopicsContext);
    const { handleItemTypeSearchResponse, handleItemTypeResponse, clearItemTypeValues } = useContext(ItemTypeContext);
    const { handleJournalsResponse, clearJournalsValues } = useContext(JournalContext);
    const [landing, setLanding] = useState(0);

    const { number, size, totalPages, totalElements, pageCounter } = pageDetails;

    useEffect(() => {
        if (!term && loading) return;


        search(null, null)
    }, []);

    const kohaSearch = () => {
        const body = { term, logos: logos, };

        getKohaData(body).then(res => {

            if (res.error) {
                console.log(res.error);
            } else {
                handleDatabaseCount(res)
            }
        })

    }
    const search = (filter, type, isPageZero, dbChange, pageNumber) => {
        if (!term) return;
        setLoading(true);

        let author = ''
        let subject = ''
        let publisher = ''
        let itemtype = ''
        let page1 = pageNumber ?? 1
        let page = page1 - 1

        let data = database



        if (type == "database") {
            data = dbChange

        } else if (type) {
            page = 0
        }
        if (isPageZero) {
            page = 0
        }
        clearAuthorValues()
        clearSubjectValues()
        clearPublisherValues()
        clearDataTypeValues()
        clearYearFromValues()
        clearItemTypeValues()
        clearJournalsValues()
        clearTopicsValues()
        const dbLinks = getDbValues(data)
        // Create the body object with the existing properties
        const body = { term, page: page, dbLinks, logos: logos, author: author, subject, publisher, itemtype, filter };

        getSearchData(body).then(res => {

            if (res.error) {
                console.log(res.error);
                setLoading(false);
            } else {


                handleSearchResponse(res)
                handleAuthorResponse(res)
                handleSubjectResponse(res)
                handleDatabaseCount(res)
                handlePublisherResponse(res)
                handleItemTypeResponse(res)
                handleDataTypeResponse(res)
                handleYearFromResponse(res)
                handleJournalsResponse(res)
                handleTopicsResponse(res)

                setData(res.data)

                //Delay setting loading to false by 2 seconds
                setLoading(false);
                //  kohaSearch()

                // setTimeout(() => {
                //     setLoading(false);

                // }, 500);

            }
        })
    }

    const searchFacets = (prefix, type, filter) => {
        // console.log("getFacets")
        // console.log(type)
        const body = { prefix, term, type, filter }
        getFacetsSearch(body).then(res => {

            if (res.error) {
                console.log(res.error);

            } else {
                // console.log(JSON.stringify(res))

                if (type == "Author") {
                    handleAuthorSearchResponse(res)
                } else if (type == "Subject") {
                    handleSubjectSearchResponse(res)

                } else if (type == "Publisher") {
                    handlePublisherSearchResponse(res)

                } else if (type == "Item Type") {
                    handleItemTypeSearchResponse(res)

                }

            }
        })
    }

    const getFacets = (href, type) => {
        // console.log("getFacets")
        // console.log(type)
        const body = { href, type }
        getFacetsData(body).then(res => {

            if (res.error) {
                console.log(res.error);

            } else {
                // console.log(JSON.stringify(res))

                if (type == "Author") {
                    handleAuthorResponse(res)
                } else if (type == "Subject") {

                    handleSubjectResponse(res)

                } else if (type == "Publisher") {

                    handlePublisherResponse(res)

                } else if (type == "Item Type") {

                    handleItemTypeResponse(res)

                }

            }
        })
    }


    const getCheckedValues = (database) => {
        if (!database) return [];
        const checkedValues = database.values
            .filter(item => item.checked)
            .map(item => item.value);

        return checkedValues;
    };
    const getDbValues = (database) => {
        if (!database) return [];

        const checkedValues = database.values
            .filter(item => item.checked) // Filter items that are checked
            .map(item => ({
                label: item.type,
                value: item.searchApiLink,
                searchHeader: item.searchHeader
            }));

        return checkedValues;
    };

    const getAllValues = () => {

        const allValues = database.values.map(item => item.value);

        return allValues;
    };


    const handleSearchResponse = (response) => {
        let { number, size, totalPages, totalElements, } = response.pageDetails;
        // console.table(pagingCounter);
        // console.table(limit);
        // If number is 0, set it to 1
        if (number == 0) {
            number = 1;
        } else {
            number += 1
        }

        if (totalElements == 0) {
            setPageDetails(prevState => ({
                ...prevState,
                number: 0,
                size: 0,
                totalPages,
                totalElements,
                pageCounter: number,

            }));
        } else {
            setPageDetails(prevState => ({
                ...prevState,
                number,
                size,
                totalPages,
                totalElements,
                pageCounter: number,

            }));
        }

    }

    return (
        <SearchContext.Provider
            value={{
                data,
                term, setTerm, search,
                loading,
                getFacets, getCheckedValues,
                landing,
                setLanding,
                searchFacets

            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;
