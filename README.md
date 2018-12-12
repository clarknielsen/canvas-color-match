# Canvas Color Matching

HTML5 canvas prototype for a color-matching game I'm making. When you click on a block, any touching blocks of the same color should disappear.

Live link: <https://clarknielsen.github.io/canvas-color-match/>

Refresh the page to see different color combinations.

**Summary of logic:** On click, immediately mark the block as "to delete" and start looking for all horizontal and vertical touching blocks. As soon as we find a match, mark _that_ block for deletion and re-run the same adjacent logic on the new block. This recursive logic will eventually end once we've stopped finding blocks that need to be deleted. After that, we just loop over the array one more time to actually remove those blocks.

I'd love to know if there's a better way...
