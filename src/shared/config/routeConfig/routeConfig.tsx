import type { RouteProps } from "react-router-dom";
import TablePage from "../../../pages/TablePage/ui/TablePage";
import TasksPage from "../../../pages/TasksPage/ui/TaskPage";


export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: string[];
};

/** Значения маршрутов (без enum — совместимо с erasableSyntaxOnly) */
export const AppRoutes = {
  MAIN: "/",
  TABLES: "/tables",
  TASKS: "/tasks",

} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];

export const routeConfig: Record<AppRoute, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: AppRoutes.MAIN,
    element: <div>Главная</div>,
  },
  [AppRoutes.TABLES]: {
    path: AppRoutes.TABLES,
    element: <TablePage/>,
  },
  [AppRoutes.TASKS]: {
    path: AppRoutes.TASKS,
    element: <TasksPage/>,
  },
};
