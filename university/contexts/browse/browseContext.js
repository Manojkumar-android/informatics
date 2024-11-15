import {
    createContext,
    useState,
    useEffect,
    useContext
} from "react";
const BrowseContext = createContext();
import { dSpaceBrowse }
    from "../../actions/browseAction";
import DatabaseContext from "../search/databaseContext";
import { useRouter } from 'next/router';

export const BrowseContextProvider = ({ children }) => {
    const router = useRouter();
    const currentPath = router.pathname;
    const [selectedLetter, setSelectedLetter] = useState('All');
    const [pageDetails, setPageDetails] = useState({
        number: 0, size: 0, totalPages: 0, totalElements: 0, pageCounter: 0

    })
    const { database, setDatabase, resources, logos, handleDatabaseCount } = useContext(DatabaseContext);
    const [loading, setLoading] = useState(false);

    const { number, size, totalPages, totalElements, pageCounter } = pageDetails;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (resources.length == 0 || currentPath != "/browse") return;
        browse(null, 'browse', 0)
    }, [selectedLetter, resources, currentPath]);

    const browse = (filter, type, pageNumber) => {
        setLoading(true);
        let data = database
        if (type == "database") {
            data = filter
            //  alert(JSON.stringify(data))

        }
        let page1 = pageNumber ?? 1
        let page = page1 - 1
        const dbLinks = getDbValues(data)

        const db = getCheckedValues(data)
        const body = { startsWith: selectedLetter, page: page, dbLinks, database: db, logos }
        dSpaceBrowse(body).then(res => {

            if (res.error) {
                console.log(res.error);

            } else {
                console.log(JSON.stringify(res.data))
                //  alert(JSON.stringify(res.data))
                setLoading(false);
                handleDatabaseCount(res)

                handleSearchResponse(res)
                //    handleAuthorResponse(res.authorData)
                //  handleSubjectResponse(res.subjectData)
                setData(res.data)
                setLoading(false);

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
                value: item.browseApiLink,
                searchHeader: item.searchHeader
            }));

        return checkedValues;
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
        <BrowseContext.Provider
            value={{
                selectedLetter,
                setSelectedLetter,
                pageDetails, setPageDetails, data, loading, browse

            }}
        >
            {children}
        </BrowseContext.Provider>
    );
}

export default BrowseContext;
