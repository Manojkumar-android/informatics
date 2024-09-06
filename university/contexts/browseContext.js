import {
    createContext,
    useState,
    useEffect,
    useContext
} from "react";
const BrowseContext = createContext();
import { dSpaceBrowse }
    from "../actions/browseAction";
import DatabaseContext from "../contexts/search/databaseContext";

export const BrowseContextProvider = ({ children }) => {
    const [selectedLetter, setSelectedLetter] = useState('#');
    const [pageDetails, setPageDetails] = useState({
        number: 1, size: 0, totalPages: 0, totalElements: 0, pageCounter: 0

    })
    const { database, setDatabase, resources, logos } = useContext(DatabaseContext);
    const [loading, setLoading] = useState(false);

    const { number, size, totalPages, totalElements, pageCounter } = pageDetails;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (resources.length == 0) return;
        browse()
    }, [number, selectedLetter, resources]);

    const browse = () => {
        setLoading(true);

        const db = getCheckedValues(database)
        const body = { startsWith: selectedLetter, page: number, database: db, logos }
        dSpaceBrowse(body).then(res => {

            if (res.error) {
                console.log(res.error);

            } else {
                console.log(JSON.stringify(res.data))
                //  alert(JSON.stringify(res.data))
                setLoading(false);

                handleSearchResponse(res)
                //    handleAuthorResponse(res.authorData)
                //  handleSubjectResponse(res.subjectData)
                setData(res.data)
                setLoading(false);

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
        <BrowseContext.Provider
            value={{
                selectedLetter,
                setSelectedLetter,
                pageDetails, setPageDetails, data, loading

            }}
        >
            {children}
        </BrowseContext.Provider>
    );
}

export default BrowseContext;
