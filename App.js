import { useEffect } from "react";
import AppProvider from "./Context/AppProvider";

import Wrapper from "./Wrapper";
import { dbSetup, testInsert, testQuery } from "./queries/tableSetup";

function App() {
    useEffect(() => {
        dbSetup();
        testInsert();
        testQuery();
    }, []);

    return (
        <AppProvider>
            <Wrapper />
        </AppProvider>
    );
}

export default App;
