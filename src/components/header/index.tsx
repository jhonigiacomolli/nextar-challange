import { PrimaryButton } from 'components/button/primary-button'
import { Logomarca } from 'components/logo'
import styles from './index.module.scss'

type HeaderProps = {
    navigation?: boolean
}
export const Header = ({ navigation = false }:HeaderProps) => {
    return (
        <header className={styles.header}>
            <Logomarca />
            { navigation && (
                <PrimaryButton title='Voltar' link='/' />
            )}
        </header>
    )
}