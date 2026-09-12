#!/bin/bash
FILE="src/wira/components/NotionLayout.tsx"

# Backgrounds
sed -i 's/bg-slate-50/bg-muted\/50/g' $FILE
sed -i 's/hover:bg-slate-200\/50/hover:bg-accent\/50/g' $FILE
sed -i 's/hover:bg-gray-300\/50/hover:bg-accent\/50/g' $FILE
sed -i 's/bg-blue-600/bg-primary/g' $FILE
sed -i 's/selection:bg-blue-200\/40/selection:bg-primary\/20/g' $FILE

# Texts
sed -i 's/text-slate-400/text-muted-foreground/g' $FILE
sed -i 's/text-white/text-primary-foreground/g' $FILE

echo "Done"
