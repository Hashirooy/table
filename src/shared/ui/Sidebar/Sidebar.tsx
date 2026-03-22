import styles from './Sidebar.module.scss'
import { SideBarItem } from './SideBarItem';


interface SidebarProps {
  onClick?: () => void;
}

export const Sidebar = (_props: SidebarProps) => {

  const items = [
    {
      text: 'Tables',
      icon: 'https://via.placeholder.com/150',
      to: '/tables',
      path: '/tables',
      authOnly: false,
    },
    {
      text: 'Forms',
      icon: 'https://via.placeholder.com/150',
      to: '/forms',
      path: '/forms',
      authOnly: false,
    },
    {
      text: 'Tasks',
      icon: 'https://via.placeholder.com/150',
      to: '/tsks',
      path: '/tasks',
      authOnly: false,
    }
  ]
  return <aside className={styles.sidebar}>
    <h3 className={styles.sidebarTitle}>Menu</h3>
    {items.map((item) => (
      <SideBarItem  key={item.text} items={item} onClick={() => {}} />
    ))}
  </aside>;
};