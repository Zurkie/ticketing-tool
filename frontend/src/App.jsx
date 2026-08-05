import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import TicketOverview from "./pages/TicketOverview";
import TicketCreate from "./pages/TicketCreate";
import TicketDetails from "./pages/TicketDetails.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/ticket-overview"
                    element={<TicketOverview />}
                />
                <Route
                    path="/create-ticket"
                    element={<TicketCreate />}
                />
                <Route
                    path="/tickets/:id"
                    element={<TicketDetails />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;