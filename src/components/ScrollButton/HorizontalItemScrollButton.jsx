import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import styles from "./ScrollButton.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function HorizontalItemScrollButton({scrollContainerRef, onAuto=false, time=200}) {

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -100,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 100,
      behavior: "smooth",
    });
  };

  const autoScrollRight = () => {
    if (scrollContainerRef.current) {
      const maxScrollLeft =
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      
      if (scrollContainerRef.current.scrollLeft >= maxScrollLeft) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({
          left: time, 
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    if (onAuto) {
    const interval = setInterval(() => {
      autoScrollRight();
    }, 3000);

    return () => clearInterval(interval);
  }
  }, []);

  return (
    <div className="d-none d-sm-block mx-5">
      <Button className={` p-1 px-3 py-1 m-0 ${styles['horizonScrollButton']}`} onClick={scrollLeft}>
        <FaAngleLeft />
      </Button>

      <Button className={`float-end p-1 px-3 py-1 m-0 ${styles['horizonScrollButton']}`} onClick={scrollRight}>
        <FaAngleRight />
      </Button>
    </div>
  );
}

export default HorizontalItemScrollButton;
