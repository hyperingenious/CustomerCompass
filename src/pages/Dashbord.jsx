import { useSelector } from "react-redux";
import DashboardGrid from "../components/dashboard/DashboardGrid";
import Loader from "../components/ui/Loader";

function Dashbord() {
  const { data, status, error , visitorCount} = useSelector((store) => store.reviewData);
  return (
    <>
      {status === "loading" && <Loader />}
      {status === "finished" && <DashboardGrid reviewData={data} totalVisitors={visitorCount} />}
      {status === "error" && <h1>{error}</h1>}
    </>
  );
}

export default Dashbord;
