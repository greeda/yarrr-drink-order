import { useOrder } from './state/OrderContext'
import BrandSelectScreen from './screens/BrandSelectScreen'
import OrderScreen from './screens/OrderScreen'
import styles from './App.module.css'

export default function App() {
  const { state } = useOrder()

  return (
    <div className={styles.app}>
      {state.selectedBrandId ? <OrderScreen /> : <BrandSelectScreen />}
    </div>
  )
}
