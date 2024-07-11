import '../styles/globals.css'
import '../styles/styles.css'
import '../styles/datatable.css'
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/src/sweetalert2.scss'
import 'primereact/resources/themes/lara-light-blue/theme.css';

import { NavigationContextProvider } from "../contexts/navigation";

function MyApp({ Component, pageProps }) {
  return (
    <NavigationContextProvider>

      <div className="font-roboto"> {/* Apply the font-medium class to set the font */}

        <Component {...pageProps} />
      </div>
    </NavigationContextProvider >
  );


}

export default MyApp
