import {
    createContext,
    useState,
    useEffect,
    useRef,
    useContext
} from "react";
import { getSearchData, getFacetsData }
    from "../../actions/searchAction";
const SearchContext = createContext(); // Create a context object to share the state between Components
import DatabaseContext from "../../contexts/search/databaseContext";
import PaginationContext from "../../contexts/paginationContext";
import AuthorContext from "../../contexts/search/authorContext";
import SubjectContext from "../../contexts/search/subjectContext";

export const SearchContextProvider = ({ children }) => {
    const [term, setTerm] = useState('');
    const [call, setCall] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const { database, setDatabase, handleDatabaseCount } = useContext(DatabaseContext);
    const { author, setAuthorData, handleAuthorResponse, clearAuthorValues, getCheckedAuthor } = useContext(AuthorContext);
    const { pageDetails, setPageDetails } = useContext(PaginationContext);
    const { subject, setSubject, handleSubjectResponse, clearSubjectValues } = useContext(SubjectContext);
    const [landing, setLanding] = useState(0);

    const { number, size, totalPages, totalElements, pageCounter } = pageDetails;







    useEffect(() => {
        if (!term && loading) return;
        search(null, 'search')
    }, [number, database]);


    const checkAllDatabse = () => {
        const updatedValues = database.values.map(item => ({
            ...item,
            checked: true
        }));

        setDatabase(prevState => ({
            ...prevState,
            values: updatedValues
        }));
    };
    const search = (filter, type) => {
        let author = ''
        let subject = ''
        let page = number
        if (type == "author") {
            author = filter
            page = 1
        } else if (type == "subject") {
            subject = filter
            page = 1
        }
        clearAuthorValues()
        clearSubjectValues()
        const db = getCheckedValues(database)
        // Create the body object with the existing properties
        const body = { term, page: page, database: db, author: author, subject };

        getSearchData(body).then(res => {

            if (res.error) {
                console.log(res.error);
                setLoading(false);
            } else {


                handleSearchResponse(res)
                handleAuthorResponse(res)
                handleSubjectResponse(res)
                //   handleDatabaseCount(res)
                setData(res.data)

                //Delay setting loading to false by 2 seconds

                setTimeout(() => {
                    setLoading(false);

                }, 5000);

            }
        })
    }

    const getFacets = (href, type) => {
        const body = { href, type }
        getFacetsData(body).then(res => {

            if (res.error) {
                console.log(res.error);

            } else {
                console.log(JSON.stringify(res))

                if (type == "Author") {
                    handleAuthorResponse(res)
                } else if (type == "Subject") {

                    handleSubjectResponse(res)

                }

            }
        })
    }


    const getCheckedValues = () => {
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
        setPageDetails(prevState => ({
            ...prevState,
            number,
            size,
            totalPages,
            totalElements,
            pageCounter: number,

        }));
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
