import Sidebar from "./Sidebar.tsx";
import {Outlet} from "react-router-dom";

export default function Dashboard() {
    // const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="columns">
            <div className="column is-one-quarter">
                <Sidebar sidebarOpen={true}/>
            </div>
            <div className="column main-content">
                <Outlet />
            </div>
        </div>
    );
}