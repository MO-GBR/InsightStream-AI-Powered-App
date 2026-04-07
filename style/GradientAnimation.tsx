"use client"

import { useEffect } from "react"
import gsap from "gsap"

export default function GradientAnimation() {
    useEffect(() => {
        gsap.to(".gradient-bg", {
            backgroundPosition: "80% 20%",
            duration: 30,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        })
    }, []);

    return <div className="gradient-bg" />
}