import { useMediaQuery } from 'react-responsive';

export const isDesktop = () => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop;
  };
  
  export const isTablet = () => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet;
  };
  
  export const isMobile = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile;
  };
  
  export const isDefault = () => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile;
  };
  