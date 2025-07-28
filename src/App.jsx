import Challenge from "./components/layouts/Challenge";
import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";

export default function App() {

  const selectedPage = 1// 0: 'welcome', 1: 'dashboard', 2: 'challenge'

  const pages={
    0: <Welcome />,
    1: <Dashboard />,
    2: <Challenge />
  }

  return (
    <div id="root">
      <Layout>
        {pages[selectedPage]}

      </Layout>
    </div> 
  )
}
