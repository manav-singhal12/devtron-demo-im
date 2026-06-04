#!/usr/bin/env bash
# Sample queries for the Region-Weighted API

echo "Search Mumbai (top 5):"
curl -s 'http://localhost:3001/api/search?region=Mumbai&limit=5' | jq '.'

echo "\nSearch New Delhi (top 5):"
curl -s 'http://localhost:3001/api/search?region=Delhi&limit=5' | jq '.'

echo "\nSearch Bangalore (top 5):"
curl -s 'http://localhost:3001/api/search?region=Bangalore&limit=5' | jq '.'
