import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div style={{display: "flex", height: "100vh", background: "#058FED", justifyContent: 'center', alignItems: 'center'}}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: "visible",
            stroke: "#fff",
            strokeWidth: 2,
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }}
        >
          <motion.path
            d="
            M138.7,27.3c-1.15,1.15-15.44,21.99-15.44,21.99,0,0-5.11,9.13-11.37,3.53l-.13-.09c-8.29-8.4-19.72-12.61-31.52-12.61-24.21,0-44.13,19.92-44.13,44.13s19.92,44.13,44.13,44.13c14.23,0,27.62-6.88,35.89-18.46l40.33-69.8h0C170.83,14.98,196.86,0,225.81,0c37.43,0,70.02,23.15,78.52,59.6l.54,2.55c.4,1.99,.61,4.02,.61,6.05,0,16.52-13.48,30.17-25.15,30.43l-96.66-1.15-3.29-.03s-1.68,.17-1.33-.5c8.51-15.85,9.5-19.01,13.89-26.71,2.48-4.91,10.22-4.77,16.13-4.9h.11s40.12,0,49.86-.58,12.04-4.01,8.6-9.74h0c-8.31-12.99-22.98-20.63-38.4-20.63s-30.01,7.99-38.29,21.12l-2.4,4.1-34.39,61.9c-13.96,26.49-43.41,42.98-73.36,42.98C36.48,164.49,0,128.01,0,83.68S36.48,2.87,80.81,2.87c21.79,0,42.69,8.82,57.89,24.43Z
            M305.39,124.37c-8.9-5.7-18.89-8.21-29.69-7.25-6.66,.59-13.1,2.71-18.95,5.96l-.07,.04c-7.94,4.21-16.9,6.51-26.16,6.51-16.24,0-31.17-7.54-42.3-19.36-7.08-7.51-11.16-.87-11.16-.87l-13.33,24.22c16.92,19.59,41.56,30.87,67.45,30.87,30.06,0,57.78-14.95,74.22-40.12h0Z"
            variants={{
              hidden: {
                opacity: 0,
                pathLength: 0,
                fill: "rgba(255, 255, 255, 0)"
              },
              visible: {
                opacity: 1,
                pathLength: 1,
                fill: "rgba(255, 255, 255, 1)"
              }
            }}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 1, ease: "easeInOut", repeat: 50 },
              fill: { duration: 1, ease: [1, 0, 0.8, 1], repeat: 50 }
            }}
          />
        </motion.svg>
      </div>
  )
}

export default Loader