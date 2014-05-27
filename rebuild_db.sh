#!/usr/bin/env bash
DB="neveragain.db"

if [[ "$1" != "" ]]; 
  then DB="$1"
fi

echo "rebuilding $DB ..."

if [ -e "$DB" ]; then
  echo "deleting old $DB"
  rm $DB
fi

sqlite3 $DB < src/clojure/neveragain/schema.sql
sqlite3 $DB < test/neveragain/testdata.sql

echo "Done!"
