#!/bin/bash
FILE="src/wira/components/NotionLayout.tsx"

sed -i 's/bg-notion-bg/bg-background/g' $FILE
sed -i 's/text-notion-text-dim/text-muted-foreground/g' $FILE
sed -i 's/text-notion-text/text-foreground/g' $FILE
sed -i 's/border-notion-border/border-border/g' $FILE
sed -i 's/hover:bg-notion-bg-hover/hover:bg-accent/g' $FILE
sed -i 's/bg-notion-bg-hover/bg-accent/g' $FILE

echo "Done"
