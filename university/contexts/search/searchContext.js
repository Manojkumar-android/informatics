import {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext
} from "react";
import { getSearchData, getFacetsData, getKohaData }
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
export const SearchContextProvider = ({ children }) => {
    const [term, setTerm] = useState('');
    const [call, setCall] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { database, setDatabase, handleDatabaseCount, logos } = useContext(DatabaseContext);
    const { author, setAuthorData, handleAuthorResponse, clearAuthorValues, getCheckedAuthor } = useContext(AuthorContext);
    const { pageDetails, setPageDetails } = useContext(PaginationContext);
    const { subject, setSubject, handleSubjectResponse, clearSubjectValues } = useContext(SubjectContext);
    const { handlePublisherResponse, clearPublisherValues } = useContext(PublisherContext);
    const { handleDataTypeResponse, clearDataTypeValues } = useContext(DataTypeContext);
    const { handleYearFromResponse, clearYearFromValues } = useContext(YearFromContext);
    const { handleItemTypeResponse, clearItemTypeValues } = useContext(ItemTypeContext);
    const { handleJournalsResponse, clearJournalsValues } = useContext(JournalContext);
    const [landing, setLanding] = useState(0);

    const { number, size, totalPages, totalElements, pageCounter } = pageDetails;

    useEffect(() => {
        if (!term && loading) return;

        search(null, 'search')
    }, [number]);

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
    const search = (filter, type) => {
        setLoading(true);
        let author = ''
        let subject = ''
        let publisher = ''
        let itemtype = ''
        let page = number
        let data = database
        if (type == "author") {
            author = filter
            page = 1
        } else if (type == "subject") {
            subject = filter
            page = 1
        } else if (type == "publisher") {
            publisher = filter
            page = 1
        } else if (type == "itemtype") {
            itemtype = filter
            page = 1
        } else if (type == "database") {
            data = filter

        }
        clearAuthorValues()
        clearSubjectValues()
        clearPublisherValues()
        clearDataTypeValues()
        clearYearFromValues()
        clearItemTypeValues()
        clearJournalsValues()
        const db = getCheckedValues(data)
        // Create the body object with the existing properties
        const body = { term, page: page, database: db, logos: logos, author: author, subject, publisher, itemtype };

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

    const getFacets = (href, type) => {
        console.log("getFacets")
        console.log(type)
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
                setLanding

            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;
