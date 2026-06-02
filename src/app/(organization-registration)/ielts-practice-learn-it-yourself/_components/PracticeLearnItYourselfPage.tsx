"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion, useScroll, type Transition, type Variants } from "motion/react";
import {
    ArrowUpRight,
    Award,
    BookOpenCheck,
    Bot,
    Brain,
    Check,
    ChevronDown,
    CircleHelp,
    GraduationCap,
    Headphones,
    Mic2,
    PenLine,
    Quote,
    Sparkles,
    Star,
    Trophy,
} from "lucide-react";
import type { B2CPlan } from "@/app/data/plans/b2c-plans";
import { handlePayment } from "@/app/(user-auth)/user-pricing/_components/user-pricing-managment";

const URL = "https://awake-agency-next-js-main.vercel.app";

const viewport = { once: true, amount: 0.25 };
const spring: Transition = { type: "spring", stiffness: 100, damping: 18, mass: 0.8 };
const smooth: Transition = { duration: 0.75, ease: "easeOut" };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: smooth },
};

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: smooth },
};

const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0, transition: smooth },
};

const fadeRight: Variants = {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0, transition: smooth },
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: spring },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: smooth },
};

const floating: Variants = {
    animate: {
        y: [0, -8, 0],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const slowRotate: Variants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 18,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

function MotionSection({ children, className }: { children: ReactNode; className: string }) {
    return (
        <motion.section
            className={`snap-start scroll-mt-0 ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeIn}
        >
            {children}
        </motion.section>
    );
}

function ScrollProgress({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
    const { scrollYProgress } = useScroll({ container: containerRef });

    return (
        <motion.div
            className="fixed left-0 top-0 z-50 h-1 origin-left bg-[#4b26ff]"
            style={{ scaleX: scrollYProgress }}
        />
    );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, viewport);
    const prefersReducedMotion = useReducedMotion();
    const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

    useEffect(() => {
        if (!inView) return;
        if (prefersReducedMotion) {
            setDisplayValue(value);
            return;
        }

        let frame = 0;
        const totalFrames = 70;

        const tick = () => {
            frame += 1;
            const progress = Math.min(frame / totalFrames, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(value * eased));

            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [inView, prefersReducedMotion, value]);

    return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
}

const softCards = [
    { icon: BookOpenCheck, title: "Mock Tests", color: "bg-violet-100 text-violet-500" },
    { icon: Headphones, title: "Listening Practice", color: "bg-sky-100 text-sky-500" },
    { icon: PenLine, title: "Writing Tasks", color: "bg-orange-100 text-orange-500" },
    { icon: Mic2, title: "AI Speaking", color: "bg-green-100 text-green-500" },
    { icon: GraduationCap, title: "Study Abroad", color: "bg-rose-100 text-rose-500" },
];

const workItems = [
    { title: "Full Mock Test Suite", tags: ["IELTS Format", "Band Practice"], tone: "from-lime-100 to-cyan-100" },
    { title: "Practice Dashboard", tags: ["Skill Tracking", "Daily Practice"], tone: "from-violet-100 to-white" },
    { title: "AI Speaking Partner", tags: ["Speaking Prompts", "Fluency"], tone: "from-slate-200 to-slate-100" },
    { title: "Study Abroad Guide", tags: ["University Help", "Country Shortlist"], tone: "from-sky-100 to-rose-100" },
];

const team = [
    { name: "AI Speaking Partner", role: "Fluency Practice", color: "bg-violet-600" },
    { name: "Mock Test Engine", role: "Exam Simulation", color: "bg-orange-300" },
    { name: "Writing Evaluator", role: "Task Practice", color: "bg-yellow-200" },
    { name: "Study Counselor", role: "Abroad Guidance", color: "bg-sky-400" },
];

const faqs = [
    ["What is included in the ₹49/month plan?", "You get IELTS mock tests, 3000+ practice questions, AI speaking practice, and AI study abroad guidance."],
    ["Do I need to login before payment?", "If you are not logged in, we will send you to user login before opening payment."],
    ["Is this for all IELTS sections?", "Yes. The offer is meant to cover reading, listening, writing, and speaking practice."],
    ["Can I practice speaking with AI?", "Yes. The AI speaking partner is positioned as one of the main benefits of this plan."],
    ["Is ₹49 a one-time price?", "No. The offer should be presented clearly as ₹49/month."],
    ["When will payment open?", "Payment integration will be wired separately after the marketing page is finalized."],
];

export default function IELTSPracticeLearnItYourselfPage({ plan, isUserLoggedIn }: { plan: B2CPlan; isUserLoggedIn: boolean }) {
    const scrollContainerRef = useRef<HTMLElement>(null);
    const onStartPlan = () => {
        if (!isUserLoggedIn) {
            window.location.href = "/login/user";
            return;
        }

        handlePayment(plan.id);
    };

    return (
        <MotionConfig reducedMotion="user">
            <main
                ref={scrollContainerRef}
                className="h-screen snap-y snap-proximity overflow-y-auto scroll-smooth bg-[#fbfbfa] text-[#1d1d1f] [scrollbar-gutter:stable] [-webkit-overflow-scrolling:touch]"
            >
                <ScrollProgress containerRef={scrollContainerRef} />
                <HeroSection onStartPlan={onStartPlan} />
                <StatsSection />
                <ServicesSection onStartPlan={onStartPlan} />
                <WorkSection />
                <TeamSection />
                <TestimonialsSection />
                <PricingSection plan={plan} onStartPlan={onStartPlan} />
                <FAQSection />
                <AwardsSection />
                <FooterCTASection onStartPlan={onStartPlan} />
            </main>
        </MotionConfig>
    );
}

function HeroSection({ onStartPlan }: { onStartPlan: () => void }) {
    const hero_background = "";
    const hero_avatar_1 = `${URL}/images/home/avatar_1.jpg`;
    const hero_avatar_2 = `${URL}/images/home/avatar_2.jpg`;
    const hero_avatar_3 = `${URL}/images/home/avatar_3.jpg`;
    const hero_avatar_4 = `${URL}/images/home/avatar_4.jpg`;
    const hero_logo_1 = "";
    const hero_logo_2 = "";
    const hero_logo_3 = "";
    const hero_logo_4 = "";
    const hero_logo_5 = "";
    const heroAvatars = [hero_avatar_1, hero_avatar_2, hero_avatar_3, hero_avatar_4];
    const heroLogos = [hero_logo_1, hero_logo_2, hero_logo_3, hero_logo_4, hero_logo_5];

    return (
        <motion.section
            className="relative min-h-screen snap-start overflow-hidden px-5 py-10 sm:px-8 lg:px-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_12%_38%,rgba(191,235,247,0.7),transparent_30%),radial-gradient(circle_at_86%_36%,rgba(255,239,199,0.85),transparent_32%)]"
                style={backgroundImageStyle(hero_background)}
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    scale: [1, 1.03, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-center text-center">
                <motion.div variants={staggerItem} className="mb-8 inline-flex items-center gap-2 text-lg font-semibold">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-[#1d1d1f] text-white">
                        <Sparkles className="size-4" />
                    </span>
                    IELTS Go Global
                </motion.div>

                <h1 className="max-w-6xl text-6xl font-semibold leading-[1.05] tracking-normal sm:text-7xl">
                    <motion.span variants={staggerItem} className="block mb-5">Learn IELTS yourself</motion.span>
                    <motion.span variants={staggerItem} className="block">
                        with <span className="font-serif italic">smart practice</span>
                    </motion.span>
                </h1>

                <motion.p variants={staggerItem} className="mt-7 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
                    Get 10 mock tests, 3000+ practice questions, AI speaking support, and study abroad guidance for one simple monthly plan.
                </motion.p>

                <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row">
                    <motion.button
                        onClick={onStartPlan}
                        variants={staggerItem}
                        whileHover={{ y: -3, boxShadow: "0 18px 40px rgba(75, 38, 255, 0.28)" }}
                        whileTap={{ scale: 0.98 }}
                        transition={spring}
                        className="inline-flex h-12 items-center gap-8 rounded-full bg-[#4b26ff] px-5 pl-7 text-sm font-medium text-white"
                    >
                        Start for ₹49/month
                        <span className="flex size-8 items-center justify-center rounded-full bg-white text-[#1d1d1f]">
                            <ArrowUpRight className="size-4" />
                        </span>
                    </motion.button>

                    <motion.div variants={staggerItem} className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {heroAvatars.map((avatar, index) => (
                                <motion.div
                                    key={index}
                                    className="size-8 rounded-full border-2 border-white bg-gradient-to-br from-sky-200 to-orange-200 bg-cover bg-center"
                                    style={backgroundImageStyle(avatar)}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
                                />
                            ))}
                        </div>
                        <motion.div variants={staggerItem} className="text-left text-xs text-neutral-500">
                            <div className="flex text-amber-500">
                                {[0, 1, 2, 3, 4].map((item) => (
                                    <Star key={item} className="size-4 fill-current" />
                                ))}
                            </div>
                            Trusted by IELTS learners
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div variants={staggerItem} className="mt-28 w-full">
                    <div className="mx-auto flex max-w-xl items-center gap-4 text-xs text-neutral-500">
                        <div className="h-px flex-1 bg-neutral-200" />
                        Built for focused self-preparation
                        <div className="h-px flex-1 bg-neutral-200" />
                    </div>
                    <motion.div variants={staggerContainer} className="mt-9 grid grid-cols-2 gap-7 text-left text-lg font-semibold sm:grid-cols-5">
                        {["Mock Tests", "Practice Sets", "AI Speaking", "Writing Tasks", "Study Abroad"].map((item, index) => (
                            <motion.div key={item} variants={staggerItem} className="flex items-center justify-center gap-2">
                                <span
                                    className="size-5 rounded-full bg-[#1d1d1f] bg-cover bg-center"
                                    style={backgroundImageStyle(heroLogos[index])}
                                />
                                {item}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}

function StatsSection() {
    const stats_image_1 = "";
    const stats_image_2 = "";
    const stats_image_3 = "";
    const statsImages = [stats_image_1, stats_image_2, stats_image_3];

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl text-center">
                <h2 className="text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                    We combine <Pill icon={Brain} label="Practice" color="bg-violet-100 text-violet-500" />{" "}
                    <Pill icon={Bot} label="AI Support" color="bg-sky-100 text-sky-500" /> &{" "}
                    <Pill icon={GraduationCap} label="Guidance" color="bg-orange-100 text-orange-500" />
                    <br />
                    to help students prepare with clarity and confidence.
                </h2>

                <motion.div variants={staggerContainer} className="mt-24 grid gap-10 text-left sm:grid-cols-3">
                    <Stat value="3k+" label="Practice questions" imageUrl={statsImages[1]} border />
                    <Stat value="10" label="Full mock tests included" imageUrl={statsImages[0]} border />
                    <Stat value="All" label="IELTS sections covered" imageUrl={statsImages[2]} border />
                </motion.div>
            </div>
        </MotionSection>
    );
}

function ServicesSection({ onStartPlan }: { onStartPlan: () => void }) {
    const service_image_1 = "";
    const service_image_2 = "";
    const service_image_3 = "";
    const service_image_4 = "";
    const service_image_5 = "";
    const servicesImages = [service_image_1, service_image_2, service_image_3, service_image_4, service_image_5];

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <motion.h2 variants={fadeUp} className="text-center text-4xl font-semibold leading-tight tracking-normal">
                    Where IELTS practice
                    <br />
                    meets <span className="font-serif italic">AI guidance</span>
                </motion.h2>

                <motion.div variants={staggerContainer} className="mt-14 grid gap-5 sm:grid-cols-5">
                    {softCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.title}
                                variants={staggerItem}
                                whileHover={{ y: -6, scale: 1.025, boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)" }}
                                transition={spring}
                                className={`${card.color} flex aspect-square flex-col justify-between rounded-lg bg-cover bg-center p-6`}
                                style={backgroundImageStyle(servicesImages[index])}
                            >
                                <motion.span whileHover={{ rotate: -8, y: -2 }} transition={spring}>
                                    <Icon className="size-8" />
                                </motion.span>
                                <h3 className="text-xl font-medium leading-6">{card.title}</h3>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-6 rounded-lg bg-[#1d1d1f] p-8 text-white sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-2xl font-medium leading-tight">
                        Start IELTS preparation.
                        <br />
                        Practice smarter for ₹49/month.
                    </h3>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <motion.button onClick={onStartPlan} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={spring} className="inline-flex h-11 items-center gap-4 rounded-full bg-white px-5 text-sm font-medium text-[#1d1d1f]">
                            View Plan <ArrowUpRight className="size-4" />
                        </motion.button>
                        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={spring} className="inline-flex h-11 items-center gap-4 rounded-full border border-white/45 px-5 text-sm font-medium">
                            See Features <ArrowUpRight className="size-4" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </MotionSection>
    );
}

function WorkSection() {
    const work_image_1 = `${URL}/images/home/onlinePresence/online_img_1.jpg`;
    const work_image_2 = `${URL}/images/home/onlinePresence/online_img_2.jpg`;
    const work_image_3 = `${URL}/images/home/customerStories/customer_bg_img.jpg`;
    const work_image_4 = `${URL}/images/home/onlinePresence/online_img_4.jpg`;
    const workImages = [work_image_1, work_image_2, work_image_3, work_image_4];

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <motion.h2 variants={fadeUp} className="mx-auto max-w-lg text-center text-4xl font-semibold leading-tight tracking-normal">
                    How the plan
                    <br />
                    <span className="font-serif italic">supports</span> your IELTS prep
                </motion.h2>

                <div className="mt-16 grid gap-x-5 gap-y-8 sm:grid-cols-2">
                    {workItems.map((item, index) => (
                        <motion.article
                            key={item.title}
                            variants={index % 2 === 0 ? fadeLeft : fadeRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                        >
                            <ImageBlock tone={item.tone} label={item.title} imageUrl={workImages[index]} />
                            <motion.h3 variants={fadeUp} className="mt-5 text-xl font-medium">{item.title}</motion.h3>
                            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="mt-3 flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                    <motion.span key={tag} variants={staggerItem} className="rounded-full border border-neutral-200 px-4 py-1.5 text-xs text-neutral-700">
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </MotionSection>
    );
}

function TeamSection() {
    const team_image_1 = `${URL}/images/home/avatar_1.jpg`;
    const team_image_2 = `${URL}/images/home/avatar_2.jpg`;
    const team_image_3 = `${URL}/images/home/avatar_3.jpg`;
    const team_image_4 = `${URL}/images/home/avatar_4.jpg`;
    const teamImages = [team_image_1, team_image_2, team_image_3, team_image_4];

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl text-center">
                <motion.h2 variants={fadeUp} className="text-4xl font-semibold leading-tight tracking-normal">
                    Meet the <span className="font-serif italic">learning tools</span>
                    <br />
                    inside your plan
                </motion.h2>

                <motion.div variants={staggerContainer} className="mt-16 grid gap-6 sm:grid-cols-4">
                    {team.map((member, index) => (
                        <motion.article key={member.name} variants={staggerItem} whileHover={{ y: -8 }} transition={spring}>
                            <motion.div
                                className={`${member.color} flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[48px] bg-cover bg-center`}
                                style={backgroundImageStyle(teamImages[index])}
                                variants={floating}
                                animate="animate"
                                transition={{ duration: 5 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                            >
                                {!teamImages[index] && <div className="mb-0 size-40 rounded-t-full bg-white/55" />}
                            </motion.div>
                            <h3 className="mt-5 text-xl font-medium">{member.name}</h3>
                            <p className="mt-2 text-sm text-neutral-500">{member.role}</p>
                            <div className="mt-3 flex justify-center gap-3 text-neutral-400">
                                <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                                <motion.span variants={slowRotate} animate="animate">
                                    <Sparkles className="size-4" />
                                </motion.span>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </MotionSection>
    );
}

function TestimonialsSection() {
    const testimonial_1 = `${URL}/images/home/customerStories/customer_bg_img.jpg`;
    const testimonial_2 = `${URL}/images/home/customerStories/creativity_img.jpg`;
    const testimonial_3 = `${URL}/images/home/creative/creative_img_2.png`;

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <motion.h2 variants={fadeUp} className="mx-auto max-w-xl text-center text-4xl font-semibold leading-tight tracking-normal">
                    What IELTS learners
                    <br />
                    are saying <span className="font-serif italic">about practice</span>
                </motion.h2>

                <motion.div variants={staggerContainer} className="mt-16 grid gap-5 lg:grid-cols-[2fr_1fr]">
                    <motion.article
                        variants={scaleIn}
                        whileHover={{ scale: 1.01 }}
                        transition={spring}
                        className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-lg bg-[#1d1d1f] bg-cover bg-center p-7 text-white"
                        style={backgroundImageStyle(testimonial_1)}
                    >
                        <motion.div className="absolute inset-0 bg-cover bg-center" style={backgroundImageStyle(testimonial_1)} whileInView={{ y: [-10, 10] }} viewport={viewport} transition={{ duration: 1.6, ease: "easeOut" }} />
                        <div className="absolute inset-0 bg-black/45" />
                        <p className="relative text-sm text-white/65">Student story</p>
                        <p className="relative mt-auto max-w-2xl text-2xl font-medium leading-tight">
                            “Having mock tests and speaking practice in one place makes preparation feel much easier to manage.”
                        </p>
                        <p className="relative mt-6 text-sm text-white/70">IELTS learner</p>
                    </motion.article>

                    <motion.article variants={fadeUp} className="flex min-h-[360px] flex-col justify-end rounded-lg bg-yellow-200 p-7">
                        <p className="text-sm text-neutral-600">Facts & numbers</p>
                        <div className="mt-auto">
                            <div className="text-5xl font-semibold">₹<CountUp value={49} /></div>
                            <p className="mt-5 text-xl font-medium leading-tight">monthly plan for self-paced IELTS practice.</p>
                        </div>
                    </motion.article>

                    <motion.article
                        variants={fadeUp}
                        className="relative overflow-hidden rounded-lg bg-[#1d1d1f] bg-cover bg-center p-7 text-white"
                        style={backgroundImageStyle(testimonial_2)}
                    >
                        <motion.div className="absolute inset-0 bg-cover bg-center" style={backgroundImageStyle(testimonial_2)} whileInView={{ y: [-8, 8] }} viewport={viewport} transition={{ duration: 1.5, ease: "easeOut" }} />
                        <div className="absolute inset-0 bg-black/35" />
                        <p className="relative text-sm text-white/65">Student story</p>
                        <p className="relative mt-7 text-xl font-medium leading-tight">
                            “The AI speaking partner helps me practice whenever I have time.”
                        </p>
                        <div
                            className="relative mt-8 h-36 rounded-lg bg-gradient-to-br from-orange-100 to-sky-100 bg-cover bg-center"
                            style={backgroundImageStyle(testimonial_3)}
                        />
                    </motion.article>

                    <motion.article variants={fadeUp} className="rounded-lg bg-neutral-100 p-7 lg:col-span-1">
                        <Quote className="size-7 text-neutral-400" />
                        <p className="mt-7 text-xl font-medium leading-tight">
                            “A low-cost plan makes daily IELTS practice more realistic.”
                        </p>
                        <p className="mt-32 text-sm text-neutral-500">Self-study student</p>
                    </motion.article>
                </motion.div>
            </div>
        </MotionSection>
    );
}

function PricingSection({ plan, onStartPlan }: { plan: B2CPlan; onStartPlan: () => void }) {
    const pricing_image_1 = "";
    const pricing_image_2 = "";

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <motion.h2 variants={scaleIn} className="text-center text-4xl font-semibold leading-tight tracking-normal">
                    Pick the plan that
                    <br />
                    fits your <span className="font-serif italic">self-study</span>
                </motion.h2>

                <motion.div variants={staggerContainer} className="mt-16 grid gap-5 lg:grid-cols-2">
                    <PlanCard
                        onStartPlan={onStartPlan}
                        title={plan.title}
                        priceInr={plan.priceInr}
                        description={`${plan.label} for learners who want affordable IELTS preparation.`}
                        tone="bg-yellow-200 text-[#1d1d1f]"
                        features={["10 mock tests", "3000+ practice questions", "AI speaking partner", "Study abroad counselor", "All IELTS sections"]}
                        imageUrl={pricing_image_1}
                    />
                    <PlanCard
                        onStartPlan={onStartPlan}
                        title="Bundle"
                        priceInr={plan.priceInr}
                        description="Everything in one simple monthly IELTS practice offer."
                        tone="bg-[#4b26ff] text-white"
                        features={["Reading practice", "Listening practice", "Writing tasks", "Speaking prompts", "Self-paced preparation"]}
                        imageUrl={pricing_image_2}
                        dark
                    />
                </motion.div>
            </div>
        </MotionSection>
    );
}

function FAQSection() {
    const faq_image_1 = "";

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
                {faq_image_1 && <ImageBlock tone="from-neutral-100 to-neutral-50" label="FAQ image" imageUrl={faq_image_1} />}
                <motion.h2 variants={fadeUp} className="text-center text-4xl font-semibold leading-tight tracking-normal">
                    Got questions?
                    <br />
                    We have got <span className="font-serif italic">answers</span>
                </motion.h2>

                <motion.div variants={staggerContainer} className="mt-16 space-y-3">
                    {faqs.map(([question, answer], index) => (
                        <FAQItem key={question} question={question} answer={answer} defaultOpen={index === 0 || index === 3} />
                    ))}
                </motion.div>
            </div>
        </MotionSection>
    );
}

function AwardsSection() {
    const award_image_1 = "";
    const award_image_2 = "";
    const award_image_3 = "";

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <motion.h2 variants={fadeUp} className="mx-auto max-w-2xl text-center text-4xl font-semibold leading-tight tracking-normal">
                    Highlights and <span className="font-serif italic">achievements</span>
                    <br />
                    for focused IELTS preparation
                </motion.h2>

                <motion.div variants={staggerContainer} className="mt-16 grid gap-5 md:grid-cols-3">
                    <AwardCard icon={Trophy} label="Practice Bundle" text="10 mock tests and 3000+ questions in one monthly plan." year="2026" imageUrl={award_image_1} />
                    <AwardCard icon={Award} label="AI Tools" text="Speaking practice and study abroad guidance built into the offer." year="2026" imageUrl={award_image_2} />
                    <AwardCard icon={CircleHelp} label="Self Study" text="Designed for students who want to prepare without waiting for classes." year="2026" imageUrl={award_image_3} />
                </motion.div>
            </div>
        </MotionSection>
    );
}

function FooterCTASection({ onStartPlan }: { onStartPlan: () => void }) {
    const footer_cta_image = "";
    const footer_logo_image = "";

    return (
        <MotionSection className="bg-white px-5 py-24 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-5xl">
                <motion.div
                    variants={scaleIn}
                    className="rounded-lg border border-neutral-200 bg-[radial-gradient(circle_at_8%_76%,rgba(191,235,247,0.75),transparent_28%),radial-gradient(circle_at_94%_72%,rgba(255,239,199,0.9),transparent_28%)] bg-cover bg-center px-6 py-24 text-center"
                    style={backgroundImageStyle(footer_cta_image)}
                >
                    <h2 className="text-4xl font-semibold tracking-normal">IELTS practice for independent learners</h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-500">
                        Start with mock tests, practice questions, AI speaking, and study abroad guidance for ₹49/month.
                    </p>
                    <motion.button onClick={onStartPlan} whileHover={{ y: -2, boxShadow: "0 14px 34px rgba(15, 23, 42, 0.18)" }} whileTap={{ scale: 0.98 }} transition={spring} className="mt-7 inline-flex h-11 items-center gap-4 rounded-full bg-[#1d1d1f] px-5 text-sm font-medium text-white">
                        Start for ₹49/month <ArrowUpRight className="size-4" />
                    </motion.button>
                </motion.div>

                <motion.footer variants={staggerContainer} className="mt-24 grid gap-10 border-b border-neutral-200 pb-16 sm:grid-cols-4">
                    <motion.div variants={staggerItem} className="sm:col-span-2">
                        <div className="flex items-center gap-3 text-2xl font-semibold">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-[#1d1d1f] text-white">
                                {footer_logo_image ? (
                                    <span className="block size-8 rounded-lg bg-cover bg-center" style={backgroundImageStyle(footer_logo_image)} />
                                ) : (
                                    <Sparkles className="size-4" />
                                )}
                            </span>
                            IELTS Go Global
                        </div>
                        <p className="mt-6 max-w-sm text-sm leading-6 text-neutral-500">
                            IELTS self-practice with mock tests, practice questions, AI speaking, and study abroad guidance.
                        </p>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                        <h3 className="text-sm font-medium">Plan</h3>
                        <div className="mt-5 space-y-3 text-sm text-neutral-500">
                            <p>Mock Tests</p>
                            <p>Practice Questions</p>
                            <p>AI Speaking</p>
                            <p>Pricing</p>
                        </div>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                        <h3 className="text-sm font-medium">Contact</h3>
                        <div className="mt-5 space-y-3 text-sm text-neutral-500">
                            <p>ieltsgoglobal.com</p>
                            <p>₹49/month</p>
                            <p>Payment opening soon</p>
                        </div>
                    </motion.div>
                </motion.footer>

                <motion.p variants={fadeIn} className="pt-10 text-center text-xs text-neutral-400">©2026 IELTS Go Global. All Rights Reserved</motion.p>
            </div>
        </MotionSection>
    );
}

function Pill({ icon: Icon, label, color }: { icon: typeof Brain; label: string; color: string }) {
    return (
        <motion.span variants={scaleIn} className={`${color} inline-flex items-center gap-2 rounded-full px-4 py-2 font-serif italic`}>
            <Icon className="size-6" />
            {label}
        </motion.span>
    );
}

function Stat({ value, label, border = false, imageUrl = "" }: { value: string; label: string; border?: boolean; imageUrl?: string }) {
    return (
        <motion.div variants={staggerItem} className={border ? "border-y border-neutral-200 py-6 sm:border-x sm:border-y-0 sm:px-16 sm:py-0" : ""}>
            {imageUrl && <div className="mb-5 h-24 rounded-lg bg-neutral-100 bg-cover bg-center" style={backgroundImageStyle(imageUrl)} />}
            <div className="flex items-start gap-1">
                <span className="text-4xl font-semibold">+</span>
                <span className="text-8xl font-semibold leading-none tracking-normal">{renderCount(value)}</span>
            </div>
            <p className="mt-5 max-w-32 text-sm leading-5 text-neutral-500">{label}</p>
        </motion.div>
    );
}

function ImageBlock({ tone, label, imageUrl = URL }: { tone: string; label: string; imageUrl?: string }) {
    return (
        <motion.div
            className={`relative flex aspect-[1.52] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${tone}`}
            style={backgroundImageStyle(imageUrl)}
            whileHover="hover"
            initial="rest"
            animate="rest"
        >
            {imageUrl && (
                <motion.div
                    variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.045 },
                    }}
                    transition={smooth}
                    className="absolute inset-0 bg-cover bg-center"
                    style={backgroundImageStyle(imageUrl)}
                />
            )}
            <motion.div variants={{ rest: { y: 0 }, hover: { y: -3 } }} transition={spring} className="relative rounded-lg bg-white/70 px-5 py-3 text-lg font-semibold text-[#1d1d1f] backdrop-blur">
                {label}
            </motion.div>
        </motion.div>
    );
}

function PlanCard({
    onStartPlan,
    title,
    priceInr,
    description,
    tone,
    features,
    imageUrl = "",
    dark = false,
}: {
    onStartPlan: () => void;
    title: string;
    priceInr: number;
    description: string;
    tone: string;
    features: string[];
    imageUrl?: string;
    dark?: boolean;
}) {
    return (
        <motion.article
            variants={staggerItem}
            whileHover={{ y: -8, scale: 1.01, boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)" }}
            transition={spring}
            className={`${tone} grid gap-8 rounded-lg bg-cover bg-center p-8 sm:grid-cols-2`}
            style={backgroundImageStyle(imageUrl)}
        >
            <div>
                <span className={`inline-flex rounded-full px-4 py-2 text-sm ${dark ? "bg-[#1d1d1f] text-white" : "bg-[#1d1d1f] text-white"}`}>
                    {title}
                </span>
                <p className={`mt-5 max-w-52 text-sm leading-6 ${dark ? "text-white/60" : "text-neutral-600"}`}>{description}</p>
                <div className="mt-10 flex items-end gap-1">
                    <span className="text-5xl font-semibold">₹<CountUp value={priceInr} /></span>
                    <span className={dark ? "text-white/65" : "text-neutral-600"}>/month</span>
                </div>
                <motion.button onClick={onStartPlan} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={spring} className={`mt-4 inline-flex h-11 items-center gap-4 rounded-full px-5 text-sm font-medium ${dark ? "bg-white text-[#1d1d1f]" : "bg-white text-[#1d1d1f]"}`}>
                    Start Plan <ArrowUpRight className="size-4" />
                </motion.button>
            </div>
            <div>
                <h3 className="text-sm font-medium">Features</h3>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="mt-5 space-y-4 text-sm">
                    {features.map((feature) => (
                        <motion.div key={feature} variants={staggerItem} className="flex items-center gap-3">
                            <Check className="size-4" />
                            {feature}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.article>
    );
}

function AwardCard({ icon: Icon, label, text, year, imageUrl = "" }: { icon: typeof Trophy; label: string; text: string; year: string; imageUrl?: string }) {
    return (
        <motion.article
            variants={staggerItem}
            whileHover={{ y: -8, rotateX: 2, rotateY: -2, boxShadow: "0 24px 60px rgba(15, 23, 42, 0.1)" }}
            transition={spring}
            className="flex min-h-72 flex-col rounded-lg border border-neutral-200 bg-cover bg-center p-8"
            style={backgroundImageStyle(imageUrl)}
        >
            <motion.span whileHover={{ rotate: -8, scale: 1.08 }} transition={spring}>
                <Icon className="size-7" />
            </motion.span>
            <p className="mt-auto text-sm text-neutral-500">{label}</p>
            <h3 className="mt-4 text-xl font-medium leading-tight">{text}</h3>
            <p className="mt-auto text-sm text-neutral-500">{year}</p>
        </motion.article>
    );
}

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <motion.div variants={staggerItem} className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-6 p-6 text-left text-xl font-medium"
            >
                {question}
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={spring}>
                    <ChevronDown className="size-5 shrink-0" />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={smooth}
                    >
                        <p className="max-w-4xl px-6 pb-6 text-sm leading-6 text-neutral-500">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function renderCount(value: string) {
    if (value === "3k+") return <><CountUp value={3} />k+</>;
    if (value === "10") return <CountUp value={10} />;

    return value;
}

function backgroundImageStyle(imageUrl: string): CSSProperties | undefined {
    if (!imageUrl) return undefined;

    return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
}
