import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Global stylesheets imports
import './styles/global/base.css';

import './styles/global/forms.css';
import './styles/global/forms-interactions.css';
import './styles/global/forms-errors.css';

import './styles/global/modals.css';

// Global layout stylesheets imports
import './styles/layout/navigation.css';

// Specific components stylesheets imports
import './styles/components/user/user-forms.css';

import './styles/components/account/accounts-table.css';
import './styles/components/account/accounts-pagination.css';
import './styles/components/account/accounts-buttons.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
);
