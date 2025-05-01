export function boldKeybind(view) {
    const { state, dispatch } = view;
    const sel = state.selection.main;
    if (sel.empty) return false;
    const text = state.doc.sliceString(sel.from, sel.to);
    const isBold = /^\*\*(.*)\*\*$/.test(text);
    const wrapped = isBold ? text.slice(2, -2) : `**${text}**`;
    dispatch({
      changes: { from: sel.from, to: sel.to, insert: wrapped },
      selection: {
        anchor: sel.from + (isBold ? 0 : 2),
        head: sel.to + (isBold ? -4 : 2)
      },
      scrollIntoView: true
    });
    return true;
  }