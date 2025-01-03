import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from './ScrollButton.module.scss'

function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div>
      {showButton && (
        <Button
        className={styles['scrollButton']}
          variant="primary"
          onClick={scrollToTop}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </Button>
      )}
    </div>
  );
}

export default ScrollTopButton;
