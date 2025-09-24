import React from "react";
import styles from "./Features.module.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import FeaturesGrid from "../FeaturesGrid/FeaturesGrid";
import { items } from "./items";

export default function Features({ id }) {
  return (
    <section id={id} className={styles.wrapper}>
      <h2 className={styles.heading}>Преимущества</h2>
      <FeaturesGrid>
        {items.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </FeaturesGrid>
    </section>
  );
}
