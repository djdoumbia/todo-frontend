import { createTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from '../config/router';
import { createWebtuneTheme } from '../config/theming.ts';
import { UiThemeContext } from './UiThemeContext';
import 'react-toastify/dist/ReactToastify.css';
import 'dayjs/locale/fr'; // import locale

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

dayjs.locale('fr');

const App = () => {
  const [ localTheme, setLocalTheme ] = useState(createWebtuneTheme());

  const uiThemeContext = useMemo(() => ({
    theme: localTheme,
    setTheme: (mode: 'light' | 'dark') => setLocalTheme(createTheme({
      palette: {
        mode,
      },
    })),
  }), [ localTheme ]);

  return (
    <UiThemeContext.Provider value={uiThemeContext}>
      <ThemeProvider theme={uiThemeContext.theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
          <ToastContainer />
        </LocalizationProvider>
      </ThemeProvider>
    </UiThemeContext.Provider>
  );
};

export default App;
