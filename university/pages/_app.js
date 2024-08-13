import '../styles/globals.css';
import '../styles/styles.css';
import '../styles/datatable.css';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { ToastProvider } from "../contexts/ToastContext";
import { SearchContextProvider } from '../contexts/search/searchContext';
import { UserContextProvider } from '../contexts/userContext';
import { BrowseContextProvider } from '../contexts/browseContext';
import { PaginationContextProvider } from '../contexts/paginationContext';
import { AuthorContextProvider } from '../contexts/search/authorContext';
import { DatabaseContextProvider } from '../contexts/search/databaseContext';
import NextNProgress from "nextjs-progressbar";
import { SubjectContextProvider } from '../contexts/search/subjectContext';

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <DatabaseContextProvider>
        <PaginationContextProvider>
          <AuthorContextProvider>
            <SubjectContextProvider>
              <SearchContextProvider>
                <BrowseContextProvider>
                  <UserContextProvider>

                    <div className="font-roboto">
                      <NextNProgress color='rgba(245, 130, 32, 1)' />
                      <Component {...pageProps} />
                    </div>

                  </UserContextProvider>
                </BrowseContextProvider>
              </SearchContextProvider>
            </SubjectContextProvider>
          </AuthorContextProvider>
        </PaginationContextProvider>
      </DatabaseContextProvider>
    </ToastProvider>
  );
}

export default MyApp;
