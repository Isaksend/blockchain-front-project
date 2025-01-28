import {Link} from "react-router-dom";

const Home = () =>
    <div>
        <div className="HomePage">
            Transparency is new reality
        </div>
        <div className="DashboardLinkBlock">
            <Link to="/dashboard" className="DashboardLink">
                Dashboard
            </Link>
        </div>
    </div>;
export default Home;