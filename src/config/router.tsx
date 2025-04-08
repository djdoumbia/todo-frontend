import { createHashRouter } from 'react-router-dom';
import TodoPage from '../components/TodoPage.tsx';

export default createHashRouter([
  {
    path: '/',
    element: <TodoPage />,
  },
]);
