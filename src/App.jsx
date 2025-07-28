import Challenge from "./components/layouts/Challenge";
import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";

export default function App() {
  return (
    <div>
      <Layout>

        <Welcome />
        <Dashboard />
        <Challenge />

      </Layout>
    </div> 
  )
}
