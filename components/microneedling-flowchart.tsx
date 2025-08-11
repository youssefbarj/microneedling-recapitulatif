"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface StepProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  isLast?: boolean
  colorScheme: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary"
}

const colorSchemes = {
  primary: {
    background: "linear-gradient(135deg, #000435 0%, #4A1A5C 100%)",
    border: "#000435",
    text: "#FFFFFF",
  },
  secondary: {
    background: "linear-gradient(135deg, #4A1A5C 0%, #7B2D8E 100%)",
    border: "#4A1A5C",
    text: "#FFFFFF",
  },
  tertiary: {
    background: "linear-gradient(135deg, #7B2D8E 0%, #A640B0 100%)",
    border: "#7B2D8E",
    text: "#FFFFFF",
  },
  quaternary: {
    background: "linear-gradient(135deg, #A640B0 0%, #C966D2 100%)",
    border: "#A640B0",
    text: "#FFFFFF",
  },
  quinary: {
    background: "linear-gradient(135deg, #C966D2 0%, #CF9FFF 100%)",
    border: "#C966D2",
    text: "#000435",
  },
}

const Step = ({ title, subtitle, children, isLast = false, colorScheme }: StepProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)
  const colors = colorSchemes[colorScheme]

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <motion.div
        ref={stepRef}
        className="w-full border-2 rounded-lg shadow-md overflow-hidden"
        style={{ borderColor: colors.border }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 4px 12px rgba(0, 4, 53, 0.25)",
          transition: { duration: 0.2, ease: "easeOut" },
        }}
      >
        <div
          className="cursor-pointer p-3 flex flex-col items-center justify-center transition-all duration-200 ease-out"
          style={{ background: colors.background }}
          onClick={handleToggle}
        >
          <h2
            className="text-sm md:text-base font-black text-center mb-1 transition-all duration-200"
            style={{
              color: colors.text,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-center font-medium text-xs transition-all duration-200"
              style={{
                color: colors.text,
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              {subtitle}
            </p>
          )}
          <motion.button
            className="mt-2 p-1 rounded-full transition-all duration-200 hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
              <ChevronDown size={16} style={{ color: colors.text }} />
            </motion.div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
              style={{ backgroundColor: "#F8F9FF" }}
            >
              <motion.div
                className="p-3 border-t-2"
                style={{ borderColor: colors.border }}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.2 }}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {!isLast && (
        <motion.div
          className="flex justify-center my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <motion.path
              d="M15 5 L15 25 M10 20 L15 25 L20 20"
              stroke="#000435"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      )}
    </>
  )
}

const InfoCard = ({ title, content, bgColor }: { title: string; content: string; bgColor: string }) => (
  <motion.div
    className="p-3 rounded-lg shadow-sm"
    style={{ backgroundColor: bgColor }}
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 4px 12px rgba(0, 4, 53, 0.15)",
      transition: { duration: 0.15, ease: "easeOut" },
    }}
  >
    <h3
      className="font-bold mb-2 text-xs md:text-sm transition-colors duration-150"
      style={{
        color: "#000435",
        fontFamily: "'Playfair Display', serif",
      }}
    >
      {title}
    </h3>
    <p
      className="text-xs leading-relaxed transition-colors duration-150"
      style={{
        color: "#000435",
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      {content}
    </p>
  </motion.div>
)

export default function MicroneedlingFlowchart() {
  useEffect(() => {
    const scrollbarStyles = `
      .scrollbar-custom::-webkit-scrollbar {
        width: 12px;
      }
      
      .scrollbar-custom::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
        margin: 10px;
      }
      
      .scrollbar-custom::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #000435 0%, #CF9FFF 100%);
        border-radius: 10px;
        border: 2px solid #f1f1f1;
      }
      
      .scrollbar-custom::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #000435 0%, #A640B0 100%);
        box-shadow: 0 0 10px rgba(0, 4, 53, 0.5);
      }
      
      .scrollbar-custom {
        scrollbar-width: thin;
        scrollbar-color: #000435 #f1f1f1;
      }
    `

    const styleElement = document.createElement("style")
    styleElement.textContent = scrollbarStyles
    document.head.appendChild(styleElement)

    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-custom">
      <div className="bg-gradient-to-r from-[#000435] to-[#CF9FFF] p-4 text-center">
        <h1
          className="text-lg md:text-xl font-black text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          MICRONEEDLING : LE PRINCIPE ET LES ÉTAPES
        </h1>
      </div>

      <div className="p-4 space-y-2">
        <Step title="ACTION MÉCANIQUE" subtitle="Micro-perforations de l'épiderme et du derme" colorScheme="primary">
          <div className="grid md:grid-cols-2 gap-3">
            <InfoCard
              title="Le processus"
              content="Création de micro-canaux dans la peau à l'aide d'aiguilles fines"
              bgColor="#E8E6FF"
            />
            <InfoCard title="Profondeur" content="Variable selon la zone traitée (0.5mm à 2.5mm)" bgColor="#D4D0FF" />
          </div>
        </Step>

        <Step title="RÉACTION DE LA PEAU (AUTO-RÉPARATION)" colorScheme="secondary">
          <div className="grid md:grid-cols-2 gap-3">
            <InfoCard
              title="Stimulation du collagène et de l'élastine"
              content="Déclenche la production naturelle de collagène et d'élastine pour réparer les micro-lésions"
              bgColor="#F0EBFF"
            />
            <InfoCard
              title="Activation du renouvellement cellulaire"
              content="Accélère le processus de régénération de la peau pour une meilleure texture"
              bgColor="#E8E6FF"
            />
          </div>
        </Step>

        <Step title="ABSORPTION DES ACTIFS (SÉRUM)" colorScheme="tertiary">
          <div className="grid md:grid-cols-2 gap-3">
            <InfoCard
              title="Pénétration profonde du sérum adapté à la peau"
              content="Les micro-canaux permettent une absorption jusqu'à 80% plus efficace des principes actifs"
              bgColor="#D4D0FF"
            />
            <InfoCard
              title="Actions ciblées selon le besoin"
              content="Sérums spécifiques pour l'acné, les tâches, l'hydratation, etc."
              bgColor="#F0EBFF"
            />
          </div>
        </Step>

        <Step title="RÉSULTATS PROGRESSIFS" colorScheme="quaternary">
          <div className="grid md:grid-cols-2 gap-3">
            <InfoCard
              title="Teint plus lumineux et homogène"
              content="Amélioration visible de la texture et de l'éclat de la peau"
              bgColor="#E8E6FF"
            />
            <InfoCard
              title="Diminution des imperfections"
              content="Réduction de l'acné, des tâches et des pores dilatés"
              bgColor="#D4D0FF"
            />
          </div>
        </Step>

        <Step title="OPTION : LUMINOTHÉRAPIE EN FIN DE SOIN" colorScheme="quinary" isLast={true}>
          <div className="grid md:grid-cols-3 gap-3">
            <InfoCard
              title="Cicatrices et collagène"
              content="Lumière rouge (630-660nm) pour stimuler davantage la production de collagène"
              bgColor="#D4D0FF"
            />
            <InfoCard
              title="Acné"
              content="Lumière bleue (415-430nm) pour ses propriétés antibactériennes"
              bgColor="#E8E6FF"
            />
            <InfoCard
              title="Tâches pigmentaires"
              content="Lumière jaune (585-595nm) pour réduire l'hyperpigmentation"
              bgColor="#F0EBFF"
            />
          </div>
        </Step>
      </div>
    </div>
  )
}
