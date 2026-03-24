import { MainContent } from './components/MainContent/MainContent'
import styles from './Layout.module.scss'
import { Table } from '../../shared/ui/Table/Table';

export const Table1 = () => {
    // условие
    return (
        <Layout>
            <MainContent>
                <div className={styles.mainContentTitle}>
                    <h1>Data Tables</h1>
                </div>
                <Table />
            </MainContent>
        </Layout>
    )
}