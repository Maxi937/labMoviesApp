import { useEffect, useState } from "react";
import {supabase, getSession} from '../api/supabase-api'

const useSession = () => {
  const [session, setSession ] = useState(null);

  useEffect(() => {
    getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return [session, setSession ];
};

export default useSession