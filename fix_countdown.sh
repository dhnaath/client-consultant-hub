#!/bin/bash
FILE="src/wira/components/views/CountdownView.tsx"

sed -i 's/text-slate-800/text-foreground/g' $FILE
sed -i 's/text-slate-700/text-foreground/g' $FILE
sed -i 's/text-slate-600/text-muted-foreground/g' $FILE
sed -i 's/text-slate-500/text-muted-foreground/g' $FILE
sed -i 's/text-slate-300/text-muted-foreground\/50/g' $FILE

sed -i 's/bg-white\/50/bg-card\/50/g' $FILE
sed -i 's/bg-white/bg-card/g' $FILE
sed -i 's/bg-slate-50\/50/bg-muted\/50/g' $FILE
sed -i 's/bg-slate-50/bg-muted/g' $FILE
sed -i 's/bg-slate-900\/40/bg-background\/80/g' $FILE
sed -i 's/bg-blue-50/bg-primary\/10/g' $FILE

sed -i 's/text-blue-500/text-primary/g' $FILE
sed -i 's/bg-blue-600/bg-primary/g' $FILE
sed -i 's/hover:bg-blue-700/hover:bg-primary\/90/g' $FILE
sed -i 's/shadow-blue-600\/20/shadow-primary\/20/g' $FILE
sed -i 's/focus:ring-blue-500/focus:ring-primary/g' $FILE

sed -i 's/border-slate-100/border-border/g' $FILE
sed -i 's/border-slate-200/border-border/g' $FILE

sed -i 's/hover:bg-slate-100/hover:bg-accent hover:text-accent-foreground/g' $FILE
sed -i 's/focus:bg-white/focus:bg-background/g' $FILE

sed -i 's/bg-green-50 text-green-700/bg-green-500\/10 text-green-600 dark:text-green-400/g' $FILE

echo "Done"
