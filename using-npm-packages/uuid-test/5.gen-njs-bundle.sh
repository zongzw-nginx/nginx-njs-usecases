cat 3.bundle.js 4.njs-code.js > ./6.njs-bundle.js

echo 
echo " ====> Manually update 6.njs-bundle.js L575 here to:"
echo

cat << EOF
575   function stringify(arr, offset) {
576       if (offset == undefined) offset = 0;
EOF

echo
echo "===="
echo