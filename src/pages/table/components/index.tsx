import { Header } from '../../shared/ui/Header/Header'
import { MainContent } from '../../shared/ui/MainContent/MainContent'
import { Sidebar } from '../../shared/ui/Sidebar/Sidebar'
import styles from './Layout.module.scss'
import logo from '../../assets/Icons/logo.svg';

export const Layout = (children) => {
    return (<>
        <div className={styles.layout}>
            <div className={styles.sidebarContainer}>
                <div className={styles.Logo}>
                    <img src={logo} alt="logo" />
                </div>
                <Sidebar />
            </div>
            <div className={styles.main}>
                <header className={styles.header}>
                    <Header></Header>
                </header>
                <MainContent>
                    {children}
                </MainContent>

            </div>
        </div>
    </>)
}