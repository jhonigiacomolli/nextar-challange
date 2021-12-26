import Link from 'next/link'
import { HTMLAttributes } from 'react'
import styles from './index.module.scss'

type PrimaryButtonProps = HTMLAttributes<HTMLAnchorElement> & {
    title: string
    link?: string
}
export const PrimaryButton = ({ title, link, className, ...rest }:PrimaryButtonProps) => {
    return (
        <Link href={link ?? ''} passHref >
            <a {...rest} className={`${styles.container} ${className}`} >
                { title }
            </a>
        </Link>
    )
}