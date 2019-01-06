#!/usr/bin/awk -f
 
# Remove YAML front matter from jupytext-converted .py notebooks

BEGIN { drop = 0; }
/^# ---$/ { if (NR <= 3) { drop = 1 } else { drop = 0; next } }
drop == 0 { print }
