import OnlineStatus from "./components/OnlineStatus/OnlineStatus";
import MainLayout from "./layouts/MainLayout";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <OnlineStatus />

    <MainLayout>
      <AppRouter />
    </MainLayout>
    </>
  );
}

export default App;
