import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../shared/tokens.css';
import '../styles.css';
import './company.css';
import { CompanyApp } from './CompanyApp';

createRoot(document.getElementById('root')!).render(<StrictMode><CompanyApp /></StrictMode>);
