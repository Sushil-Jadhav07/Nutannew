import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import {BrowserRouter} from "react-router-dom";
import {ManagedUI} from "@/contexts/managedUI";
import AuthProvider from './contexts/AuthProvider';
import { ToastProvider } from './contexts/ToastContext';

import "./index.css"
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { initRequest } from "./services/utils/initRequest.ts";
import ModalManaged from './components/common/modal/modalManaged.tsx';

// const ModalManaged = React.lazy(() => import('@/components/common/modal/modalManaged'));
const DrawerManaged = React.lazy(() => import('@/components/common/drawer/drawerManaged'));
// const PanelManaged = React.lazy(() => import('@/panel/panel-managed'));

// Create QueryClient instance once
const queryClient = new QueryClient();
initRequest();
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ManagedUI>
					<AuthProvider>
						<ToastProvider>
								<App/>
								{/* <PanelManaged/> */}
								<ModalManaged/>
								<DrawerManaged/>
						</ToastProvider>
					</AuthProvider>
				</ManagedUI>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>,
)
