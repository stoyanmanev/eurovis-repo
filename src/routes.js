import DailyResult from "./pages/DailyResult";
import Home from "./pages/Home";

const routes = [
    {
      path: "/",
      component: <Home />,
      exact: true
    },
    {
      path: "milestones",
      component: 'milestones',
    },
    {
      path: "calendar",
      component: 'calendar',
    },
    {
      path: "daily-results",
      component: <DailyResult />,
    },
  ]

export default routes;