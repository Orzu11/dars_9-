import { DashboardHome, Groups, Rooms, Stacks, Students, Teachers } from "../pages";
import { Header, Sitebar } from "../modules";
import { Route, Routes } from "react-router-dom";
import PATH from "../components/Path";

const DashboardRoute = () => {
  const list = [
    { id: 1, path: PATH.home, element: <DashboardHome /> },
    { id: 2, path: PATH.stacks, element: <Stacks /> },
    { id: 3, path: PATH.groups, element: <Groups /> },
    { id: 4, path: PATH.teachers, element: <Teachers /> },
    { id: 5, path: PATH.students, element: <Students /> },
    { id: 6, path: PATH.rooms, element: <Rooms /> },
  ];

  return (
    <div className="flex">
      <Sitebar />
      <div className="w-[78%] h-screen">
        <Header />
        <Routes>
          {list.map(item => (
            <Route key={item.id} path={item.path} element={item.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardRoute;