import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";
import logo from "../../assets/Icons/logo.svg";
import { useEffect, useState } from "react";
import { AccountBar } from "../../../widgets/AccountBar/Accountbar";
import { Button } from "../Button/Button";
import { AppRouter } from "../../../app/providers/router";

export const Layout = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [showHeaderActions, setShowHeaderActions] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClickHeaderActions = () => {
    setShowHeaderActions(!showHeaderActions);
  };
  const onClickOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
    console.log(isMediumScreen);
  };
  return (
    <>
      <div className={styles.layout}>
        {(isMediumScreen || isOpen) && (
          <div className={styles.sidebarContainer}>
            <div className={styles.Logo}>
              <img src={logo} alt="logo" />
            </div>
            <Sidebar />
          </div>
        )}
        <div className={styles.main}>
          <header className={styles.header}>
            <Header
              onClickHeaderActions={onClickHeaderActions}
              isMediumScreen={!isMediumScreen}
              onClickOpen={onClickOpen}
            ></Header>
          </header>
          {isMediumScreen && showHeaderActions && (
            <div className={styles.headerActions}>
              <div className={styles.headerActionsContent}>
                <Button
                  onClick={() => {}}
                  size="medium"
                  theme="primary"
                  circle={true}
                >
                  ?
                </Button>
                <Button
                  onClick={() => {}}
                  size="medium"
                  theme="primary"
                  circle={true}
                >
                  ?
                </Button>
              </div>
              <AccountBar
                text="John Doe"
                avatar="https://via.placeholder.com/150"
              />
            </div>
          )}
          <MainContent>
            <AppRouter />
          </MainContent>
        </div>
      </div>
    </>
  );
};
