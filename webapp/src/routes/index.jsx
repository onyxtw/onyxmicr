import HomePage from "../pages/HomePage";
import FlowRunnerPage from "../pages/FlowRunnerPage";
import RuntimeStatusPage from "../pages/RuntimeStatusPage";
import NotFoundPage from "../pages/NotFoundPage";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/flows", element: <FlowRunnerPage /> },
  { path: "/runtime", element: <RuntimeStatusPage /> },
  { path: "*", element: <NotFoundPage /> },
];
