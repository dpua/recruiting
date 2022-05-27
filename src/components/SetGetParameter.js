
import { createBrowserHistory } from 'history';
function setGetParameter(key, value = false) {
    console.log("~~~setGetParameter " + key + ": " + value);
    const history = createBrowserHistory();
    if (value) {
        let pathname = window.location.pathname;
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        history.push({
            pathname: pathname,
            search: searchParams.toString()
        });
    } else {
        let pathname = window.location.pathname;
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.delete(key);
        history.push({
            pathname: pathname,
            search: searchParams.toString()
        });
    };
}
export default setGetParameter;