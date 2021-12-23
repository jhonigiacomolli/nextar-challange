import Image from 'next/image'
import styles from './index.module.scss'

export const Logomarca = () => {
    return (
        <div className={styles.container}>
            <Image 
                src="/logomarca.png" 
                alt='Logomarca Nextar'
                width={250}
                height={50}
                objectFit='contain' 
            />
            <span>Maintenance System</span>
        </div>
    )
}