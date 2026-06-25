import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeUpProps = {
    children: ReactNode;
    delay: number;
}

const FadeUp = ({ children, delay = 0 }: FadeUpProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeUp;