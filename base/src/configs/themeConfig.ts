import { ThemeConfig } from 'antd/es/config-provider/context';

export const themeConfig: ThemeConfig = {
  components: {
    Breadcrumb: {
      fontSize: 14,
      linkColor: '#ff0000', //red
      separatorColor: 'rgba(0, 0, 0)',
      lastItemColor: '#a40034', //very dark red
    },
    // You can add other component theme configurations here
    Menu: {
        colorItemBg: '#f3f4f6',      // Menu item background
        colorSubItemBg: '#f3f4f6',   // Submenu background //dark than f9fafb
        colorItemText: '#110F24',    // Menu item text color //black
        colorItemTextHover: '#1bb470', // Hover text color
        colorItemBgSelected: '#B4007B', // Selected item background //maroon
        colorItemTextSelected: '#FFFFFF', // Selected item text //white
    },
    Layout: {
        // colorBgContainer: '#0d0d0d',
        siderBg: '#f3f4f6', // Sider background color
    },
    Button: { 
        fontSize: 12,
        padding: 4,
        colorBgContainer: '#f9fafb', 
        colorText: '#0d0d0d', //black
        fontWeight: 500,
        textHoverBg: '#f2f2f2', //white
        colorBgSolidHover: '#0d0d0d', //black
     },
     Typography: {
        fontSize: 12,
        colorText: '#0d0d0d' //black
     },
     Input: {
      fontSize: 12,
     },
     Select: {
      fontSize: 12,
     },
     Tree : {
      fontSize: 12
     },
     Form: {
      itemMarginBottom: 0, // Default is 24px
    },
  },
  token: {
    // Global design tokens
    fontFamily: "'Inter', 'Open Sans', sans-serif",
    lineHeightHeading3: 1.1,
    lineHeightHeading4: 1.1,
    colorPrimary: '#091A7C', //dark blue
    // colorBgBase: '#f9fafb', //gray-100
    colorTextSecondary: '#facfcf', //red-100
    borderRadius: 4,
    // Add more global tokens as needed
  },
};