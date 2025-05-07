import { useNavigate } from "react-router-dom";

export function useAuthNavigation() {
    const isStandalone = window.location.pathname.indexOf('/auth') === -1;
    const basePath = isStandalone ? '' : '/auth';
    
    const navigate = useNavigate();

    return {
      navigateTo: (path: string) => {
        const fullPath = `${basePath}${path}`;
        // navigate to full path
        navigate(fullPath);
      },
      getPath: (path: string) => `${basePath}${path}`
    };
  }