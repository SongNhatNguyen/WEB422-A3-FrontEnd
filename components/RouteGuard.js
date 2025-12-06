import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { getFavourites } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);

  const authCheck = useCallback((url) => {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    async function updateAtom() {
      setFavouritesList(await getFavourites());
    }
    updateAtom();

    authCheck(router.pathname);

    const handleRouteChange = (url) => authCheck(url);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [authCheck, router.events, router.pathname, setFavouritesList]);

  return <>{authorized && props.children}</>;
}