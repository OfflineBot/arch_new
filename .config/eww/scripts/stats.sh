#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No Arg where given!"
    exit 1
fi

while getopts "dtgrc" opt; do
    case $opt in
        d)
            date +"%a %d/%m"
            ;;
        t)
            date +"%H:%M"
            ;;
        g)
            nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits 2>/dev/null || echo "0"
            ;;
        c)
              mpstat 1 1 | awk '/Average/ { print 100 - $12 }'
            ;;
        r)
            free | awk '/Mem:/ { printf("%.0f", $3/$2 * 100) }'
            ;;
        *)
            echo "Unkown Arg!"
            ;;
    esac

done
