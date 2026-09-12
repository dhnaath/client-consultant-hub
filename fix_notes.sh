#!/bin/bash
FILE="src/wira/components/views/NotesView.tsx"

# Text Colors
sed -i 's/text-slate-900/text-foreground/g' $FILE
sed -i 's/text-slate-800/text-foreground/g' $FILE
sed -i 's/text-slate-700/text-foreground/g' $FILE
sed -i 's/text-slate-600/text-muted-foreground/g' $FILE
sed -i 's/text-slate-500/text-muted-foreground/g' $FILE
sed -i 's/text-slate-400/text-muted-foreground\/70/g' $FILE

# Background Colors
sed -i 's/bg-white/bg-card/g' $FILE
sed -i 's/bg-slate-900/bg-primary/g' $FILE
sed -i 's/bg-slate-100/bg-secondary/g' $FILE
sed -i 's/bg-slate-50\/50/bg-muted\/50/g' $FILE

# Borders
sed -i 's/border-slate-300/border-border/g' $FILE
sed -i 's/border-slate-200/border-border/g' $FILE
sed -i 's/border-slate-100/border-border/g' $FILE

# Hovers
sed -i 's/hover:bg-slate-800/hover:bg-primary\/90/g' $FILE
sed -i 's/hover:text-slate-900/hover:text-foreground/g' $FILE
sed -i 's/hover:text-slate-700/hover:text-foreground/g' $FILE
sed -i 's/hover:text-slate-600/hover:text-foreground/g' $FILE

# Blues to primary
sed -i 's/text-blue-600/text-primary/g' $FILE
sed -i 's/bg-blue-50/bg-primary\/10/g' $FILE

# Specific placeholders
sed -i 's/placeholder-gray-300/placeholder:text-muted-foreground\/50/g' $FILE

echo "Done"
