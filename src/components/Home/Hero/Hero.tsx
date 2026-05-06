"use client"

import styles from "./hero.module.css";
import { Button } from "app/components/Shared/Button";
import { Tag } from "app/components/Shared/Tag";

export const Hero = () => {
    return (
        <section className={styles.heroSection}>
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.tagWrapper}>
                    <Tag text="Open to work" variant="default" />
                </div>

                <h1 className={styles.heroTitle}>Web Developer.<br />Figma-to-Web.<br />AI-Driven.</h1>

                <p className={styles.heroDescription}>
                    Crafting web experiences that are fast, accessible, and built to last — one product at a time.
                </p>

                <div className={styles.heroButtons}>
                    <Button href="#work" text="View work" theme="dark" />
                    <Button href="https://www.linkedin.com/in/santiagolopez22/" text="Let&apos;s talk" theme="light" external />
                </div>
            </div>
        </section>
    )
}