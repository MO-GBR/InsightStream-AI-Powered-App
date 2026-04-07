'use client';

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { useModalStore } from '@/lib/zustand/ModalStore';

const Modal = () => {
    const { isOpen, content, closeModal } = useModalStore();

    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if(isOpen) {
            gsap.set([overlayRef.current, modalRef.current], {
                pointerEvents: "auto",
            });

            const tl = gsap.timeline();

            tl.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            ).fromTo(
                modalRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" },
                "-=0.2"
            );
        }
    }, [isOpen]);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: () => closeModal()
        });

        tl.to(modalRef.current, {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power3.in",
        }).to(overlayRef.current, {
            opacity: 0,
            duration: 0.3,
            onStart: () => {
                gsap.set(overlayRef.current, { pointerEvents: "none" });
            }
        }, "-=0.1");
    };

    useEffect(() => {
        const esc = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {
                isOpen && (
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                        onClick={handleClose}
                        ref={overlayRef}
                    />
                )
            }
            <div className="modal" ref={modalRef}>
                <div className='bg-black border cursor-pointer w-[100px] flex-center gap-3 p-2 rounded-full' onClick={handleClose}>
                    ESC
                    <span className='text-white font-bold p-1 rounded-full bg-gray-600'>X</span>
                </div>
                {content}
            </div>
        </div>
    )
}

export default Modal