#!/bin/bash
# save as ~/bin/cpu_load.sh and make it executable

PREV=($(head -n1 /proc/stat))
sleep 0.1
CURR=($(head -n1 /proc/stat))

IDLE=$(( ${CURR[4]} - ${PREV[4]} ))
TOTAL=0
for i in {1..8}; do
    DIFF=$(( ${CURR[$i]} - ${PREV[$i]} ))
    TOTAL=$(( TOTAL + DIFF ))
done

USAGE=$(( 100 * (TOTAL - IDLE) / TOTAL ))
echo "$USAGE"
