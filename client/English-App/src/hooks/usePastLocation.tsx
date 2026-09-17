import { useRouterState } from "@tanstack/react-router"

export interface LessonDeck {
  name: string;
  id: string;
  deckDescription: string;
  lastSeen: string;
  cardLength: number;
}

interface RouteMatch {
  id: string;
  index: number;
  routeId: string;
  params: Record<string, string>;
  _strictParams: Record<string, string>;
  pathname: string;
  updatedAt: number;
  search: Record<string, unknown>;
  _strictSearch: Record<string, unknown>;
  status: 'pending' | 'success' | 'error';
  isFetching: boolean;
  _nonReactive: {
    loadPromise: {
      status: string;
    };
  };
  context: Record<string, unknown>;
  abortController: Record<string, unknown> | AbortController;
  fetchCount: number;
  cause: string;
  loaderDeps: Record<string, unknown>;
  invalid: boolean;
  preload: boolean;
  staticData: Record<string, unknown>;
  fullPath: string;
  globalNotFound: boolean;
  loaderData: {
    lessonDecksData: LessonDeck[];
    personalDecksData: unknown[];
  };
}

export default function usePastLocation() {

    const cachedMatches = useRouterState().cachedMatches

    const pastLocation: RouteMatch | undefined = cachedMatches[cachedMatches.length - 1]

    return pastLocation
}

