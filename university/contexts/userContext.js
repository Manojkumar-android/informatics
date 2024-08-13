
import {
    createContext,
    useState,
    useEffect,
    useRef
} from "react";
const UserContext = createContext(); // Create a context object to share the state between Components
import { login, forgotPassword, resetPassword } from "../actions/userAction";
import { useToasts } from "../contexts/ToastContext";

export const UserContextProvider = ({ children }) => {
    const { addToast } = useToasts();
    const [userName, setUserName] = useState('');

    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('anil.k@informaticsglobal.com');
    const [password, setPassword] = useState('anil!@#$%');
    const [hasHydrated, setHasHydrated] = useState(false); // tracks whether the user's session data has been loaded ("hydrated") from local storage.

    const [userSession, setUserSession] = useState(null); // userSession is an state object containing the session data of the user.

    const handleLoginClick = () => {
        setUsername('')
        setEmail('')
        setPassword('')

        setIsLoginPopupOpen(true);
    };
    const closeLoginPopup = () => {
        setIsLoginPopupOpen(false);
    };
    const closeResetPopup = () => {
        setIsResetPopupOpen(false);
    };

    useEffect(() => {
        const name = localStorage.getItem("userName")

        setUserName(name);

    }, [userSession]);
    useEffect(() => {
        const hydrateData = async () => {
            const storedUserSession = localStorage.getItem("user")

            let userId = null;

            try {
                userId = storedUserSession && storedUserSession._id;
                setUserSession(storedUserSession);


            } catch (e) {
                console.error("Error parsing user session from localStorage:", e);
            }

            setHasHydrated(true);
        };

        hydrateData();
    }, []);
    const handleResetPassword = async e => {
        e.preventDefault();

        if (!username) {
            addToast("username cannot be empty", "info");
            return;
        }

        if (!oldPassword) {
            addToast("oldPassword cannot be empty", "info");
            return;
        }
        if (!newPassword) {
            addToast("newPassword cannot be empty", "info");
            return;
        }

        const body = { "UserName": username, "OldPassword": oldPassword, "NewPassword": newPassword, "Library": "63e5e8effb058741f8c55775" };
        const resetPass = async (body) => {
            try {
                const { success, msg } = await resetPassword(body);

                // console.log(JSON.stringify(reponse))
                if (!success) {
                    addToast(
                        msg,
                        "error"
                    );
                    return;
                } else {

                    setIsResetPopupOpen(false);
                    addToast(
                        msg,
                        "success"
                    );

                }

            } catch (error) {
                addToast("resetPass password  error", "error");
            }
        }

        resetPass(body)
    }
    const handleForgotPassword = async e => {
        e.preventDefault();
        if (!username) {
            addToast("username cannot be empty", "info");
            return;
        }
        if (!email) {
            addToast("email cannot be empty", "info");
            return;
        }

        /// const body = { "email": email, };
        const body = { "Email": email, "UserName": username, "Library": "63e5e8effb058741f8c55775" };
        console.log(body)

        const forgotPass = async (body) => {
            try {
                const { success, msg } = await forgotPassword(body);

                // console.log(JSON.stringify(reponse))
                if (!success) {
                    addToast(
                        msg,
                        "error"
                    );
                    return;
                } else {

                    setIsLoginPopupOpen(false);
                    addToast(
                        msg,
                        "success"
                    );

                }

            } catch (error) {
                addToast("forgot password  error", "error");
            }
        }

        forgotPass(body)
    }
    const handleLogin = e => {
        e.preventDefault();

        if (!username) {
            addToast("Username cannot be empty", "info");
            return;
        }
        if (!password) {
            addToast("Password cannot be empty", "info");
            return;
        }
        const body = { "UserName": username, "Password": password, "Library": "63e5e8effb058741f8c55775" };
        const userSignin = async (body) => {
            try {
                const { success, msg, user, token } = await login(body);

                // console.log(JSON.stringify(reponse))
                if (!success) {
                    addToast(
                        msg,
                        "error"
                    );
                    return;
                } else {
                    localStorage.setItem("user", user);
                    localStorage.setItem("userName", `${user['FirstName']} ${user['LastName']}`);
                    localStorage.setItem("token", token);
                    setUserSession(JSON.stringify(user))
                    setIsLoginPopupOpen(false);
                    addToast(
                        msg,
                        "success"
                    );

                }

            } catch (error) {
                addToast("Sign in error", "error");
            }
        }

        userSignin(body)
    }
    return (
        <UserContext.Provider
            value={{
                isLoginPopupOpen,
                isResetPopupOpen,
                setIsResetPopupOpen,
                closeResetPopup,
                handleLoginClick,
                oldPassword,
                setOldPassword,
                newPassword,
                setNewPassword,
                handleResetPassword,
                closeLoginPopup,
                username,
                setUsername,
                password,
                setPassword,
                userSession,
                setUserSession,
                handleLogin,
                userName,
                email,
                setEmail, handleForgotPassword


            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
