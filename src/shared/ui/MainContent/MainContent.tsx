import styles from "./MainContent.module.scss";

interface MainContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const MainContent = ({ className, children }: MainContentProps) => {
  return (
    <main className={[styles.mainContent, className].filter(Boolean).join(" ")}>
      {children}
    </main>
  );
};
