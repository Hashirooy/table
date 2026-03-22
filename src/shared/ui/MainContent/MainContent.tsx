import styles from './MainContent.module.scss'

interface MainContentProps {
  children?: React.ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => {
  return <div className={styles.mainContent}>{children}</div>;
};