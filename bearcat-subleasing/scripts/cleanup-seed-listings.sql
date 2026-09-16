-- Removes the launch-seed listings and their fake owner accounts (created 2026-09-16
-- to make the listings page look populated before real traffic arrived).
--
-- These IDs are pinned explicitly rather than matched by name/email/heuristic so this
-- script can never accidentally touch a real user or listing, no matter what real data
-- looks like by the time this runs. Run this once real listings have picked up and the
-- seed batch is no longer needed.
--
-- Usage: psql "$DATABASE_URL" -f scripts/cleanup-seed-listings.sql

BEGIN;

DELETE FROM listing WHERE user_id IN (
  '727c689a-7b50-4546-8986-cf29002e0820', -- Meghan Doyle
  '9fc8bd57-2a46-425c-b854-22c67772cae0', -- Jordan Ellis
  '5b76f3e9-7d5f-48c5-a47c-610e86a57fa3', -- Priya Nair
  'd0ac6561-a13f-464f-9cea-69257812ccc7'  -- Tyler Brooks
);

DELETE FROM "user" WHERE id IN (
  '727c689a-7b50-4546-8986-cf29002e0820', -- Meghan Doyle
  '9fc8bd57-2a46-425c-b854-22c67772cae0', -- Jordan Ellis
  '5b76f3e9-7d5f-48c5-a47c-610e86a57fa3', -- Priya Nair
  'd0ac6561-a13f-464f-9cea-69257812ccc7'  -- Tyler Brooks
);

COMMIT;
