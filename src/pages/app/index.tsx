import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("src/components/screens/Dashboard"), {
    ssr: false,
  });

function AppPage() {
    return <Dashboard />;
}

export default AppPage
