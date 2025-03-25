import { useMemo } from "react";
import { sidebarMenuList } from "../assets/sidebar-menu";
import { useAuth } from "../context/AuthContext";
import routeConfig from "../routes/routesConfig";
import { useMenuStore } from "base/MenuStore";

const UseFilteredSidebarMenu = () => {
  const { userType } = useAuth(); // Get the current user's role
  const { menuList } = useMenuStore();

  // Filter the sidebar menu based on user role
  const filteredSidebarMenu = useMemo(() => {
    return menuList
      .map((menuItem: any) => {
        // Check if the menu item has a URL
        if (menuItem.url) {
          // Find the corresponding route in routesConfig
          const route = routeConfig.find((route: any) => route.path === menuItem.url);

          // If the route exists and the user's role is not allowed, exclude the menu item
          if (route && !(route.allowedRoles ?? []).includes(userType)) {
            return null;
          }
        }

        // If the menu item has a subMenu, filter it recursively
        if (menuItem.subMenu) {
          const filteredSubMenu = menuItem.subMenu.filter((subMenuItem: any) => {
            const route = routeConfig.find((route) => route.path === subMenuItem.url);
            return route ? (route.allowedRoles ?? []).includes(userType) : true;
          });

          // If no submenus are left after filtering, exclude the menu item
          if (filteredSubMenu.length === 0) {
            return null;
          }

          return { ...menuItem, subMenu: filteredSubMenu };
        }

        return menuItem;
      })
      .filter(Boolean); // Remove null values
  }, [userType]);

  return filteredSidebarMenu;
};

export default UseFilteredSidebarMenu;