/**
 * Scene registry for the guided tour system.
 *
 * This file defines:
 * 1. All available tour scenes
 * 2. Which route each scene belongs to
 * 3. The execution order of scenes per route
 *
 * IMPORTANT:
 * - A scene is NOT global — it is scoped to a specific route.
 * - The same route can have multiple scenes (ordered).
 * - Route transitions reset the tour flow automatically.
 */

import HomeIntroScene from '../../scene/home-page/HomeIntroScene'
import HomeBeginPracticeScene from '../../scene/home-page/HomeBeginPracticeScene'
import PracticeSummaryScene from '../../scene/practice-tests/PracticeSummaryScene'

import type { ComponentType } from 'react'

/**
 * Source of truth for all tour scenes.
 *
 * Rules:
 * - `id` must be globally unique
 * - `route` must match a Next.js pathname exactly
 * - `component` must be a React component that implements `TourSceneProps`
 *
 * Order matters:
 * Scenes are executed in the order they appear for a given route.
 */
const SCENES = [
    {
        id: 'home.intro',
        route: '/',
        component: HomeIntroScene,
    },
    {
        id: 'home.beginPractice',
        route: '/',
        component: HomeBeginPracticeScene,
    },
    {
        id: 'practice.summary',
        route: '/practice-sets',
        component: PracticeSummaryScene,
    },
] as const

/**
 * Union type of all valid scene IDs.
 *
 * This guarantees:
 * - Only registered scenes can be referenced
 * - Scene registry lookups are type-safe
 */
export type TourSceneId = (typeof SCENES)[number]['id']

/**
 * Fast lookup map from scene ID → scene component.
 *
 * Used by the tour controller to dynamically render scenes
 * without conditional logic or imports in the controller.
 */
export const SCENE_REGISTRY = Object.fromEntries(
    SCENES.map(scene => [scene.id, scene.component])
) as Record<TourSceneId, ComponentType<any>>

/**
 * Route → ordered list of scene IDs.
 *
 * This structure allows:
 * - Multiple scenes per route
 * - Independent tour flows per page
 * - Clean reset when navigating between routes
 *
 * Example:
 * {
 *   "/": ["home.intro", "home.beginPractice"],
 *   "/practice-sets": ["practice.summary"]
 * }
 */
export const TOUR_FLOW_BY_ROUTE = SCENES.reduce<
    Record<string, TourSceneId[]>
>((acc, scene) => {
    acc[scene.route] ??= []
    acc[scene.route].push(scene.id)
    return acc
}, {})