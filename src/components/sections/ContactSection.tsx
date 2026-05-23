import { useEffect, useRef, useCallback } from 'react'
import { contact } from '../../data/contact'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const targetRef = useRef<HTMLAnchorElement>(null);
    const mousePosRef = useRef<{ x: number | null, y: number | null }>({ x: null, y: null });
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);

    const lastScrollYRef = useRef(0);
    const isScrollingDownRef = useRef(false);

    const drawArrow = useCallback(() => {
        if (!canvasRef.current || !targetRef.current || !ctxRef.current || !sectionRef.current) return;

        const sectionRect = sectionRef.current.getBoundingClientRect();
        // Hanya muncul jika Contact Section sudah mulai terlihat di layar
        if (sectionRect.top > window.innerHeight - 50) return;

        // Hanya muncul jika sedang scroll ke bawah
        if (!isScrollingDownRef.current) return;

        const targetEl = targetRef.current;
        const ctx = ctxRef.current;
        const mouse = mousePosRef.current;

        const x0 = mouse.x;
        const y0 = mouse.y;

        if (x0 === null || y0 === null) return;

        const rect = targetEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const a = Math.atan2(cy - y0, cx - x0);
        const x1 = cx - Math.cos(a) * (rect.width / 2 + 12);
        const y1 = cy - Math.sin(a) * (rect.height / 2 + 12);

        const midX = (x0 + x1) / 2;
        const midY = (y0 + y1) / 2;
        const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
        const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
        const controlX = midX;
        const controlY = midY + offset * t;

        const r = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
        const opacity = Math.min(1.0, (r - Math.max(rect.width, rect.height) / 2) / 500);

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
        ctx.lineWidth = 2;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(controlX, controlY, x1, y1);
        ctx.setLineDash([8, 6]);
        ctx.stroke();
        ctx.restore();

        const angle = Math.atan2(y1 - controlY, x1 - controlX);
        const headLength = 10 * (ctx.lineWidth / 1.5);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(
            x1 - headLength * Math.cos(angle - Math.PI / 6),
            y1 - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(x1, y1);
        ctx.lineTo(
            x1 - headLength * Math.cos(angle + Math.PI / 6),
            y1 - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !targetRef.current) return;

        ctxRef.current = canvas.getContext("2d");
        const ctx = ctxRef.current;

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollYRef.current + 5) {
                isScrollingDownRef.current = true;
            } else if (currentScrollY < lastScrollYRef.current - 5) {
                isScrollingDownRef.current = false;
            }
            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("resize", updateCanvasSize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        updateCanvasSize();

        const animateLoop = () => {
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawArrow();
            }
            animationFrameIdRef.current = requestAnimationFrame(animateLoop);
        };

        animateLoop();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [drawArrow]);

    return (
        <section ref={sectionRef} className="relative mt-20 mb-8 flex flex-col items-center justify-center py-16 sm:py-24 border-t border-[rgba(242,242,242,0.1)] z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center px-4 max-w-2xl mx-auto flex flex-col items-center"
            >
                <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-white tracking-tight">
                    Interested in working together?
                </h2>
                <p className="text-base sm:text-lg text-white/60 mb-10 max-w-lg">
                    {contact.headline}
                </p>
                <a
                    ref={targetRef}
                    href={`mailto:${contact.email}`}
                    className="group relative flex items-center gap-2 rounded-full border border-[rgba(242,242,242,0.1)] bg-white/5 px-6 py-3.5 text-[15px] font-medium text-white shadow-floating transition-all duration-300 hover:bg-white/10 hover:shadow-elevated hover:scale-105 active:scale-95"
                >
                    <Mail className="h-4 w-4" />
                    <span>Contact Me</span>
                </a>
            </motion.div>

            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-50"
            />
        </section>
    );
}
