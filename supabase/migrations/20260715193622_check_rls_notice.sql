DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' LOOP
    RAISE NOTICE '% - RLS: %', r.tablename, r.rowsecurity;
  END LOOP;
END $$;