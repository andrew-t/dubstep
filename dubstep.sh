#!/usr/bin/env bash

if [ -z "$1" ]
	then ./dubstep.js
	else case "$1" in
		code)
			pass show "2step/$2" | ./dubstep.js code $3
			;;
		qr)
			pass show "2step/$2"
			;;
		*)
			echo 'Add credentials: dubstep'
			echo 'Show QR code: dubstep qr name'
			echo 'Show OTA code: dubstep code name [ -c ]'
			;;
	esac
fi