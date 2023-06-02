import AppProvider from "./Context/AppProvider";

import Wrapper from "./Wrapper";

function App() {
    return (
        <AppProvider>
            <Wrapper />
        </AppProvider>
    );
}

export default App;
