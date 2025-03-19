import { createContext, useContext, ReactNode, useState, forwardRef } from 'react';
import { AlertColor, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

/* eslint-disable no-unused-vars */
interface NotificationContextType {
  showMessage: (message: string, severity?: AlertColor) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  /* eslint-enable no-unused-vars */
}

const NotificationContext = createContext<NotificationContextType>({
  showMessage: () => {},
  showError: () => {},
  showSuccess: () => {},
});

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />
));

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const handleClose = () => setOpen(false);

  const showMessage = (msg: string, severity: AlertColor = 'info') => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const value = {
    showMessage,
    showError: (msg: string) => showMessage(msg, 'error'),
    showSuccess: (msg: string) => showMessage(msg, 'info'),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => useContext(NotificationContext);
