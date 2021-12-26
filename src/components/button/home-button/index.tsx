import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.scss'

type HomeButtonProps = {
    title: string
    icon: string
    link: string
}
export const HomeButton = ({ title, icon, link }: HomeButtonProps) => {
    return (
        <Link href={link} passHref>
            <div className={styles.container}>
                <Image src={icon} alt='icon' width={50} height={50} />
                { title }
            </div>
        </Link>
    )
}