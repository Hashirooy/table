import { Header } from '../Header/Header'
import { MainContent } from '../MainContent/MainContent'
import { Sidebar } from '../Sidebar/Sidebar'
import styles from './Layout.module.scss'
import logo from '../../assets/Icons/logo.svg';
import { Table } from '../Table/Table';

export const Layout = () => {
    return(<>
    <div className={styles.layout}>
        <div className={styles.sidebarContainer}>
            <div className={styles.Logo}>
                <img src={logo} alt="logo" />
            </div>
            <Sidebar/>
        </div>
        <main className={styles.main}>
            <header className={styles.header}><Header></Header></header>
        
                <MainContent>
                    <Table/>
                </MainContent>
        
        </main>
    </div>
    </>)
}