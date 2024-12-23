import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';


import './styles/global/base.css';
import './styles/global/forms.css';
import './styles/global/forms-interactions.css';
import './styles/global/forms-errors.css';
import './styles/global/modals.css';
import './styles/global/table.css';
import './styles/layout/navigation.css';
import './styles/pages/user-forms.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
);
